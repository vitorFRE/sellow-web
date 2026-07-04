import { cn } from "@/lib/utils"
import { FEEDBACK_STATUS_LABELS } from "@/features/feedback/lib/feedback-labels"
import type { FeedbackStatus } from "@/features/feedback/types/feedback"

const STATUS_STYLES: Record<FeedbackStatus, string> = {
  OPEN: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  IN_REVIEW:
    "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  RESOLVED:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  CLOSED: "border-border bg-muted/40 text-stat-muted",
}

type Props = {
  status: FeedbackStatus
  className?: string
}

export function FeedbackStatusBadge({ status, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        STATUS_STYLES[status],
        className
      )}
    >
      {FEEDBACK_STATUS_LABELS[status]}
    </span>
  )
}
