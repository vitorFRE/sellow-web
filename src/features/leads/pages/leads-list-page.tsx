import * as React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { OnChangeFn, PaginationState } from "@tanstack/react-table"

import { HttpError } from "@/features/auth/api/auth-api"
import { deleteLead, listLeads } from "@/features/leads/api/leads-api"
import { LeadListFiltersBar } from "@/features/leads/components/lead-list-filters-bar"
import { LeadsDataTable } from "@/features/leads/components/leads-data-table"
import { leadListFiltersToParams } from "@/features/leads/lib/lead-list-filters"
import { leadsListQueryKey } from "@/features/leads/queries/leads-query-keys"
import {
  DEFAULT_LEAD_LIST_FILTER_STATE,
  type LeadListFilterState,
} from "@/features/leads/types/lead-list-query"

export function LeadsListPage() {
  const queryClient = useQueryClient()
  const [filters, setFilters] = React.useState<LeadListFilterState>(
    () => ({ ...DEFAULT_LEAD_LIST_FILTER_STATE })
  )
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  const filterParams = React.useMemo(
    () => leadListFiltersToParams(filters, { includeStatus: true }),
    [filters]
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

  const onDeleteLead = React.useCallback(
    (id: string) => {
      deleteMutation.mutate(id)
    },
    [deleteMutation]
  )

  const deletingLeadId =
    deleteMutation.isPending && deleteMutation.variables != null
      ? deleteMutation.variables
      : null

  const meta = query.data?.meta
  const total = meta?.total ?? 0
  const totalPages = meta?.totalPages ?? 0

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <h1 className="text-xl font-medium">Leads</h1>
          <p className="wrap-break-word text-sm text-muted-foreground">
            Lista paginada via API. Filtros são combinados com AND. Apenas
            administradores têm acesso.
          </p>
        </div>
        <LeadListFiltersBar
          value={filters}
          onChange={setFilters}
          showStatus
          align="end"
        />
      </div>

      {deleteMutation.isError ? (
        <p className="rounded-4xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {deleteMutation.error instanceof HttpError
            ? deleteMutation.error.message
            : "Não foi possível excluir o lead."}
        </p>
      ) : null}

      {query.isError ? (
        <p className="rounded-4xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {query.error instanceof HttpError && query.error.status === 403
            ? "Acesso negado. Esta área é restrita a administradores."
            : query.error instanceof Error
              ? query.error.message
              : "Não foi possível carregar os leads."}
        </p>
      ) : null}

      <LeadsDataTable
        data={query.data?.data ?? []}
        isLoading={query.isPending}
        total={total}
        pageCount={totalPages}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        onDeleteLead={onDeleteLead}
        deletingLeadId={deletingLeadId}
      />
    </div>
  )
}
