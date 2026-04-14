import { IconLink } from "@tabler/icons-react"

import {
  leadLinkIconClass,
  normalizeLeadHref,
} from "@/features/leads/lib/lead-link-utils"
import type { Lead } from "@/features/leads/types/lead"

export function LeadWebsiteCell({ lead }: { lead: Lead }) {
  const href = normalizeLeadHref(lead.website)
  if (!href) {
    return <span className="text-muted-foreground">—</span>
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={leadLinkIconClass}
      aria-label="Abrir site"
    >
      <IconLink className="size-4" />
    </a>
  )
}
