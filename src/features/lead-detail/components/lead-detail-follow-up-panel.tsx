"use client"

import * as React from "react"

import { LeadDetailFollowUpDialog } from "@/features/lead-detail/components/lead-detail-follow-up-dialog"
import { LeadDetailFollowUpEmptyState } from "@/features/lead-detail/components/lead-detail-follow-up-empty-state"
import { LeadDetailFollowUpSummaryCard } from "@/features/lead-detail/components/lead-detail-follow-up-summary-card"
import {
  EMPTY_FOLLOW_UP,
  hasFollowUpContent,
} from "@/features/lead-detail/lib/follow-up-form-utils"
import type { LeadFollowUpView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  saved: LeadFollowUpView
  onSavedChange: (next: LeadFollowUpView) => void
  className?: string
}

export function LeadDetailFollowUpPanel({ saved, onSavedChange, className }: Props) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogInitial, setDialogInitial] = React.useState<LeadFollowUpView>(saved)
  const [dialogKey, setDialogKey] = React.useState(0)

  const openDialog = React.useCallback((initial: LeadFollowUpView) => {
    setDialogInitial(initial)
    setDialogKey((k) => k + 1)
    setDialogOpen(true)
  }, [])

  const has = hasFollowUpContent(saved)

  return (
    <section className={className}>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Follow-up
      </h3>

      {has ? (
        <LeadDetailFollowUpSummaryCard
          followUp={saved}
          onEdit={() => openDialog({ ...saved })}
          onClear={() => onSavedChange(EMPTY_FOLLOW_UP)}
        />
      ) : (
        <LeadDetailFollowUpEmptyState onSchedule={() => openDialog(EMPTY_FOLLOW_UP)} />
      )}

      <LeadDetailFollowUpDialog
        key={dialogKey}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={dialogInitial}
        title={has ? "Editar follow-up" : "Agendar follow-up"}
        onSave={(value) => {
          onSavedChange(value)
          setDialogOpen(false)
        }}
      />
    </section>
  )
}
