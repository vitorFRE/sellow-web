import { IconLink, IconMapPin } from "@tabler/icons-react"

import type { Lead } from "@/features/leads/types/lead"
import {
  leadLinkIconClass,
  normalizeLeadHref,
} from "@/features/leads/lib/lead-link-utils"
import { cn } from "@/lib/utils"

type Props = {
  lead: Lead
  className?: string
}

function stopDrag(e: { stopPropagation: () => void }) {
  e.stopPropagation()
}

export function PipelineCardLeadActions({ lead, className }: Props) {
  const websiteHref = normalizeLeadHref(lead.website)
  const mapsHref = normalizeLeadHref(lead.url)
  const hasAnyAction = Boolean(websiteHref || mapsHref)
  if (!hasAnyAction) return null

  return (
    <div
      className={cn(
        "mt-3 flex flex-wrap items-center justify-end gap-1 border-t border-border/60 pt-2.5",
        className
      )}
      role="toolbar"
      aria-label="Ações do lead"
    >
      {websiteHref ? (
        <a
          href={websiteHref}
          target="_blank"
          rel="noopener noreferrer"
          className={leadLinkIconClass}
          aria-label="Abrir site"
          title="Abrir site"
          onPointerDown={stopDrag}
          onClick={stopDrag}
        >
          <IconLink className="size-4" aria-hidden />
        </a>
      ) : null}
      {mapsHref ? (
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className={leadLinkIconClass}
          aria-label="Abrir no Google Maps"
          title="Abrir no Google Maps"
          onPointerDown={stopDrag}
          onClick={stopDrag}
        >
          <IconMapPin className="size-4" aria-hidden />
        </a>
      ) : null}
    </div>
  )
}
