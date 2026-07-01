import {
  IconAlertTriangle,
  IconLink,
  IconMapPin,
  IconPhone,
  IconStar,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Lead } from "@/features/leads/types/lead"
import {
  leadLinkIconClass,
  normalizeLeadHref,
} from "@/features/leads/lib/lead-link-utils"
import { formatDateTimeShortPt } from "@/shared/lib/format-datetime"
import {
  formatLeadLocation,
} from "@/features/leads/lib/format-lead-meta"
import {
  LEAD_SCORE_TIER_DOT,
  LEAD_SCORE_TIER_LABEL,
  leadScoreTier,
} from "@/features/pipeline/lib/lead-score-tier"

function stopDrag(e: { stopPropagation: () => void }) {
  e.stopPropagation()
}

export function PipelineLeadCardContent({
  lead,
  className,
}: {
  lead: Lead
  className?: string
}) {
  const location = formatLeadLocation(lead)
  const updated = formatDateTimeShortPt(lead.updatedAt)
  const scoreN =
    lead.totalScore != null && Number.isFinite(Number(lead.totalScore))
      ? Number(lead.totalScore)
      : null
  const tier = leadScoreTier(scoreN)
  const category = lead.categoryName?.trim() || "Lead"
  const lossReason = lead.lossReason?.trim() || null
  const websiteHref = normalizeLeadHref(lead.website)
  const mapsHref = normalizeLeadHref(lead.url)
  const hasLinks = Boolean(websiteHref || mapsHref)
  const hasMeta = Boolean(
    lead.phone?.trim() || location || lead.source || scoreN != null
  )

  return (
    <article
      className={cn(
        "rounded-lg border border-stat-card-border bg-stat-card p-3 text-left",
        className
      )}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-[10px] font-medium tracking-[0.08em] text-stat-muted uppercase">
              {category}
            </span>
            {tier ? (
              <span className="flex items-center gap-1 text-[10px] font-medium text-stat-muted">
                <span
                  className={cn("size-1.5 rounded-full", LEAD_SCORE_TIER_DOT[tier])}
                  aria-hidden
                />
                {LEAD_SCORE_TIER_LABEL[tier]}
              </span>
            ) : null}
            {lossReason ? (
              <Tooltip>
                <TooltipTrigger
                  aria-label={`Motivo de perda: ${lossReason}`}
                  className="inline-flex items-center text-amber-500"
                >
                  <IconAlertTriangle className="size-3" aria-hidden />
                </TooltipTrigger>
                <TooltipContent>Motivo: {lossReason}</TooltipContent>
              </Tooltip>
            ) : null}
          </div>

          <p className="line-clamp-2 text-sm font-medium leading-snug text-stat-value">
            {lead.name}
          </p>

          {updated ? (
            <p className="font-mono text-[10px] text-stat-muted">
              Atualizado {updated}
            </p>
          ) : null}
        </div>

        {hasLinks ? (
          <div
            className="flex shrink-0 items-center gap-0.5"
            role="toolbar"
            aria-label="Ações do lead"
          >
            {websiteHref ? (
              <a
                href={websiteHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(leadLinkIconClass, "size-7")}
                aria-label="Abrir site"
                title="Abrir site"
                onPointerDown={stopDrag}
                onClick={stopDrag}
              >
                <IconLink className="size-3.5" aria-hidden />
              </a>
            ) : null}
            {mapsHref ? (
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(leadLinkIconClass, "size-7")}
                aria-label="Abrir no Google Maps"
                title="Abrir no Google Maps"
                onPointerDown={stopDrag}
                onClick={stopDrag}
              >
                <IconMapPin className="size-3.5" aria-hidden />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      {hasMeta ? (
        <ul className="mt-2.5 space-y-1 border-t border-border/60 pt-2.5">
          {lead.phone?.trim() ? (
            <li className="flex items-start gap-1.5 text-xs text-stat-muted">
              <IconPhone className="mt-0.5 size-3 shrink-0 opacity-70" aria-hidden />
              <span className="min-w-0 leading-snug wrap-break-word">
                {lead.phone}
              </span>
            </li>
          ) : null}
          {location ? (
            <li className="flex items-start gap-1.5 text-xs text-stat-muted">
              <IconMapPin className="mt-0.5 size-3 shrink-0 opacity-70" aria-hidden />
              <span className="min-w-0 leading-snug">{location}</span>
            </li>
          ) : null}
          {lead.source ? (
            <li className="text-xs text-stat-muted">
              <span className="text-[10px] tracking-wide text-stat-label uppercase">
                Origem
              </span>{" "}
              {lead.source}
            </li>
          ) : null}
          {scoreN != null ? (
            <li className="flex items-center gap-1.5 text-xs text-stat-muted">
              <IconStar className="size-3 shrink-0 opacity-70" aria-hidden />
              <span>
                {scoreN.toFixed(1)}
                {lead.reviewsCount != null
                  ? ` · ${lead.reviewsCount} aval.`
                  : ""}
              </span>
            </li>
          ) : null}
        </ul>
      ) : null}
    </article>
  )
}
