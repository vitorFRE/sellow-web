import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { EditLeadForm } from "@/features/leads/components/edit-lead-form/edit-lead-form"
import type { Lead } from "@/features/leads/types/lead"

type Props = {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditLeadModal({ lead, open, onOpenChange }: Props) {
  if (!lead) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[min(92dvh,720px)] gap-4 overflow-hidden border border-stat-card-border bg-stat-board sm:max-w-xl"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle>Editar lead</DialogTitle>
          <DialogDescription className="text-stat-muted">
            Atualize os dados do lead. Campos vazios removem o valor salvo.
          </DialogDescription>
        </DialogHeader>
        <EditLeadForm
          lead={lead}
          open={open}
          onSaved={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
