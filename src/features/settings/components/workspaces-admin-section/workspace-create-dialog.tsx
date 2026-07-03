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

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  isPending: boolean
  onCreate: (name: string) => void
}

export function WorkspaceCreateDialog({
  open,
  onOpenChange,
  isPending,
  onCreate,
}: Props) {
  const [name, setName] = React.useState("")

  React.useEffect(() => {
    if (open) setName("")
  }, [open])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onCreate(trimmed)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Novo workspace</DialogTitle>
            <DialogDescription>
              Um ambiente isolado com seus próprios leads, pipeline e membros.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Nome
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: Agência Norte"
                required
                disabled={isPending}
                autoComplete="off"
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
