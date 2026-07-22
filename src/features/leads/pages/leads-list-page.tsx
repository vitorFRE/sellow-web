import * as React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { OnChangeFn, PaginationState } from "@tanstack/react-table"

import { getWorkspaceForbiddenMessage, getApiErrorMessage } from "@/shared/lib/api-errors"
import {
  deleteLead,
  listLeads,
  updateLeadImportReview,
  updateLeadStatus,
} from "@/features/leads/api/leads-api"
import { LeadListFiltersPanel } from "@/features/leads/components/lead-list-filters-panel"
import { ImportedLeadsHeader } from "@/features/leads/components/imported-leads-header"
import { LeadsDataTable } from "@/features/leads/components/leads-data-table"
import { LeadsMapView } from "@/features/leads/components/leads-map-view"
import type { LeadsViewMode } from "@/features/leads/components/leads-view-toggle"
import { PromoteLeadDialog } from "@/features/leads/components/promote-lead-dialog"
import { leadListFiltersToParams } from "@/features/leads/lib/lead-list-filters"
import type { LeadListAdvancedFilterState } from "@/features/leads/lib/lead-list-filters"
import { leadsListQueryKey } from "@/features/leads/queries/leads-query-keys"
import { invalidateWorkspaceLeadsQueries } from "@/features/workspaces/lib/business-query-key"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"
import { useWorkspacePermissions } from "@/features/workspaces/hooks/use-workspace-permissions"
import type { ImportReview, Lead } from "@/features/leads/types/lead"
import {
  DEFAULT_LEAD_LIST_FILTER_STATE,
  type LeadListFilterState,
} from "@/features/leads/types/lead-list-query"
import { DashboardReveal } from "@/features/dashboard/components/dashboard-reveal"

const IMPORTED_STATUS = "IMPORTED" as const

