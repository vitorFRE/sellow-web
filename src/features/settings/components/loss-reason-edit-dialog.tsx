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
import { Input } from "@/components/ui/input"
import type { LossReason } from "@/features/settings/types/loss-reason"
import { cn } from "@/lib/utils"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  reason: LossReason | null
  isPending: boolean
  onSave: (payload: { name: string; description: string | null }) => void
}

export function LossReasonEditDialog({
  open,
  onOpenChange,
  reason,
  isPending,
  onSave,
}: Props) {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")

  React.useEffect(() => {
    if (open && reason) {
      setName(reason.name)
      setDescription(reason.description ?? "")
    }
  }, [open, reason])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    const desc = description.trim()
    onSave({ name: trimmed, description: desc.length ? desc : null })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar motivo</DialogTitle>
            <DialogDescription>
              Nome e descrição visíveis na equipe ao registrar perda.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Nome
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={200}
                autoComplete="off"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              <span className="text-muted-foreground">Descrição (opcional)</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={2000}
                className={cn(
                  "min-h-[5rem] w-full resize-y rounded-lg border border-input bg-input/30 px-3 py-2 text-sm outline-none transition-colors",
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
            <Button type="submit" disabled={isPending || !name.trim()}>
              {isPending ? "Salvando…" : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
