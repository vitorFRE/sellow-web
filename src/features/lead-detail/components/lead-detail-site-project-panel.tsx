"use client"

import * as React from "react"

import { LeadDetailSiteProjectDialog } from "@/features/lead-detail/components/lead-detail-site-project-dialog"
import { LeadDetailSiteProjectEmptyState } from "@/features/lead-detail/components/lead-detail-site-project-empty-state"
import { LeadDetailSiteProjectSummaryCard } from "@/features/lead-detail/components/lead-detail-site-project-summary-card"
import {
  EMPTY_SITE_PROJECT,
  hasSiteProjectContent,
} from "@/features/lead-detail/lib/site-project-utils"
import type { LeadSiteProjectView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  saved: LeadSiteProjectView
  onSavedChange: (next: LeadSiteProjectView) => void
  className?: string
}

export function LeadDetailSiteProjectPanel({ saved, onSavedChange, className }: Props) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogInitial, setDialogInitial] = React.useState<LeadSiteProjectView>(saved)
  const [dialogKey, setDialogKey] = React.useState(0)

  const openDialog = React.useCallback((initial: LeadSiteProjectView) => {
    setDialogInitial(initial)
    setDialogKey((k) => k + 1)
    setDialogOpen(true)
  }, [])

  const has = hasSiteProjectContent(saved)

  return (
    <section className={className}>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Projeto
      </h3>

      {has ? (
        <LeadDetailSiteProjectSummaryCard
          project={saved}
          onEdit={() => openDialog({ ...saved })}
          onClear={() => onSavedChange(EMPTY_SITE_PROJECT)}
        />
      ) : (
        <LeadDetailSiteProjectEmptyState onCreate={() => openDialog(EMPTY_SITE_PROJECT)} />
      )}

      <LeadDetailSiteProjectDialog
        key={dialogKey}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={dialogInitial}
        title={has ? "Editar projeto" : "Criar projeto"}
        onSave={(value) => {
          onSavedChange(value)
          setDialogOpen(false)
        }}
      />
    </section>
  )
}