export function LeadsListPage() {
  const queryClient = useQueryClient()
  const { workspaceId } = useActiveWorkspace()
  const { canWriteLeads, canDeleteLeads } = useWorkspacePermissions()
  const [appliedFilters, setAppliedFilters] = React.useState<LeadListFilterState>(
    () => ({ ...DEFAULT_LEAD_LIST_FILTER_STATE })
  )
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const [viewMode, setViewMode] = React.useState<LeadsViewMode>("list")
  const [promoteTarget, setPromoteTarget] = React.useState<Lead | null>(null)

  const filterParams = React.useMemo(
    () => ({
      ...leadListFiltersToParams(appliedFilters, { includeStatus: false }),
      status: IMPORTED_STATUS,
    }),
    [appliedFilters]
  )

  const filtersKey = React.useMemo(
    () => JSON.stringify(filterParams),
    [filterParams]
  )

  React.useEffect(() => {
    setPagination((p) => (p.pageIndex === 0 ? p : { ...p, pageIndex: 0 }))
  }, [filtersKey])

  const onPaginationChange: OnChangeFn<PaginationState> = React.useCallback(
    (updater) => {
      setPagination((prev) => {
        const next =
          typeof updater === "function" ? updater(prev) : updater
        if (next.pageSize !== prev.pageSize) {
          return { pageIndex: 0, pageSize: next.pageSize }
        }
        return next
      })
    },
    []
  )

  const listPageSize = viewMode === "map" ? 100 : pagination.pageSize
  const listPageIndex = viewMode === "map" ? 0 : pagination.pageIndex

  const listQueryKey = React.useMemo(
    () => [
      ...leadsListQueryKey(workspaceId ?? ""),
      "imported",
      viewMode,
      listPageIndex,
      listPageSize,
      filterParams,
    ],
    [workspaceId, viewMode, listPageIndex, listPageSize, filterParams]
  )

  const query = useQuery({
    queryKey: listQueryKey,
    queryFn: () =>
      listLeads({
        page: listPageIndex + 1,
        limit: listPageSize,
        ...filterParams,
      }),
    enabled: Boolean(workspaceId),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: async () => {
      if (!workspaceId) return
      await invalidateWorkspaceLeadsQueries(queryClient, workspaceId)
      const len = query.data?.data.length ?? 0
      if (len <= 1 && pagination.pageIndex > 0) {
        setPagination((p) => ({ ...p, pageIndex: p.pageIndex - 1 }))
      }
    },
  })

  const promoteMutation = useMutation({
    mutationFn: (id: string) => updateLeadStatus(id, { status: "NEW" }),
    onSuccess: async () => {
      setPromoteTarget(null)
      if (!workspaceId) return
      await invalidateWorkspaceLeadsQueries(queryClient, workspaceId)
      const len = query.data?.data.length ?? 0
      if (len <= 1 && pagination.pageIndex > 0) {
        setPagination((p) => ({ ...p, pageIndex: p.pageIndex - 1 }))
      }
    },
  })

  const reviewMutation = useMutation({
    mutationFn: ({
      id,
      importReview,
    }: {
      id: string
      importReview: ImportReview | null
    }) => updateLeadImportReview(id, { importReview }),
    onMutate: async ({ id, importReview }) => {
      await queryClient.cancelQueries({ queryKey: listQueryKey })
      const previous = queryClient.getQueryData<{
        data: Lead[]
        meta: { total: number; page: number; limit: number; totalPages: number }
      }>(listQueryKey)

      if (previous) {
        const filter = appliedFilters.importReview
        const matchesFilter =
          filter === "all" ||
          (filter === "UNEVALUATED" && importReview == null) ||
          filter === importReview

        const nextData = matchesFilter
          ? previous.data.map((lead) =>
              lead.id === id ? { ...lead, importReview } : lead
            )
          : previous.data.filter((lead) => lead.id !== id)

        queryClient.setQueryData(listQueryKey, {
          ...previous,
          data: nextData,
          meta: {
            ...previous.meta,
            total: matchesFilter
              ? previous.meta.total
              : Math.max(0, previous.meta.total - 1),
          },
        })
      }

      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(listQueryKey, context.previous)
      }
    },
    onSettled: async () => {
      if (!workspaceId) return
      await invalidateWorkspaceLeadsQueries(queryClient, workspaceId)
    },
  })

  const onDeleteLead = React.useCallback(
    (id: string) => {
      deleteMutation.mutate(id)
    },
    [deleteMutation]
  )

  const onPromoteToPipeline = React.useCallback(
    (id: string) => {
      const lead = query.data?.data.find((item) => item.id === id)
      if (lead) setPromoteTarget(lead)
    },
    [query.data?.data]
  )

  const confirmPromote = React.useCallback(() => {
    if (!promoteTarget) return
    promoteMutation.mutate(promoteTarget.id)
  }, [promoteMutation, promoteTarget])

  const onImportReviewChange = React.useCallback(
    (id: string, importReview: ImportReview | null) => {
      reviewMutation.mutate({ id, importReview })
    },
    [reviewMutation]
  )

  const deletingLeadId =
    deleteMutation.isPending && deleteMutation.variables != null
      ? deleteMutation.variables
      : null

  const promotingLeadId =
    promoteMutation.isPending && promoteMutation.variables != null
      ? promoteMutation.variables
      : null

  const reviewingLeadId =
    reviewMutation.isPending && reviewMutation.variables != null
      ? reviewMutation.variables.id
      : null

  const meta = query.data?.meta
  const total = meta?.total ?? 0
  const totalPages = meta?.totalPages ?? 0

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col pb-4">
      <DashboardReveal>
        <section className="dashboard-stat-board flex min-w-0 flex-col p-6">
          <ImportedLeadsHeader
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <LeadListFiltersPanel
            applied={appliedFilters}
            panelTitle="Filtros"
            showImportReviewFilter
            className="border-b border-border"
            onSearchChange={(search) =>
              setAppliedFilters((prev) => ({ ...prev, search }))
            }
            onApplyAdvanced={(advanced: LeadListAdvancedFilterState) =>
              setAppliedFilters((prev) => ({ ...prev, ...advanced }))
            }
          />

          {deleteMutation.isError ? (
            <p className="pt-4 text-sm text-destructive">
              {getApiErrorMessage(
                deleteMutation.error,
                "Não foi possível excluir o lead."
              )}
            </p>
          ) : null}

          {promoteMutation.isError ? (
            <p className="pt-4 text-sm text-destructive">
              {getApiErrorMessage(
                promoteMutation.error,
                "Não foi possível enviar o lead ao pipeline."
              )}
            </p>
          ) : null}

          {reviewMutation.isError ? (
            <p className="pt-4 text-sm text-destructive">
              {getApiErrorMessage(
                reviewMutation.error,
                "Não foi possível salvar a triagem do lead."
              )}
            </p>
          ) : null}

          {query.isError ? (
            <p className="pt-4 text-sm text-destructive">
              {getWorkspaceForbiddenMessage(
                query.error,
                query.error instanceof Error
                  ? query.error.message
                  : "Não foi possível carregar os leads importados."
              )}
            </p>
          ) : null}

          <div className="pt-2">
            {viewMode === "map" ? (
              <LeadsMapView
                leads={query.data?.data ?? []}
                isLoading={query.isPending}
                canWriteLeads={canWriteLeads}
                canDeleteLeads={canDeleteLeads}
                promotingLeadId={promotingLeadId}
                deletingLeadId={deletingLeadId}
                onPromoteToPipeline={onPromoteToPipeline}
                onDeleteLead={onDeleteLead}
              />
            ) : (
              <LeadsDataTable
                data={query.data?.data ?? []}
                isLoading={query.isPending}
                total={total}
                pageCount={totalPages}
                pagination={pagination}
                onPaginationChange={onPaginationChange}
                onDeleteLead={onDeleteLead}
                deletingLeadId={deletingLeadId}
                variant="imported"
                onPromoteToPipeline={onPromoteToPipeline}
                promotingLeadId={promotingLeadId}
                onImportReviewChange={onImportReviewChange}
                reviewingLeadId={reviewingLeadId}
                canWriteLeads={canWriteLeads}
                canDeleteLeads={canDeleteLeads}
                emptyMessage="Nenhum lead importado. Use Importar para adicionar leads do Google Maps."
              />
            )}
          </div>
        </section>
      </DashboardReveal>

      <PromoteLeadDialog
        open={promoteTarget != null}
        onOpenChange={(open) => {
          if (!open && !promoteMutation.isPending) setPromoteTarget(null)
        }}
        leadName={promoteTarget?.name ?? ""}
        isPending={promoteMutation.isPending}
        onConfirm={confirmPromote}
      />
    </div>
  )
}
