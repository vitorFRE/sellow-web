import { useDroppable } from "@dnd-kit/react"

import { cn } from "@/lib/utils"
import type {
  Lead,
  LeadStatus,
  LeadsListMeta,
} from "@/features/leads/types/lead"
import { PipelineKanbanCard } from "@/features/pipeline/components/pipeline-card"
import { PipelineColumnHeader } from "@/features/pipeline/components/pipeline-column-header"

type PipelineColumnProps = {
  status: LeadStatus
  title: string
  leads: Lead[]
  meta: LeadsListMeta | undefined
  isLoading: boolean
  onOpenLeadDetail?: (lead: Lead, columnStatus: LeadStatus) => void
}

export function PipelineColumn({
  status,
  title,
  leads,
  meta,
  isLoading,
  onOpenLeadDetail,
}: PipelineColumnProps) {
  const { ref, isDropTarget } = useDroppable({ id: status })
  const total = meta?.total ?? leads.length
  const hasMore = meta != null && meta.total > leads.length

  return (
    <div className="flex h-full max-h-full min-h-0 w-[300px] shrink-0 flex-col self-stretch overflow-hidden rounded-2xl border border-border/80 bg-muted/20 shadow-sm">
      <PipelineColumnHeader
        status={status}
        title={title}
        total={total}
        isLoading={isLoading}
        hasMore={hasMore}
        shown={leads.length}
        fullTotal={meta?.total ?? leads.length}
      />
      <div
        ref={ref}
        className={cn(
          "pipeline-scroll flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto p-2.5",
          isDropTarget && "bg-primary/5 ring-1 ring-primary/20 ring-inset"
        )}
      >
        {isLoading ? (
          <p className="px-1 py-6 text-center text-xs text-muted-foreground">
            Carregando…
          </p>
        ) : leads.length === 0 ? (
          <p className="px-1 py-6 text-center text-xs text-muted-foreground">
            Nenhum lead
          </p>
        ) : (
          leads.map((lead) => (
            <PipelineKanbanCard
              key={lead.id}
              lead={lead}
              columnStatus={status}
              onOpenDetail={onOpenLeadDetail}
            />
          ))
        )}
      </div>
    </div>
  )
}
