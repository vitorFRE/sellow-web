import { IconMapPin } from "@tabler/icons-react"

import {
  leadLinkIconClass,
  normalizeLeadHref,
} from "@/features/leads/lib/lead-link-utils"
import type { Lead } from "@/features/leads/types/lead"

/** Link do Google Maps (`url` no backend). */
export function LeadMapsCell({ lead }: { lead: Lead }) {
  const href = normalizeLeadHref(lead.url)
  if (!href) {
    return <span className="text-muted-foreground">—</span>
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={leadLinkIconClass}
      aria-label="Abrir no Google Maps"
    >
      <IconMapPin className="size-4" />
    </a>
  )
}
