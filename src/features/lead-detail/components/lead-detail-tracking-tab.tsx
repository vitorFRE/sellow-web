"use client"

import * as React from "react"

import { LeadDetailFollowUpPanel } from "@/features/lead-detail/components/lead-detail-follow-up-panel"
import { LeadDetailNotesEditor } from "@/features/lead-detail/components/lead-detail-notes-editor"
import {
  useLeadNotesQuery,
  useSaveLeadNotesMutation,
} from "@/features/lead-detail/hooks/use-lead-notes"

type Props = {
  leadId: string
}

export function LeadDetailTrackingTab({ leadId }: Props) {
  const notesQuery = useLeadNotesQuery(leadId)
  const saveNotes = useSaveLeadNotesMutation(leadId)

  const serverBody = notesQuery.data?.body ?? ""
  const [notesSaved, setNotesSaved] = React.useState(serverBody)
  const [notesDraft, setNotesDraft] = React.useState(serverBody)

  React.useEffect(() => {
    if (!notesQuery.isSuccess) return
    setNotesSaved((prevSaved) => {
      if (prevSaved === serverBody) return prevSaved
      setNotesDraft((prevDraft) =>
        prevDraft === prevSaved ? serverBody : prevDraft
      )
      return serverBody
    })
  }, [notesQuery.isSuccess, serverBody])

  const notesDirty = notesDraft !== notesSaved

  const handleSaveNotes = () => {
    saveNotes.mutate(notesDraft, {
      onSuccess: (data) => {
        setNotesSaved(data.body)
        setNotesDraft(data.body)
      },
    })
  }

  return (
    <div className="space-y-8">
      <LeadDetailNotesEditor
        value={notesDraft}
        onChange={setNotesDraft}
        dirty={notesDirty}
        isLoading={notesQuery.isLoading}
        isSaving={saveNotes.isPending}
        onSave={handleSaveNotes}
        onCancel={() => setNotesDraft(notesSaved)}
      />

      <LeadDetailFollowUpPanel leadId={leadId} />
    </div>
  )
}
