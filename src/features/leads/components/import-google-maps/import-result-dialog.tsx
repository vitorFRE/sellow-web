import { IconCircleCheck } from "@tabler/icons-react"

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
      <DialogContent className="gap-6 border bg-card text-center shadow-lg sm:max-w-md">
        <DialogHeader className="gap-4 text-center sm:text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-3xl bg-primary/12 text-primary">
            <IconCircleCheck className="size-8" aria-hidden />
          </div>
          <DialogTitle className="text-lg font-semibold">
            Importação concluída
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 px-2">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-semibold tabular-nums text-primary">
              {created}
            </span>
            <span className="text-xs text-muted-foreground">Criados</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-semibold tabular-nums text-foreground">
              {updated}
            </span>
            <span className="text-xs text-muted-foreground">Atualizados</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-semibold tabular-nums text-muted-foreground">
              {skipped}
            </span>
            <span className="text-xs text-muted-foreground">Ignorados</span>
          </div>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-center">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto sm:min-w-32"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
          <Button
            type="button"
            className="w-full sm:w-auto sm:min-w-32"
            onClick={onViewLeads}
          >
            Ver leads
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
