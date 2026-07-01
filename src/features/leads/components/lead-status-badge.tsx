import { cn } from "@/lib/utils"
import { LEAD_STATUS_META } from "@/features/leads/config/lead-status"
import type { LeadStatus } from "@/features/leads/types/lead"

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const meta = LEAD_STATUS_META[status]
  return (
    <span
      className={cn(
        "inline-flex max-w-full rounded-full px-2.5 py-0.5 text-xs font-medium",
        meta.badgeClass
      )}
    >
      {meta.label}
    </span>
  )
}
