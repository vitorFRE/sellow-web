import { IconCalendarPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  onSchedule?: () => void
  className?: string
}

export function LeadDetailFollowUpEmptyState({ onSchedule, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/80 bg-muted/10 px-6 py-10 text-center",
        className
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full border border-border/70 bg-muted/30 text-muted-foreground">
        <IconCalendarPlus className="size-6" aria-hidden />
      </span>
      <div className="max-w-xs space-y-1">
        <p className="text-sm font-medium text-foreground">Nenhum follow-up agendado</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Defina data, canal e lembrete para o próximo contato com o cliente sobre o projeto de site.
        </p>
      </div>
      <Button
        type="button"
        size="sm"
        onClick={onSchedule}
        disabled={!onSchedule}
      >
        Agendar follow-up
      </Button>
    </div>
  )
}
