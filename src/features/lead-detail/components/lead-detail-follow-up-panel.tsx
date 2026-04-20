"use client"

import * as React from "react"
import { toast } from "sonner"

import { LeadDetailFollowUpDialog } from "@/features/lead-detail/components/lead-detail-follow-up-dialog"
import { LeadDetailFollowUpEmptyState } from "@/features/lead-detail/components/lead-detail-follow-up-empty-state"
import { LeadDetailFollowUpSummaryCard } from "@/features/lead-detail/components/lead-detail-follow-up-summary-card"
import {
  useDeleteLeadFollowUpMutation,
  useLeadFollowUpQuery,
  useSaveLeadFollowUpMutation,
} from "@/features/lead-detail/hooks/use-lead-follow-up"
import { EMPTY_FOLLOW_UP } from "@/features/lead-detail/lib/follow-up-form-utils"
import {
  followUpResponseToView,
  followUpViewToInput,
  validateFollowUpDraft,
} from "@/features/lead-detail/lib/follow-up-mappers"
import type { LeadFollowUpView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  leadId: string
  className?: string
}

export function LeadDetailFollowUpPanel({ leadId, className }: Props) {
  const followUpQuery = useLeadFollowUpQuery(leadId)
  const saveFollowUp = useSaveLeadFollowUpMutation(leadId)
  const deleteFollowUp = useDeleteLeadFollowUpMutation(leadId)

  const saved: LeadFollowUpView | null = followUpQuery.data
    ? followUpResponseToView(followUpQuery.data)
    : null

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogInitial, setDialogInitial] =
    React.useState<LeadFollowUpView>(EMPTY_FOLLOW_UP)
  const [dialogKey, setDialogKey] = React.useState(0)

  const openDialog = React.useCallback((initial: LeadFollowUpView) => {
    setDialogInitial(initial)
    setDialogKey((k) => k + 1)
    setDialogOpen(true)
  }, [])

  const handleSave = (draft: LeadFollowUpView) => {
    const error = validateFollowUpDraft(draft)
    if (error) {
      toast.error(error, { id: `lead-follow-up-${leadId}` })
      return
    }
    saveFollowUp.mutate(followUpViewToInput(draft), {
      onSuccess: () => setDialogOpen(false),
    })
  }

  const handleClear = () => {
    deleteFollowUp.mutate()
  }

  return (
    <section className={className}>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Follow-up
      </h3>

      {followUpQuery.isLoading ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-muted/10 px-4 py-6 text-center text-xs text-muted-foreground">
          Carregando follow-up…
        </div>
      ) : saved ? (
        <LeadDetailFollowUpSummaryCard
          followUp={saved}
          onEdit={() => openDialog({ ...saved })}
          onClear={handleClear}
          isClearing={deleteFollowUp.isPending}
        />
      ) : (
        <LeadDetailFollowUpEmptyState onSchedule={() => openDialog(EMPTY_FOLLOW_UP)} />
      )}

      <LeadDetailFollowUpDialog
        key={dialogKey}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={dialogInitial}
        title={saved ? "Editar follow-up" : "Agendar follow-up"}
        isSaving={saveFollowUp.isPending}
        onSave={handleSave}
      />
    </section>
  )
}
