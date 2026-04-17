import {
  IconCalendar,
  IconInfoCircle,
  IconMail,
  IconNote,
  IconPhone,
  IconRefresh,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import type { LeadActivityKind, LeadActivityLogItem } from "@/features/lead-detail/types/lead-detail-view"

const kindIcon: Record<LeadActivityKind, typeof IconNote> = {
  status: IconRefresh,
  call: IconPhone,
  email: IconMail,
  meeting: IconCalendar,
  note: IconNote,
  system: IconInfoCircle,
}

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

type Props = {
  items: LeadActivityLogItem[]
  className?: string
}

export function LeadDetailActivityLog({ items, className }: Props) {
  return (
    <section className={cn("space-y-2", className)}>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Histórico
      </h3>
      <ol className="space-y-3">
        {items.map((item) => {
          const Icon = kindIcon[item.kind]
          return (
            <li
              key={item.id}
              className="relative flex gap-3 rounded-lg border border-border/60 bg-card/40 p-3 pl-3"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-muted/30 text-muted-foreground">
                <Icon className="size-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-muted-foreground">{formatWhen(item.at)}</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{item.title}</p>
                {item.detail ? (
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{item.detail}</p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
