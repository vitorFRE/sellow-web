import type { LeadStatus } from "@/features/leads/types/lead"
import {
  getLeadStatusLabel,
  KANBAN_LEAD_STATUSES,
  LEAD_STATUS_META,
} from "@/features/leads/config/lead-status"
import { cn } from "@/lib/utils"

type Props = {
  countsByStatus: Partial<Record<LeadStatus, number>> | Record<LeadStatus, number>
  className?: string
}

export function DashboardPipelineStatusList({ countsByStatus, className }: Props) {
  const total = KANBAN_LEAD_STATUSES.reduce(
    (sum, status) => sum + (countsByStatus[status] ?? 0),
    0
  )

  return (
    <div className={cn("min-w-0", className)}>
      <p className="mb-4 font-mono text-xs tabular-nums text-stat-muted">
        {total.toLocaleString("pt-BR")} leads no funil
      </p>
      <ul className="max-h-80 divide-y divide-border overflow-y-auto sm:max-h-none">
        {KANBAN_LEAD_STATUSES.map((status) => {
          const n = countsByStatus[status] ?? 0
          const share = total > 0 ? Math.round((n / total) * 100) : 0

          return (
            <li
              key={status}
              className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    LEAD_STATUS_META[status].dotClass
                  )}
                  aria-hidden
                />
                <span className="truncate text-sm text-stat-muted">
                  {getLeadStatusLabel(status)}
                </span>
              </span>
              <span className="flex shrink-0 items-baseline gap-2 tabular-nums">
                <span className="text-sm font-semibold text-stat-value">{n}</span>
                <span className="font-mono text-[11px] text-stat-muted">
                  {share}%
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
