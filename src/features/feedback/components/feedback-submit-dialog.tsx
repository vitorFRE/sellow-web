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
  FEEDBACK_TYPE_LABELS,
  FEEDBACK_TYPES,
} from "@/features/feedback/lib/feedback-labels"
import type { FeedbackType } from "@/features/feedback/types/feedback"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  isPending: boolean
  onSubmit: (payload: { type: FeedbackType; message: string }) => void
}

export function FeedbackSubmitDialog({
  open,
  onOpenChange,
  isPending,
  onSubmit,
}: Props) {
  const [type, setType] = React.useState<FeedbackType>("BUG")
  const [message, setMessage] = React.useState("")

  React.useEffect(() => {
    if (open) {
      setType("BUG")
      setMessage("")
    }
  }, [open])

  const trimmed = message.trim()
  const canSubmit = trimmed.length >= 10

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({ type, message: trimmed })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Enviar feedback</DialogTitle>
            <DialogDescription>
              Conte o que aconteceu ou o que você gostaria de ver no Sellow. Sua
              mensagem ajuda a melhorar o produto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Categoria
              <Select
                value={type}
                onValueChange={(value) => setType(value as FeedbackType)}
                disabled={isPending}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>{FEEDBACK_TYPE_LABELS[type]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {FEEDBACK_TYPES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {FEEDBACK_TYPE_LABELS[item]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Mensagem
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                minLength={10}
                maxLength={2000}
                required
                disabled={isPending}
                placeholder="Descreva o bug, sugestão ou comentário com o máximo de detalhes possível."
                className={cn(
                  "min-h-28 w-full resize-y rounded-lg border border-input bg-input/30 px-3 py-2 text-sm transition-colors outline-none",
                  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                )}
              />
              <span className="text-xs font-normal text-muted-foreground">
                Mínimo de 10 caracteres.
              </span>
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
            <Button type="submit" disabled={isPending || !canSubmit}>
              {isPending ? "Enviando…" : "Enviar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
