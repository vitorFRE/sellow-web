import { Link } from "@tanstack/react-router"
import {
  IconBell,
  IconBrandWhatsapp,
  IconCalendarEvent,
  IconChevronRight,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react"

import { buttonVariants } from "@/components/ui/button"
import type { DashboardUpcomingFollowUp } from "@/features/dashboard/types/dashboard-overview"
import { formatFollowUpDisplayDate } from "@/features/lead-detail/lib/format-follow-up-date"
import { cn } from "@/lib/utils"

const PREVIEW_COUNT = 5

const channelIcon: Record<string, typeof IconBrandWhatsapp> = {
  WhatsApp: IconBrandWhatsapp,
  Ligação: IconPhone,
  "E-mail": IconMail,
  Visita: IconMapPin,
}

type Props = {
  items: DashboardUpcomingFollowUp[]
  className?: string
}

export function DashboardUpcomingFollowUps({ items, className }: Props) {
  const preview = items.slice(0, PREVIEW_COUNT)

  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="border-b border-border/50 bg-muted/20 px-5 py-4 dark:bg-muted/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <IconCalendarEvent className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                Próximos follow-ups
              </h2>
              <p className="text-xs text-muted-foreground">
                Próximos contatos agendados
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/pipeline"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "h-8 gap-0.5 pr-1 pl-2 text-xs text-muted-foreground hover:text-foreground"
            )}
          >
            Pipeline
            <IconChevronRight className="size-3.5 opacity-70" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        {preview.length === 0 ? (
          <p className="px-2 py-10 text-center text-sm text-muted-foreground">
            Nenhum follow-up agendado.
          </p>
        ) : (
          <ul className="space-y-2">
            {preview.map((row, i) => {
              const ChIcon = channelIcon[row.channel] ?? IconCalendarEvent
              return (
                <li key={`${row.leadId}-${row.nextContactAt}-${i}`}>
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl border border-border bg-muted/25 py-3 pl-3 pr-3 shadow-sm",
                      "dark:bg-muted/15"
                    )}
                  >
                    <div
                      className="absolute inset-y-2 left-0 w-1 rounded-full bg-primary"
                      aria-hidden
                    />
                    <div className="flex gap-3 pl-2">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
                        <ChIcon className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="font-medium leading-tight text-foreground">
                          {row.leadName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFollowUpDisplayDate(row.nextContactAt)}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          <span className="font-medium text-foreground/85">
                            {row.channel}
                          </span>
                          {row.ownerLabel ? (
                            <>
                              <span className="mx-1.5 text-border">·</span>
                              {row.ownerLabel}
                            </>
                          ) : null}
                        </p>
                        {row.reminder ? (
                          <p className="flex gap-2 rounded-xl bg-muted px-2.5 py-2 text-[11px] leading-relaxed text-muted-foreground">
                            <IconBell
                              className="mt-0.5 size-3.5 shrink-0 text-primary"
                              aria-hidden
                            />
                            <span className="line-clamp-2">{row.reminder}</span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
