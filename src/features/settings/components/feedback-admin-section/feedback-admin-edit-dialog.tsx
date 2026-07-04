import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  FEEDBACK_STATUS_LABELS,
  FEEDBACK_STATUSES,
  FEEDBACK_TYPE_LABELS,
} from "@/features/feedback/lib/feedback-labels"
import type { Feedback, FeedbackStatus } from "@/features/feedback/types/feedback"

type Props = {
  feedback: Feedback | null
  open: boolean
  onOpenChange: (open: boolean) => void
  isPending: boolean
  onSave: (payload: { status: FeedbackStatus; adminNote: string | null }) => void
}

export function FeedbackAdminEditDialog({
  feedback,
  open,
  onOpenChange,
  isPending,
  onSave,
}: Props) {
  const [status, setStatus] = React.useState<FeedbackStatus>("OPEN")
  const [adminNote, setAdminNote] = React.useState("")

  React.useEffect(() => {
    if (open && feedback) {
      setStatus(feedback.status)
      setAdminNote(feedback.adminNote ?? "")
    }
  }, [open, feedback])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback) return
    const trimmedNote = adminNote.trim()
    onSave({
      status,
      adminNote: trimmedNote.length ? trimmedNote : null,
    })
  }

  if (!feedback) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Gerenciar feedback</DialogTitle>
            <DialogDescription>
              {feedback.user?.name ?? feedback.user?.email ?? "Usuário"} ·{" "}
              {FEEDBACK_TYPE_LABELS[feedback.type]}
              {feedback.workspace ? ` · ${feedback.workspace.name}` : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm leading-relaxed text-stat-value">
              {feedback.message}
            </div>

            <label className="grid gap-1.5 text-sm font-medium">
              Status
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as FeedbackStatus)}
                disabled={isPending}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>{FEEDBACK_STATUS_LABELS[status]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {FEEDBACK_STATUSES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {FEEDBACK_STATUS_LABELS[item]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <label className="grid gap-1.5 text-sm font-medium">
              <span className="text-muted-foreground">Nota interna (opcional)</span>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                rows={4}
                maxLength={2000}
                disabled={isPending}
                placeholder="Anotações visíveis apenas para super admins."
                className={cn(
                  "min-h-24 w-full resize-y rounded-lg border border-input bg-input/30 px-3 py-2 text-sm transition-colors outline-none",
                  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                )}
              />
            </label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Salvando…" : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
