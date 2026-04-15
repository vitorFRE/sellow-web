import { IconPencil, IconTrash } from "@tabler/icons-react"

import type { LossReason } from "@/features/settings/types/loss-reason"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  reason: LossReason
  onEdit: (r: LossReason) => void
  onDelete: (r: LossReason) => void
  busy?: boolean
}

export function LossReasonRow({ reason, onEdit, onDelete, busy }: Props) {
  return (
    <li
      className={cn(
        "flex flex-col gap-2 border-b border-border/70 px-3 py-2.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
      )}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium text-foreground">{reason.name}</p>
        {reason.description?.trim() ? (
          <p className="text-xs text-muted-foreground wrap-break-word">
            {reason.description}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground/70">Sem descrição</p>
        )}
      </div>
      <div className="flex shrink-0 gap-1.5 self-end sm:self-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 rounded-xl px-2.5"
          disabled={busy}
          onClick={() => onEdit(reason)}
        >
          <IconPencil className="size-3.5" aria-hidden />
          Editar
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 rounded-xl px-2.5 text-destructive hover:bg-destructive/10"
          disabled={busy}
          onClick={() => onDelete(reason)}
        >
          <IconTrash className="size-3.5" aria-hidden />
          Excluir
        </Button>
      </div>
    </li>
  )
}
