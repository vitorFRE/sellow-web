"use client"

import * as React from "react"
import { IconLoader2 } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LeadDetailFollowUpFields } from "@/features/lead-detail/components/lead-detail-follow-up-fields"
import { isFollowUpDirty } from "@/features/lead-detail/lib/follow-up-form-utils"
import type { LeadFollowUpView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial: LeadFollowUpView
  title: string
  isSaving?: boolean
  onSave: (value: LeadFollowUpView) => void
}

export function LeadDetailFollowUpDialog({
  open,
  onOpenChange,
  initial,
  title,
  isSaving = false,
  onSave,
}: Props) {
  const [draft, setDraft] = React.useState(initial)
  const dirty = isFollowUpDirty(draft, initial)
  const isNew = !initial.nextContactAt.trim() && !initial.ownerLabel.trim()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,40rem)] overflow-y-auto sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Preencha data do próximo contato, canal e responsável. O follow-up fica vinculado ao
            lead e sincroniza com o backend.
          </DialogDescription>
        </DialogHeader>

        <LeadDetailFollowUpFields value={draft} onChange={setDraft} />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={() => onSave(draft)}
            disabled={isSaving || (!isNew && !dirty)}
          >
            {isSaving ? (
              <>
                <IconLoader2 className="size-3.5 animate-spin" aria-hidden />
                Salvando…
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
