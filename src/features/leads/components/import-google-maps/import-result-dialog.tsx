import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onViewLeads: () => void
  created: number
  updated: number
  skipped: number
}

export function ImportResultDialog({
  open,
  onOpenChange,
  onViewLeads,
  created,
  updated,
  skipped,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 border border-stat-card-border bg-stat-board sm:max-w-md">
        <DialogHeader className="gap-2 text-left sm:text-left">
          <p className="text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
            Concluído
          </p>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Importação finalizada
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3 border-y border-border py-5">
          <div className="space-y-1 text-center">
            <p className="text-3xl font-semibold tabular-nums text-primary">
              {created}
            </p>
            <p className="text-[11px] tracking-[0.08em] text-stat-muted uppercase">
              Criados
            </p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-3xl font-semibold tabular-nums text-stat-value">
              {updated}
            </p>
            <p className="text-[11px] tracking-[0.08em] text-stat-muted uppercase">
              Atualizados
            </p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-3xl font-semibold tabular-nums text-stat-muted">
              {skipped}
            </p>
            <p className="text-[11px] tracking-[0.08em] text-stat-muted uppercase">
              Ignorados
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
          <Button type="button" onClick={onViewLeads}>
            Ver leads
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
