import * as React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { OnChangeFn, PaginationState } from "@tanstack/react-table"

import { getAdminForbiddenMessage, getApiErrorMessage } from "@/shared/lib/api-errors"
import {
  deleteLead,
  listLeads,
  updateLeadStatus,
} from "@/features/leads/api/leads-api"
import { LeadListFiltersPanel } from "@/features/leads/components/lead-list-filters-panel"
import { ImportedLeadsHeader } from "@/features/leads/components/imported-leads-header"
import { LeadsDataTable } from "@/features/leads/components/leads-data-table"
import { PromoteLeadDialog } from "@/features/leads/components/promote-lead-dialog"
import { leadListFiltersToParams } from "@/features/leads/lib/lead-list-filters"
import type { LeadListAdvancedFilterState } from "@/features/leads/lib/lead-list-filters"
import { leadsListQueryKey } from "@/features/leads/queries/leads-query-keys"
import type { Lead } from "@/features/leads/types/lead"
import {
  DEFAULT_LEAD_LIST_FILTER_STATE,
  type LeadListFilterState,
} from "@/features/leads/types/lead-list-query"
import { DashboardReveal } from "@/features/dashboard/components/dashboard-reveal"

const IMPORTED_STATUS = "IMPORTED" as const

export function LeadsListPage() {
  const queryClient = useQueryClient()
  const [appliedFilters, setAppliedFilters] = React.useState<LeadListFilterState>(
    () => ({ ...DEFAULT_LEAD_LIST_FILTER_STATE })
  )
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
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

  const query = useQuery({
    queryKey: [
      ...leadsListQueryKey,
      "imported",
      pagination.pageIndex,
      pagination.pageSize,
      filterParams,
    ],
    queryFn: () =>
      listLeads({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        ...filterParams,
      }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["leads"] })
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
      await queryClient.invalidateQueries({ queryKey: ["leads"] })
      const len = query.data?.data.length ?? 0
      if (len <= 1 && pagination.pageIndex > 0) {
        setPagination((p) => ({ ...p, pageIndex: p.pageIndex - 1 }))
      }
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

  const deletingLeadId =
    deleteMutation.isPending && deleteMutation.variables != null
      ? deleteMutation.variables
      : null

  const promotingLeadId =
    promoteMutation.isPending && promoteMutation.variables != null
      ? promoteMutation.variables
      : null

  const meta = query.data?.meta
  const total = meta?.total ?? 0
  const totalPages = meta?.totalPages ?? 0

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col pb-4">
      <DashboardReveal>
        <section className="dashboard-stat-board flex min-w-0 flex-col p-6">
          <ImportedLeadsHeader />

          <LeadListFiltersPanel
            applied={appliedFilters}
            panelTitle="Refinar importados"
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

          {query.isError ? (
            <p className="pt-4 text-sm text-destructive">
              {getAdminForbiddenMessage(
                query.error,
                query.error instanceof Error
                  ? query.error.message
                  : "Não foi possível carregar os leads importados."
              )}
            </p>
          ) : null}

          <div className="pt-2">
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
              emptyMessage="Nenhum lead importado. Use Importar JSON para adicionar leads do Google Maps."
            />
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
