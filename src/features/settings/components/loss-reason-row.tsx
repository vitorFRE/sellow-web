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
  const description = reason.description?.trim()

  return (
    <li
      className={cn(
        "flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between",
        busy && "opacity-60"
      )}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium text-stat-value">{reason.name}</p>
        <p className="text-sm leading-relaxed text-stat-muted">
          {description || "Sem descrição"}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1 self-start">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 px-2 text-stat-muted hover:text-stat-value"
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
          className="h-8 gap-1.5 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
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
