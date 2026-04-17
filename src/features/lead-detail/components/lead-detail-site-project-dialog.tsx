"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LeadDetailSiteProjectFields } from "@/features/lead-detail/components/lead-detail-site-project-fields"
import { isSiteProjectDirty } from "@/features/lead-detail/lib/site-project-utils"
import type { LeadSiteProjectView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial: LeadSiteProjectView
  title: string
  onSave: (value: LeadSiteProjectView) => void
}

export function LeadDetailSiteProjectDialog({
  open,
  onOpenChange,
  initial,
  title,
  onSave,
}: Props) {
  const [draft, setDraft] = React.useState(initial)
  const dirty = isSiteProjectDirty(draft, initial)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,44rem)] overflow-y-auto sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Descreva o pacote de site negociado. Os dados ficam locais até existir API (mock).
          </DialogDescription>
        </DialogHeader>

        <LeadDetailSiteProjectFields value={draft} onChange={setDraft} />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={() => onSave(draft)} disabled={!dirty}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
