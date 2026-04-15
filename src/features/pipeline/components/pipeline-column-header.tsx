import { cn } from "@/lib/utils"
import type { LeadStatus } from "@/features/leads/types/lead"
import {
  PIPELINE_STATUS_DOT,
} from "@/features/pipeline/config/pipeline-columns"

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
    <div className="shrink-0 border-b border-border/80 bg-card/40 px-3 py-3">
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "size-2 shrink-0 rounded-full ring-2 ring-background",
            PIPELINE_STATUS_DOT[status]
          )}
          aria-hidden
        />
        <h2 className="min-w-0 flex-1 truncate font-medium text-sm tracking-tight">
          {title}
        </h2>
        <span className="shrink-0 rounded-full border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground tabular-nums shadow-sm">
          {isLoading ? "…" : total}
        </span>
      </div>
      {hasMore ? (
        <p className="mt-2 pl-4 text-xs text-muted-foreground">
          Mostrando {shown} de {fullTotal}
        </p>
      ) : null}
    </div>
  )
}
