import { formatLeadLocation } from "@/features/leads/lib/format-lead-location"
import type { Lead } from "@/features/leads/types/lead"

export function LeadLocationCell({ lead }: { lead: Lead }) {
  const label = formatLeadLocation(lead.city, lead.state)
  if (!label) {
    return <span className="text-stat-muted">—</span>
  }

  return (
    <span
      className="block max-w-36 truncate text-xs text-stat-muted"
      title={label}
    >
      {label}
    </span>
  )
}
