import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadName: string
  isPending?: boolean
  onConfirm: () => void
}

export function PromoteLeadDialog({
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
          <DialogTitle>Enviar ao pipeline?</DialogTitle>
          <DialogDescription className="text-stat-muted">
            O lead{" "}
            <span className="font-medium text-stat-value">&quot;{leadName}&quot;</span>{" "}
            sairá da lista de importados e entrará no pipeline com status{" "}
            <span className="font-medium text-stat-value">Novo</span>.
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
          <Button type="button" disabled={isPending} onClick={onConfirm}>
            {isPending ? "Enviando…" : "Enviar ao pipeline"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
