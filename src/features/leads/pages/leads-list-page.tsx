import * as React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { OnChangeFn, PaginationState } from "@tanstack/react-table"

import { HttpError } from "@/features/auth/api/auth-api"
import { deleteLead, listLeads } from "@/features/leads/api/leads-api"
import { LeadsDataTable } from "@/features/leads/components/leads-data-table"
import { leadsListQueryKey } from "@/features/leads/queries/leads-query-keys"

export function LeadsListPage() {
  const queryClient = useQueryClient()
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

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
    ],
    queryFn: () =>
      listLeads({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
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
      <div className="flex min-w-0 flex-col gap-2">
        <h1 className="text-xl font-medium">Leads</h1>
        <p className="wrap-break-word text-sm text-muted-foreground">
          Lista paginada via API. Apenas administradores têm acesso.
        </p>
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
