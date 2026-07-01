import { cn } from "@/lib/utils"
import type { LeadStatus } from "@/features/leads/types/lead"
import { PIPELINE_STATUS_DOT } from "@/features/pipeline/config/pipeline-columns"

type PipelineColumnHeaderProps = {
  status: LeadStatus
  title: string
  total: number
  isLoading: boolean
  hasMore: boolean
  shown: number
  fullTotal: number
}

export function PipelineColumnHeader({
  status,
  title,
  total,
  isLoading,
  hasMore,
  shown,
  fullTotal,
}: PipelineColumnHeaderProps) {
  return (
    <div className="shrink-0 border-b border-stat-card-border px-3 py-3">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            PIPELINE_STATUS_DOT[status]
          )}
          aria-hidden
        />
        <h2 className="min-w-0 flex-1 truncate text-[11px] font-medium tracking-[0.1em] text-stat-label uppercase">
          {title}
        </h2>
        <span className="shrink-0 font-mono text-xs tabular-nums text-stat-muted">
          {isLoading ? "…" : total}
        </span>
      </div>
      {hasMore ? (
        <p className="mt-1.5 pl-3.5 font-mono text-[10px] text-stat-muted">
          {shown} de {fullTotal}
        </p>
      ) : null}
    </div>
  )
}
