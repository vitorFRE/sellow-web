import {
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import type { ImportReview } from "@/features/leads/types/lead"

type Props = {
  value: ImportReview | null | undefined
  disabled?: boolean
  isPending?: boolean
  onChange: (next: ImportReview | null) => void
}

const btnBase =
  "inline-flex size-7 items-center justify-center rounded border border-transparent transition-colors disabled:pointer-events-none disabled:opacity-40"

export function LeadImportReviewCell({
  value,
  disabled,
  isPending,
  onChange,
}: Props) {
  const isPositive = value === "POSITIVE"
  const isNegative = value === "NEGATIVE"

  const handlePositive = () => {
    onChange(isPositive ? null : "POSITIVE")
  }

  const handleNegative = () => {
    onChange(isNegative ? null : "NEGATIVE")
  }

  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        className={cn(
          btnBase,
          isPositive
            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
            : "text-stat-muted hover:bg-muted/60 hover:text-stat-value"
        )}
        disabled={disabled || isPending}
        title={isPositive ? "Remover aprovação" : "Aprovar lead"}
        aria-label={isPositive ? "Remover aprovação" : "Aprovar lead"}
        aria-pressed={isPositive}
        onClick={handlePositive}
      >
        {isPositive ? (
          <IconThumbUpFilled className="size-3.5" aria-hidden />
        ) : (
          <IconThumbUp className="size-3.5" aria-hidden />
        )}
      </button>
      <button
        type="button"
        className={cn(
          btnBase,
          isNegative
            ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
            : "text-stat-muted hover:bg-muted/60 hover:text-stat-value"
        )}
        disabled={disabled || isPending}
        title={isNegative ? "Remover reprovação" : "Reprovar lead"}
        aria-label={isNegative ? "Remover reprovação" : "Reprovar lead"}
        aria-pressed={isNegative}
        onClick={handleNegative}
      >
        {isNegative ? (
          <IconThumbDownFilled className="size-3.5" aria-hidden />
        ) : (
          <IconThumbDown className="size-3.5" aria-hidden />
        )}
      </button>
    </div>
  )
}
