import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { isWorkspaceForbidden } from "@/shared/lib/api-errors"
import { listLossReasons } from "@/features/settings/api/loss-reasons-api"
import { PipelineLostReasonDialogFields } from "@/features/pipeline/components/pipeline-lost-reason-dialog-fields"
import { lossReasonsQueryKey } from "@/features/settings/queries/loss-reasons-query-keys"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"

type Props = {
  open: boolean
  leadName: string
  isPending: boolean
  onCancel: () => void
  onConfirm: (lossReasonId: string, lossReasonNote: string | null) => void
}

export function PipelineLostReasonDialog({
  open,
  leadName,
  isPending,
  onCancel,
  onConfirm,
}: Props) {
  const { workspaceId } = useActiveWorkspace()
  const [reasonId, setReasonId] = React.useState("")
  const [note, setNote] = React.useState("")

  React.useEffect(() => {
    if (open) {
      setReasonId("")
      setNote("")
    }
  }, [open])

  const reasonsQuery = useQuery({
    queryKey: lossReasonsQueryKey(workspaceId ?? ""),
    queryFn: listLossReasons,
    enabled: open && Boolean(workspaceId),
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reasonId) return
    const trimmed = note.trim()
    onConfirm(reasonId, trimmed.length ? trimmed : null)
  }

  const is403 = isWorkspaceForbidden(reasonsQuery.error)

  const canSubmit =
    !isPending &&
    !is403 &&
    !reasonsQuery.isLoading &&
    !reasonsQuery.isError &&
    !!reasonsQuery.data?.length &&
    !!reasonId

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !isPending && onCancel()}>
      <DialogContent className="max-w-md">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Marcar como perdido</DialogTitle>
            <DialogDescription>
              O lead{" "}
              <span className="font-medium text-foreground">&quot;{leadName}&quot;</span>{" "}
              será movido para Perdido. Informe o motivo exigido pela equipe.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <PipelineLostReasonDialogFields
              reasonsQuery={reasonsQuery}
              reasonId={reasonId}
              note={note}
              isPending={isPending}
              onReasonChange={setReasonId}
              onNoteChange={setNote}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {isPending ? "Salvando…" : "Confirmar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
