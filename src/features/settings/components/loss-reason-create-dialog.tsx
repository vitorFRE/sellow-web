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
import { cn } from "@/lib/utils"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  isPending: boolean
  onCreate: (payload: { name: string; description: string | null }) => void
}

export function LossReasonCreateDialog({
  open,
  onOpenChange,
  isPending,
  onCreate,
}: Props) {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")

  React.useEffect(() => {
    if (open) {
      setName("")
      setDescription("")
    }
  }, [open])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    const desc = description.trim()
    onCreate({ name: trimmed, description: desc.length ? desc : null })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Novo motivo de perda</DialogTitle>
            <DialogDescription>
              Nome único no sistema. Descrição ajuda o time a usar o motivo de
              forma consistente.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Nome
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: Sem orçamento"
                required
                maxLength={200}
                disabled={isPending}
                autoComplete="off"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              <span className="text-muted-foreground">
                Descrição (opcional)
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={2000}
                disabled={isPending}
                className={cn(
                  "min-h-20 w-full resize-y rounded-4xl border border-input bg-input/30 px-3 py-2 text-sm transition-colors outline-none",
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
              {isPending ? "Criando…" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
