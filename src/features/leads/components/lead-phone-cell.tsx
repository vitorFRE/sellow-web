import { formatLeadPhoneCompact } from "@/features/leads/lib/format-lead-phone"
import type { Lead } from "@/features/leads/types/lead"

export function LeadPhoneCell({ lead }: { lead: Lead }) {
  const raw = lead.phone?.trim()
  const compact = formatLeadPhoneCompact(raw)

  if (!compact) {
    return <span className="text-stat-muted">—</span>
  }

  return (
    <span
      className="block max-w-32 truncate font-mono text-xs tabular-nums text-stat-value"
      title={raw ?? compact}
    >
      {compact}
    </span>
  )
}
