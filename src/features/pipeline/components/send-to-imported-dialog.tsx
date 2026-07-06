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

function preventClickThrough(e: React.PointerEvent) {
  e.preventDefault()
  e.stopPropagation()
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadName: string
  isPending?: boolean
  onConfirm: () => void
}

export function SendToImportedDialog({
  open,
  onOpenChange,
  leadName,
  isPending = false,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-stat-card-border bg-stat-board sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Devolver lead?</DialogTitle>
          <DialogDescription className="text-stat-muted">
            <span className="font-medium text-stat-value">&quot;{leadName}&quot;</span>{" "}
            sairá do pipeline e voltará para importados.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={isPending}
            onPointerDown={preventClickThrough}
            onClick={(e) => {
              e.preventDefault()
              onConfirm()
            }}
          >
            {isPending ? "Enviando…" : "Devolver"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
