"use client"

import * as React from "react"

import { LeadDetailFollowUpPanel } from "@/features/lead-detail/components/lead-detail-follow-up-panel"
import { LeadDetailNotesEditor } from "@/features/lead-detail/components/lead-detail-notes-editor"
import type { LeadDetailView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  detail: LeadDetailView
}

export function LeadDetailTrackingTab({ detail }: Props) {
  const notesBaseline = detail.notes.join("\n\n")

  const [notesSaved, setNotesSaved] = React.useState(notesBaseline)
  const [notesDraft, setNotesDraft] = React.useState(notesBaseline)

  const [followSaved, setFollowSaved] = React.useState(detail.followUp)

  const notesDirty = notesDraft !== notesSaved

  return (
    <div className="space-y-8">
      <LeadDetailNotesEditor
        value={notesDraft}
        onChange={setNotesDraft}
        dirty={notesDirty}
        onSave={() => setNotesSaved(notesDraft)}
        onCancel={() => setNotesDraft(notesSaved)}
      />

      <LeadDetailFollowUpPanel saved={followSaved} onSavedChange={setFollowSaved} />
    </div>
  )
}
