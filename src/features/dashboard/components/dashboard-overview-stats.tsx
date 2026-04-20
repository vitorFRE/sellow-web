import { Link } from "@tanstack/react-router"
import { IconArrowUpRight, IconLayoutKanban } from "@tabler/icons-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { LeadStatus } from "@/features/leads/types/lead"
import {
  PIPELINE_COLUMN_LABELS,
  PIPELINE_STATUSES,
  PIPELINE_STATUS_DOT,
} from "@/features/pipeline/config/pipeline-columns"

type Props = {
  totalLeads: number
  countsByStatus: Partial<Record<LeadStatus, number>> | Record<LeadStatus, number>
  className?: string
}

export function DashboardOverviewStats({
  totalLeads,
  countsByStatus,
  className,
}: Props) {
  return (
    <section className={cn("space-y-5", className)}>
      <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Funil comercial
            </p>
            <p className="text-4xl font-semibold tabular-nums tracking-tight text-primary sm:text-5xl">
              {totalLeads}
            </p>
            <p className="text-sm text-muted-foreground">leads no total</p>
          </div>
          <Link
            to="/dashboard/pipeline"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "shrink-0 gap-2 rounded-2xl shadow-none"
            )}
          >
            <IconLayoutKanban className="size-4 opacity-80" aria-hidden />
            Pipeline
            <IconArrowUpRight className="size-3.5 opacity-70" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-0 snap-x snap-mandatory gap-2.5 pb-0.5 sm:flex-wrap sm:overflow-visible">
          {PIPELINE_STATUSES.map((status) => {
            const n = countsByStatus[status] ?? 0
            return (
              <div
                key={status}
                className={cn(
                  "snap-start rounded-2xl border border-border bg-muted/30 px-3.5 py-2.5 sm:min-w-0",
                  "min-w-[7.25rem] shadow-sm transition-colors hover:bg-muted/45 dark:bg-muted/20 dark:hover:bg-muted/35"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "size-2 shrink-0 rounded-full ring-2 ring-background",
                      PIPELINE_STATUS_DOT[status]
                    )}
                    aria-hidden
                  />
                  <span className="line-clamp-2 text-[11px] font-medium leading-tight text-muted-foreground">
                    {PIPELINE_COLUMN_LABELS[status]}
                  </span>
                </div>
                <p className="mt-1.5 pl-4 text-xl font-semibold tabular-nums tracking-tight text-foreground">
                  {n}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
