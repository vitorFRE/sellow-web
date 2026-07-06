import type { ReactNode } from "react"
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconLink,
  IconMapPin,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import {
  leadLinkIconClass,
  normalizeLeadHref,
} from "@/features/leads/lib/lead-link-utils"
import type { Lead } from "@/features/leads/types/lead"

type StopInteraction = (e: { stopPropagation: () => void }) => void

function ExternalIconLink({
  href,
  ariaLabel,
  title,
  className,
  stopInteraction,
  children,
}: {
  href: string
  ariaLabel: string
  title?: string
  className?: string
  stopInteraction?: StopInteraction
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(leadLinkIconClass, "size-7", className)}
      aria-label={ariaLabel}
      title={title ?? ariaLabel}
      onPointerDown={stopInteraction}
      onClick={stopInteraction}
    >
      {children}
    </a>
  )
}

export function leadHasExternalLinks(lead: Lead): boolean {
  return Boolean(
    normalizeLeadHref(lead.website) ||
      normalizeLeadHref(lead.url) ||
      normalizeLeadHref(lead.instagram) ||
      normalizeLeadHref(lead.facebook)
  )
}

export function LeadCardExternalLinks({
  lead,
  stopInteraction,
}: {
  lead: Lead
  stopInteraction?: StopInteraction
}) {
  const websiteHref = normalizeLeadHref(lead.website)
  const mapsHref = normalizeLeadHref(lead.url)
  const instagramHref = normalizeLeadHref(lead.instagram)
  const facebookHref = normalizeLeadHref(lead.facebook)

  return (
    <>
      {websiteHref ? (
        <ExternalIconLink
          href={websiteHref}
          ariaLabel="Abrir site"
          stopInteraction={stopInteraction}
        >
          <IconLink className="size-3.5" aria-hidden />
        </ExternalIconLink>
      ) : null}
      {mapsHref ? (
        <ExternalIconLink
          href={mapsHref}
          ariaLabel="Abrir no Google Maps"
          stopInteraction={stopInteraction}
        >
          <IconMapPin className="size-3.5" aria-hidden />
        </ExternalIconLink>
      ) : null}
      {instagramHref ? (
        <ExternalIconLink
          href={instagramHref}
          ariaLabel="Abrir Instagram"
          stopInteraction={stopInteraction}
        >
          <IconBrandInstagram className="size-3.5" aria-hidden />
        </ExternalIconLink>
      ) : null}
      {facebookHref ? (
        <ExternalIconLink
          href={facebookHref}
          ariaLabel="Abrir Facebook"
          stopInteraction={stopInteraction}
        >
          <IconBrandFacebook className="size-3.5" aria-hidden />
        </ExternalIconLink>
      ) : null}
    </>
  )
}
