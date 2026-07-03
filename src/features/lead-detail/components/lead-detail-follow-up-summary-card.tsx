import { IconBell, IconCalendarClock, IconDotsVertical, IconUser } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { formatFollowUpDisplayDate } from "@/features/lead-detail/lib/format-follow-up-date"
import type { LeadFollowUpView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  followUp: LeadFollowUpView
  onEdit?: () => void
  onClear?: () => void
  isClearing?: boolean
  className?: string
}

export function LeadDetailFollowUpSummaryCard({
  followUp,
  onEdit,
  onClear,
  isClearing = false,
  className,
}: Props) {
  const when = followUp.nextContactAt.trim()
    ? formatFollowUpDisplayDate(followUp.nextContactAt)
    : "A combinar"

  return (
    <div className={cn("relative rounded-xl border border-border/80 bg-primary/5 p-4", onEdit || onClear ? "pr-12" : "", className)}>
      {onEdit || onClear ? (
        <div className="absolute top-3 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-8 w-8"
                  aria-label="Menu do follow-up"
                />
              }
            >
              <IconDotsVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-44">
              {onEdit ? (
                <DropdownMenuItem onClick={onEdit} disabled={isClearing}>
                  Editar follow-up
                </DropdownMenuItem>
              ) : null}
              {onClear ? (
                <DropdownMenuItem
                  variant="destructive"
                  onClick={onClear}
                  disabled={isClearing}
                >
                  {isClearing ? "Removendo…" : "Limpar agendamento"}
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}

      <div className="flex items-start gap-2">
        <IconCalendarClock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Próximo contato</p>
          <p className="text-sm font-medium text-foreground">{when}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Canal: <span className="text-foreground">{followUp.channel}</span>
          </p>
        </div>
      </div>

      {followUp.ownerLabel.trim() ? (
        <div className="mt-3 flex items-center gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
          <IconUser className="size-3.5 shrink-0" aria-hidden />
          <span>{followUp.ownerLabel}</span>
        </div>
      ) : null}

      {followUp.reminder ? (
        <div className="mt-2 flex gap-2 rounded-lg border border-border/60 bg-background/80 p-2.5 text-xs text-foreground">
          <IconBell className="mt-0.5 size-3.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
          <span>{followUp.reminder}</span>
        </div>
      ) : null}
    </div>
  )
}
