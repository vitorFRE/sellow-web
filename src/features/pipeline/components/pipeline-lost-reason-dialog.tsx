import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import { HttpError } from "@/features/auth/api/auth-api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PipelineLostReasonDialogFields } from "@/features/pipeline/components/pipeline-lost-reason-dialog-fields"
import { listLossReasons } from "@/features/settings/api/loss-reasons-api"
import { lossReasonsQueryKey } from "@/features/settings/queries/loss-reasons-query-keys"

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
  const [reasonId, setReasonId] = React.useState("")
  const [note, setNote] = React.useState("")

  React.useEffect(() => {
    if (open) {
      setReasonId("")
      setNote("")
    }
  }, [open])

  const reasonsQuery = useQuery({
    queryKey: lossReasonsQueryKey,
    queryFn: listLossReasons,
    enabled: open,
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reasonId) return
    const trimmed = note.trim()
    onConfirm(reasonId, trimmed.length ? trimmed : null)
  }

  const is403 =
    reasonsQuery.error instanceof HttpError &&
    reasonsQuery.error.status === 403

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
