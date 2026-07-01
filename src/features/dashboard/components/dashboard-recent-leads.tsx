import { Link } from "@tanstack/react-router"
import { IconChevronRight, IconClock, IconUsers } from "@tabler/icons-react"

import { LeadStatusBadge } from "@/features/leads/components/lead-status-badge"
import type { Lead } from "@/features/leads/types/lead"
import { leadInitials } from "@/features/dashboard/lib/dashboard-ui-utils"
import { formatDateTimeShortPtOrDash } from "@/shared/lib/format-datetime"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PREVIEW_COUNT = 5

type Props = {
  leads: Lead[]
  className?: string
}

export function DashboardRecentLeads({ leads, className }: Props) {
  const preview = leads.slice(0, PREVIEW_COUNT)

  return (
    <section className={cn("flex flex-col overflow-hidden", className)}>
      <div className="dashboard-panel-header">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <IconUsers className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                Atividade recente
              </h2>
              <p className="text-xs text-muted-foreground">
                Últimas atualizações no funil
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/leads"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-0.5 pr-1 pl-2 text-xs text-muted-foreground hover:text-foreground"
            )}
          >
            Ver todos
            <IconChevronRight className="size-3.5 opacity-70" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        {preview.length === 0 ? (
          <p className="px-2 py-8 text-center text-sm text-muted-foreground">
            Nenhum lead para exibir ainda.
          </p>
        ) : (
          <ul className="space-y-1">
            {preview.map((lead) => (
              <li key={lead.id}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors",
                    "hover:bg-muted/40"
                  )}
                >
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/80 text-[11px] font-semibold text-muted-foreground"
                    aria-hidden
                  >
                    {leadInitials(lead.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium leading-tight text-foreground">
                      {lead.name}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <IconClock className="size-3 shrink-0 opacity-70" aria-hidden />
                      {formatDateTimeShortPtOrDash(lead.updatedAt)}
                    </p>
                  </div>
                  <LeadStatusBadge status={lead.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
