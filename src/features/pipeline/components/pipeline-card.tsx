import * as React from "react"
import { useDraggable } from "@dnd-kit/react"

import { cn } from "@/lib/utils"
import type { Lead, LeadStatus } from "@/features/leads/types/lead"
import { PipelineLeadCardContent } from "@/features/pipeline/components/pipeline-lead-card-content"

export function PipelineKanbanCard({
  lead,
  columnStatus,
  onOpenDetail,
  canDrag = true,
}: {
  lead: Lead
  columnStatus: LeadStatus
  onOpenDetail?: (lead: Lead, columnStatus: LeadStatus) => void
  canDrag?: boolean
}) {
  const sessionHadDrag = React.useRef(false)
  const { ref, isDragging } = useDraggable({
    id: lead.id,
    data: { status: columnStatus },
    disabled: !canDrag,
  })

  React.useEffect(() => {
    if (isDragging) sessionHadDrag.current = true
  }, [isDragging])

  return (
    <div
      ref={ref}
      className="min-w-0 shrink-0"
      onPointerDown={() => {
        sessionHadDrag.current = false
      }}
      onClick={() => {
        if (!onOpenDetail) return
        if (sessionHadDrag.current) {
          sessionHadDrag.current = false
          return
        }
        onOpenDetail(lead, columnStatus)
      }}
      role="presentation"
    >
      <PipelineLeadCardContent
        lead={lead}
        className={cn(
          canDrag ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
          "transition-opacity",
          isDragging && "opacity-40"
        )}
      />
    </div>
  )
}

export function PipelineCardDragPreview({ lead }: { lead: Lead }) {
  return (
    <PipelineLeadCardContent
      lead={lead}
      className="w-[256px] cursor-grabbing ring-1 ring-primary/20"
    />
  )
}
