import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import { HttpError } from "@/features/auth/api/auth-api"
import { listLossReasons } from "@/features/settings/api/loss-reasons-api"
import { LossReasonCreateDialog } from "@/features/settings/components/loss-reason-create-dialog"
import { LossReasonDeleteDialog } from "@/features/settings/components/loss-reason-delete-dialog"
import { LossReasonEditDialog } from "@/features/settings/components/loss-reason-edit-dialog"
import { LossReasonRow } from "@/features/settings/components/loss-reason-row"
import { useLossReasonsMutations } from "@/features/settings/hooks/use-loss-reasons-mutations"
import { lossReasonsErrorMessage } from "@/features/settings/lib/loss-reasons-error"
import { lossReasonsQueryKey } from "@/features/settings/queries/loss-reasons-query-keys"
import type { LossReason } from "@/features/settings/types/loss-reason"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { IconPlus } from "@tabler/icons-react"

export function LossReasonsSection() {
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
    queryKey: lossReasonsQueryKey,
    queryFn: listLossReasons,
  })

  const busyId =
    patchMutation.isPending && patchMutation.variables
      ? patchMutation.variables.id
      : deleteMutation.isPending && deleteMutation.variables
        ? deleteMutation.variables
        : null

  const is403 =
    listQuery.error instanceof HttpError && listQuery.error.status === 403

  if (is403) {
    return (
      <p className="text-sm text-muted-foreground">
        Apenas administradores podem gerenciar motivos de perda.
      </p>
    )
  }

  return (
    <section className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h2 className="text-base font-medium">Motivos de perda</h2>
          <p className="text-sm text-muted-foreground">
            Usados ao marcar um lead como perdido. Nomes são únicos no sistema.
          </p>
        </div>
        <Button
          type="button"
          className="shrink-0 gap-1.5 self-start rounded-2xl sm:self-auto"
          onClick={() => setCreateOpen(true)}
        >
          <IconPlus className="size-4" aria-hidden />
          Novo motivo
        </Button>
      </div>

      <LossReasonCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        isPending={createMutation.isPending}
        onCreate={(payload) => createMutation.mutate(payload)}
      />

      {listQuery.isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      ) : listQuery.isError ? (
        <p className="text-sm text-destructive">
          {lossReasonsErrorMessage(
            listQuery.error,
            "Não foi possível carregar os motivos."
          )}
        </p>
      ) : (
        <ul className="overflow-hidden rounded-xl border border-border/80 bg-card">
          {listQuery.data?.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-muted-foreground">
              Nenhum motivo cadastrado ainda.
            </li>
          ) : (
            listQuery.data?.map((r) => (
              <LossReasonRow
                key={r.id}
                reason={r}
                busy={busyId === r.id}
                onEdit={setEditing}
                onDelete={setDeleting}
              />
            ))
          )}
        </ul>
      )}

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
    </section>
  )
}
