import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { IconPlus } from "@tabler/icons-react"

import { getApiErrorMessage } from "@/shared/lib/api-errors"
import { listLossReasons } from "@/features/settings/api/loss-reasons-api"
import { LossReasonCreateDialog } from "@/features/settings/components/loss-reason-create-dialog"
import { LossReasonDeleteDialog } from "@/features/settings/components/loss-reason-delete-dialog"
import { LossReasonEditDialog } from "@/features/settings/components/loss-reason-edit-dialog"
import { LossReasonRow } from "@/features/settings/components/loss-reason-row"
import { useLossReasonsMutations } from "@/features/settings/hooks/use-loss-reasons-mutations"
import { lossReasonsQueryKey } from "@/features/settings/queries/loss-reasons-query-keys"
import type { LossReason } from "@/features/settings/types/loss-reason"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"
import { useWorkspacePermissions } from "@/features/workspaces/hooks/use-workspace-permissions"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function LossReasonsSection() {
  const { workspaceId } = useActiveWorkspace()
  const { canWriteLossReasons } = useWorkspacePermissions()
  const [createOpen, setCreateOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<LossReason | null>(null)
  const [deleting, setDeleting] = React.useState<LossReason | null>(null)

  const { createMutation, patchMutation, deleteMutation } =
    useLossReasonsMutations({
      onCreateSuccess: () => setCreateOpen(false),
      onEditClose: () => setEditing(null),
      onDeleteClose: () => setDeleting(null),
    })

  const listQuery = useQuery({
    queryKey: lossReasonsQueryKey(workspaceId ?? ""),
    queryFn: listLossReasons,
    enabled: Boolean(workspaceId),
  })

  const busyId =
    patchMutation.isPending && patchMutation.variables
      ? patchMutation.variables.id
      : deleteMutation.isPending && deleteMutation.variables
        ? deleteMutation.variables
        : null

  return (
    <section className="dashboard-stat-board flex min-w-0 flex-col p-6">
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <p className="text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
            Pipeline
          </p>
          <h2 className="text-base font-semibold tracking-tight text-stat-value">
            Motivos de perda
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-stat-muted">
            Usados ao marcar um lead como perdido. Nomes são únicos no workspace.
          </p>
        </div>
        {canWriteLossReasons ? (
          <Button
            type="button"
            size="sm"
            className="shrink-0 gap-1.5 self-start"
            onClick={() => setCreateOpen(true)}
          >
            <IconPlus className="size-4" aria-hidden />
            Novo motivo
          </Button>
        ) : null}
      </header>

      {canWriteLossReasons ? (
        <LossReasonCreateDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          isPending={createMutation.isPending}
          onCreate={(payload) => createMutation.mutate(payload)}
        />
      ) : null}

      {listQuery.isLoading ? (
        <ul className="divide-y divide-border">
          <li>
            <Skeleton className="h-16 w-full rounded-none bg-stat-card" />
          </li>
          <li>
            <Skeleton className="h-16 w-full rounded-none bg-stat-card" />
          </li>
        </ul>
      ) : listQuery.isError ? (
        <p className="pt-5 text-sm text-destructive">
          {getApiErrorMessage(
            listQuery.error,
            "Não foi possível carregar os motivos."
          )}
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {listQuery.data?.length === 0 ? (
            <li className="py-10 text-center text-sm text-stat-muted">
              Nenhum motivo cadastrado ainda.
            </li>
          ) : (
            listQuery.data?.map((r) => (
              <LossReasonRow
                key={r.id}
                reason={r}
                busy={busyId === r.id}
                canWrite={canWriteLossReasons}
                onEdit={setEditing}
                onDelete={setDeleting}
              />
            ))
          )}
        </ul>
      )}

      {canWriteLossReasons ? (
        <>
          <LossReasonEditDialog
            open={editing != null}
            onOpenChange={(o) => !o && setEditing(null)}
            reason={editing}
            isPending={
              patchMutation.isPending && patchMutation.variables?.id === editing?.id
            }
            onSave={(body) => {
              if (!editing) return
              patchMutation.mutate({ id: editing.id, body })
            }}
          />

          <LossReasonDeleteDialog
            open={deleting != null}
            onOpenChange={(o) => !o && setDeleting(null)}
            reasonName={deleting?.name ?? ""}
            isPending={
              deleteMutation.isPending && deleteMutation.variables === deleting?.id
            }
            onConfirm={() => {
              if (!deleting) return
              deleteMutation.mutate(deleting.id)
            }}
          />
        </>
      ) : null}
    </section>
  )
}
