import { getLeadSourceMeta } from "@/features/leads/lib/lead-source-meta"
import type { Lead } from "@/features/leads/types/lead"

export function LeadSourceCell({ lead }: { lead: Lead }) {
  const { label, Icon } = getLeadSourceMeta(lead.source)

  return (
    <span
      className="inline-flex size-8 items-center justify-center text-stat-muted"
      title={label}
      aria-label={`Origem: ${label}`}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
    </span>
  )
}
