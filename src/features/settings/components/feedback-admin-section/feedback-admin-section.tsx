import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import { listAllFeedback } from "@/features/feedback/api/feedback-api"
import { FeedbackAdminEditDialog } from "@/features/settings/components/feedback-admin-section/feedback-admin-edit-dialog"
import { FeedbackAdminFilters } from "@/features/settings/components/feedback-admin-section/feedback-admin-filters"
import { FeedbackAdminRow } from "@/features/settings/components/feedback-admin-section/feedback-admin-row"
import { useFeedbackMutations } from "@/features/feedback/hooks/use-feedback-mutations"
import {
  defaultFeedbackAdminFilters,
  hasActiveFeedbackAdminFilters,
  toAdminFeedbackQueryParams,
  type FeedbackAdminFilterState,
} from "@/features/feedback/lib/feedback-admin-filters"
import { adminFeedbackQueryKey } from "@/features/feedback/queries/feedback-query-keys"
import type { Feedback } from "@/features/feedback/types/feedback"
import { listWorkspaces } from "@/features/workspaces/api/workspaces-api"
import { useWorkspacePermissions } from "@/features/workspaces/hooks/use-workspace-permissions"
import { workspacesAdminQueryKey } from "@/features/settings/queries/loss-reasons-query-keys"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const SEARCH_DEBOUNCE_MS = 300

export function FeedbackAdminSection() {
  const { isSuperAdmin } = useWorkspacePermissions()
  const [page, setPage] = React.useState(1)
  const [filters, setFilters] = React.useState<FeedbackAdminFilterState>(
    defaultFeedbackAdminFilters
  )
  const [debouncedSearch, setDebouncedSearch] = React.useState("")
  const [editing, setEditing] = React.useState<Feedback | null>(null)

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(filters.search.trim())
    }, SEARCH_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [filters.search])

  const appliedFilters = React.useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch]
  )

  const queryParams = React.useMemo(
    () => toAdminFeedbackQueryParams(appliedFilters, page),
    [appliedFilters, page]
  )

  const workspacesQuery = useQuery({
    queryKey: workspacesAdminQueryKey(),
    queryFn: listWorkspaces,
    enabled: isSuperAdmin,
  })

  const listQuery = useQuery({
    queryKey: adminFeedbackQueryKey(queryParams),
    queryFn: () => listAllFeedback(queryParams),
    enabled: isSuperAdmin,
  })

  const { adminPatchMutation } = useFeedbackMutations({
    onAdminUpdateSuccess: () => setEditing(null),
  })

  React.useEffect(() => {
    setPage(1)
  }, [
    appliedFilters.status,
    appliedFilters.type,
    appliedFilters.workspaceId,
    appliedFilters.search,
    appliedFilters.createdFrom,
    appliedFilters.createdTo,
  ])

  if (!isSuperAdmin) {
    return (
      <p className="text-sm leading-relaxed text-stat-muted">
        Apenas super administradores podem gerenciar feedbacks da plataforma.
      </p>
    )
  }

  const items = listQuery.data?.data ?? []
  const meta = listQuery.data?.meta
  const workspaces = workspacesQuery.data ?? []

  return (
    <section className="dashboard-stat-board flex min-w-0 flex-col p-6">
      <header className="border-b border-border pb-5">
        <div className="min-w-0 space-y-2">
          <p className="font-mono text-[10px] tracking-[0.16em] text-stat-label uppercase">
            Super admin
          </p>
          <h2 className="text-base font-semibold tracking-tight text-stat-value">
            Feedbacks
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-stat-muted">
            Acompanhe o que os usuários enviaram e atualize status com notas
            internas.
          </p>
        </div>
      </header>

      <FeedbackAdminFilters
        value={filters}
        onChange={setFilters}
        workspaces={workspaces}
        total={meta?.total}
        hasActiveFilters={hasActiveFeedbackAdminFilters(filters)}
        onClear={() => setFilters(defaultFeedbackAdminFilters())}
      />

      <FeedbackAdminEditDialog
        feedback={editing}
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) setEditing(null)
        }}
        isPending={adminPatchMutation.isPending}
        onSave={(payload) => {
          if (!editing) return
          adminPatchMutation.mutate({ id: editing.id, body: payload })
        }}
      />

      {listQuery.isLoading ? (
        <ul className="mt-4 flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index}>
              <Skeleton className="h-32 w-full rounded-lg" />
            </li>
          ))}
        </ul>
      ) : listQuery.isError ? (
        <p className="py-8 text-sm text-stat-muted">
          Não foi possível carregar os feedbacks.
        </p>
      ) : items.length === 0 ? (
        <p className="py-8 text-sm text-stat-muted">
          Nenhum feedback encontrado com os filtros atuais.
        </p>
      ) : (
        <>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((item) => (
              <FeedbackAdminRow
                key={item.id}
                feedback={item}
                onManage={() => setEditing(item)}
              />
            ))}
          </ul>

          {meta && meta.totalPages > 1 ? (
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
              <p className="text-xs text-stat-muted">
                Página {meta.page} de {meta.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  Anterior
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page >= meta.totalPages}
                  onClick={() =>
                    setPage((current) => Math.min(meta.totalPages, current + 1))
                  }
                >
                  Próxima
                </Button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </section>
  )
}
