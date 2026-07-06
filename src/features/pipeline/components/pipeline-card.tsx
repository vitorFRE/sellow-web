import * as React from "react"
import { useDraggable } from "@dnd-kit/react"

import { cn } from "@/lib/utils"
import type { Lead, LeadStatus } from "@/features/leads/types/lead"
import { PipelineCardActions } from "@/features/pipeline/components/pipeline-card-actions"
import { PipelineLeadCardContent } from "@/features/pipeline/components/pipeline-lead-card-content"

export function PipelineKanbanCard({
  lead,
  columnStatus,
  onOpenDetail,
  canDrag = true,
  canWriteLeads = false,
  onSendToImported,
  sendToImportedPendingId,
}: {
  lead: Lead
  columnStatus: LeadStatus
  onOpenDetail?: (lead: Lead, columnStatus: LeadStatus) => void
  canDrag?: boolean
  canWriteLeads?: boolean
  onSendToImported?: (id: string, fromStatus: LeadStatus) => void
  sendToImportedPendingId?: string | null
}) {
  const sessionHadDrag = React.useRef(false)
  const suppressDetailRef = React.useRef(false)

  const suppressDetailOnce = React.useCallback(() => {
    suppressDetailRef.current = true
    window.setTimeout(() => {
      suppressDetailRef.current = false
    }, 300)
  }, [])

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
      onClick={(event) => {
        if (!onOpenDetail) return
        if (suppressDetailRef.current) return
        if (sessionHadDrag.current) {
          sessionHadDrag.current = false
          return
        }
        if (
          (event.target as HTMLElement).closest("[data-pipeline-card-interactive]")
        ) {
          return
        }
        onOpenDetail(lead, columnStatus)
      }}
      role="presentation"
    >
      <PipelineLeadCardContent
        lead={lead}
        trailing={
          canWriteLeads && onSendToImported ? (
            <PipelineCardActions
              lead={lead}
              columnStatus={columnStatus}
              onConfirm={onSendToImported}
              onSuppressCardClick={suppressDetailOnce}
              isPending={sendToImportedPendingId === lead.id}
            />
          ) : null
        }
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
