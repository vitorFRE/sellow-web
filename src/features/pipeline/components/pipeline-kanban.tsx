import * as React from "react"
import {
  DragDropProvider,
  DragOverlay,
  type DragEndEvent,
} from "@dnd-kit/react"
import { toast } from "sonner"

import { getWorkspaceForbiddenMessage } from "@/shared/lib/api-errors"
import type { Lead, LeadStatus } from "@/features/leads/types/lead"
import type { LeadListFilterState } from "@/features/leads/types/lead-list-query"
import { LeadDetailSheet } from "@/features/lead-detail/components/lead-detail-sheet"
import { PipelineCardDragPreview } from "@/features/pipeline/components/pipeline-card"
import { PipelineColumn } from "@/features/pipeline/components/pipeline-column"
import {
  isPipelineColumnStatus,
  PIPELINE_COLUMN_LABELS,
  PIPELINE_STATUSES,
} from "@/features/pipeline/config/pipeline-columns"
import { PipelineLostReasonDialog } from "@/features/pipeline/components/pipeline-lost-reason-dialog"
import { usePipelineBoardQueries } from "@/features/pipeline/hooks/use-pipeline-board-queries"
import { usePipelineMoveLead } from "@/features/pipeline/hooks/use-pipeline-move-lead"
import { useWorkspacePermissions } from "@/features/workspaces/hooks/use-workspace-permissions"

type LostPending = {
  id: string
  fromStatus: LeadStatus
  name: string
}

type Props = {
  filters: LeadListFilterState
}

export function PipelineKanban({ filters }: Props) {
  const { canWriteLeads } = useWorkspacePermissions()
  const { byStatus, metaByStatus, isError, error, queries } =
    usePipelineBoardQueries(filters)
  const moveLead = usePipelineMoveLead(filters)
  const [lostPending, setLostPending] = React.useState<LostPending | null>(null)
  const [leadDetail, setLeadDetail] = React.useState<{
    lead: Lead
    columnStatus: LeadStatus
  } | null>(null)

  const openLeadDetail = React.useCallback((lead: Lead, columnStatus: LeadStatus) => {
    setLeadDetail({ lead, columnStatus })
  }, [])

  const closeLeadDetail = React.useCallback((open: boolean) => {
    if (!open) setLeadDetail(null)
  }, [])

  React.useEffect(() => {
    if (!isError || !error) return
    const message = getWorkspaceForbiddenMessage(
      error,
      error instanceof Error
        ? error.message
        : "Não foi possível carregar o pipeline."
    )
    toast.error(message, { id: "pipeline-board-load" })
  }, [isError, error])

  const leadsById = React.useMemo(() => {
    const m = new Map<string, Lead>()
    for (const status of PIPELINE_STATUSES) {
      for (const lead of byStatus[status]) {
        m.set(lead.id, lead)
      }
    }
    return m
  }, [byStatus])

  const onDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      if (!canWriteLeads) return
      if (event.canceled) return
      const source = event.operation.source
      const target = event.operation.target
      if (!source || target == null) return

      const leadId = String(source.id)
      const rawTarget = String(target.id)
      if (!isPipelineColumnStatus(rawTarget)) return

      const from = (source.data as { status?: LeadStatus } | undefined)?.status
      if (from == null || from === rawTarget) return

      if (rawTarget === "LOST") {
        const lead = leadsById.get(leadId)
        setLostPending({
          id: leadId,
          fromStatus: from,
          name: lead?.name ?? "Lead",
        })
        return
      }

      moveLead.mutate({
        id: leadId,
        status: rawTarget,
        fromStatus: from,
      })
    },
    [canWriteLeads, leadsById, moveLead]
  )

  const confirmLost = React.useCallback(
    (lossReasonId: string, lossReasonNote: string | null) => {
      if (!lostPending) return
      moveLead.mutate(
        {
          id: lostPending.id,
          status: "LOST",
          fromStatus: lostPending.fromStatus,
          lossReasonId,
          lossReasonNote,
        },
        { onSuccess: () => setLostPending(null) }
      )
    },
    [lostPending, moveLead]
  )

  const handleSendToImported = React.useCallback(
    (id: string, fromStatus: LeadStatus) => {
      if (!canWriteLeads) return
      moveLead.mutate({ id, status: "IMPORTED", fromStatus })
    },
    [canWriteLeads, moveLead]
  )

  const sendToImportedPendingId =
    moveLead.isPending && moveLead.variables?.status === "IMPORTED"
      ? moveLead.variables.id
      : null

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <div className="flex h-full min-h-0 min-w-0 w-full flex-col overflow-hidden">
        <div className="flex h-full min-h-0 min-w-0 flex-1 flex-row items-stretch gap-2.5 overflow-x-auto overflow-y-hidden">
          {PIPELINE_STATUSES.map((status, i) => (
            <PipelineColumn
              key={status}
              status={status}
              title={PIPELINE_COLUMN_LABELS[status]}
              leads={byStatus[status]}
              meta={metaByStatus[status]}
              isLoading={queries[i]?.isLoading ?? false}
              onOpenLeadDetail={openLeadDetail}
              canDrag={canWriteLeads}
              canWriteLeads={canWriteLeads}
              onSendToImported={handleSendToImported}
              sendToImportedPendingId={sendToImportedPendingId}
            />
          ))}
        </div>
      </div>

      <DragOverlay>
        {(source) => {
          if (source == null) return null
          const lead = leadsById.get(String(source.id))
          if (!lead) return null
          return <PipelineCardDragPreview lead={lead} />
        }}
      </DragOverlay>

      <PipelineLostReasonDialog
        open={lostPending != null}
        leadName={lostPending?.name ?? ""}
        isPending={
          moveLead.isPending &&
          moveLead.variables?.id === lostPending?.id &&
          moveLead.variables?.status === "LOST"
        }
        onCancel={() => setLostPending(null)}
        onConfirm={confirmLost}
      />

      <LeadDetailSheet
        lead={leadDetail?.lead ?? null}
        columnStatus={leadDetail?.columnStatus ?? null}
        open={leadDetail != null}
        onOpenChange={closeLeadDetail}
      />
    </DragDropProvider>
  )
}
