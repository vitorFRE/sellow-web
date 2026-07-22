import {
  IconArrowUpRight,
  IconMapPin,
  IconPhone,
  IconStar,
  IconTrash,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { LeadCardExternalLinks } from "@/features/leads/components/lead-card-external-links"
import { formatLeadLocation } from "@/features/leads/lib/format-lead-meta"
import type { Lead } from "@/features/leads/types/lead"
import { cn } from "@/lib/utils"

type Props = {
  lead: Lead
  canWriteLeads?: boolean
  canDeleteLeads?: boolean
  promotingLeadId?: string | null
  deletingLeadId?: string | null
  onPromoteToPipeline?: (id: string) => void
  onDeleteLead?: (id: string) => void
  className?: string
}

export function LeadMapPopup({
  lead,
  canWriteLeads = true,
  canDeleteLeads = true,
  promotingLeadId,
  deletingLeadId,
  onPromoteToPipeline,
  onDeleteLead,
  className,
}: Props) {
  const location = formatLeadLocation(lead)
  const category = lead.categoryName?.trim() || null
  const isPromoting = promotingLeadId === lead.id
  const isDeleting = deletingLeadId === lead.id
  const score =
    lead.totalScore != null && Number.isFinite(Number(lead.totalScore))
      ? Number(lead.totalScore)
      : null

  return (
    <div className={cn("min-w-56 max-w-64 space-y-2.5 pr-1", className)}>
      <div className="space-y-1">
        {category ? (
          <p className="text-[10px] font-medium tracking-[0.08em] text-stat-muted uppercase">
            {category}
          </p>
        ) : null}
        <p className="pr-4 text-sm font-semibold leading-snug text-stat-value">
          {lead.name}
        </p>
        {score != null ? (
          <p className="flex items-center gap-1.5 text-xs text-stat-muted">
            <IconStar className="size-3.5 shrink-0" aria-hidden />
            {score.toFixed(1)}
            {lead.reviewsCount != null ? ` · ${lead.reviewsCount} aval.` : null}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5 text-xs text-stat-muted">
        {location ? (
          <p className="flex items-start gap-1.5">
            <IconMapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            <span className="leading-snug">{location}</span>
          </p>
        ) : null}
        {lead.phone?.trim() ? (
          <p className="flex items-center gap-1.5">
            <IconPhone className="size-3.5 shrink-0" aria-hidden />
            <span className="font-mono tabular-nums">{lead.phone}</span>
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border pt-2.5">
        <LeadCardExternalLinks lead={lead} />
        <div className="flex items-center gap-1">
          {canDeleteLeads && onDeleteLead ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={isDeleting}
              aria-label="Excluir lead"
              onClick={() => onDeleteLead(lead.id)}
            >
              <IconTrash className="size-3.5" aria-hidden />
            </Button>
          ) : null}
          {canWriteLeads && onPromoteToPipeline ? (
            <Button
              type="button"
              size="sm"
              className="gap-1.5"
              disabled={isPromoting}
              onClick={() => onPromoteToPipeline(lead.id)}
            >
              <IconArrowUpRight className="size-3.5" aria-hidden />
              {isPromoting ? "…" : "Pipeline"}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
