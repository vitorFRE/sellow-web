import type { LeadStatus } from "@/features/leads/types/lead"
import {
  PIPELINE_COLUMN_LABELS,
  PIPELINE_STATUSES,
  PIPELINE_STATUS_DOT,
} from "@/features/pipeline/config/pipeline-columns"
import { cn } from "@/lib/utils"

type Props = {
  countsByStatus: Partial<Record<LeadStatus, number>> | Record<LeadStatus, number>
  className?: string
}

export function DashboardPipelineStatusList({ countsByStatus, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card px-5 py-4 shadow-sm",
        className
      )}
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Leads por etapa
      </p>
      <ul className="max-h-80 space-y-1.5 overflow-y-auto rounded-lg border border-border/80 bg-muted/20 p-2.5 dark:bg-muted/10 sm:max-h-none">
        {PIPELINE_STATUSES.map((status) => {
          const n = countsByStatus[status] ?? 0
          return (
            <li
              key={status}
              className="flex items-center justify-between gap-3 rounded-xl px-2.5 py-1.5 transition-colors hover:bg-muted/40"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className={cn("size-2 shrink-0 rounded-full", PIPELINE_STATUS_DOT[status])}
                  aria-hidden
                />
                <span className="truncate text-[11px] font-medium text-muted-foreground">
                  {PIPELINE_COLUMN_LABELS[status]}
                </span>
              </span>
              <span className="text-sm font-semibold tabular-nums text-foreground">{n}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
