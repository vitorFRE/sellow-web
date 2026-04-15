import {
  IconAlertTriangle,
  IconCalendarEvent,
  IconCategory,
  IconCurrencyDollar,
  IconMail,
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
import { PipelineCardIconRow } from "@/features/pipeline/components/pipeline-card-icon-row"
import { PipelineCardLeadActions } from "@/features/pipeline/components/pipeline-card-lead-actions"
import {
  formatLeadBudget,
  formatLeadLocation,
  formatLeadUpdatedAt,
} from "@/features/pipeline/lib/format-lead-card-meta"
import {
  LEAD_SCORE_TIER_DOT,
  LEAD_SCORE_TIER_LABEL,
  leadScoreProgressPercent,
  leadScoreTier,
} from "@/features/pipeline/lib/lead-score-tier"

export function PipelineLeadCardContent({
  lead,
  className,
}: {
  lead: Lead
  className?: string
}) {
  const location = formatLeadLocation(lead)
  const budget = formatLeadBudget(lead.budget)
  const updated = formatLeadUpdatedAt(lead.updatedAt)
  const scoreN =
    lead.totalScore != null && Number.isFinite(Number(lead.totalScore))
      ? Number(lead.totalScore)
      : null
  const tier = leadScoreTier(scoreN)
  const progress = leadScoreProgressPercent(scoreN)
  const category = lead.categoryName?.trim() || "Lead"
  const lossReason = lead.lossReason?.trim() || null

  return (
    <article
      className={cn(
        "rounded-xl border border-border/80 bg-card p-3 text-left shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex max-w-[58%] items-center rounded-md border border-border/80 bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {category}
        </span>
        <div className="flex shrink-0 items-center gap-1.5">
          {tier ? (
            <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <span
                className={cn("size-1.5 rounded-full", LEAD_SCORE_TIER_DOT[tier])}
                aria-hidden
              />
              {LEAD_SCORE_TIER_LABEL[tier]}
            </span>
          ) : (
            <span className="text-[11px] text-muted-foreground/70">—</span>
          )}
          {lossReason ? (
            <Tooltip>
              <TooltipTrigger
                aria-label={`Motivo de perda: ${lossReason}`}
                className="inline-flex items-center text-amber-500"
              >
                <IconAlertTriangle className="size-3.5" aria-hidden />
              </TooltipTrigger>
              <TooltipContent>Motivo: {lossReason}</TooltipContent>
            </Tooltip>
          ) : null}
        </div>
      </div>

      <p className="mt-2.5 line-clamp-2 font-semibold text-sm leading-snug text-foreground">
        {lead.name}
      </p>

      {updated ? (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconCalendarEvent className="size-3.5 shrink-0 opacity-70" aria-hidden />
          <span>Atualizado {updated}</span>
        </div>
      ) : null}

      {progress != null ? (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <IconStar className="size-3 opacity-70" aria-hidden />
              Engajamento
            </span>
            <span className="tabular-nums">{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className="mt-3 space-y-2 border-t border-border/60 pt-3">
        <PipelineCardIconRow icon={IconMail}>{lead.email}</PipelineCardIconRow>
        <PipelineCardIconRow icon={IconPhone}>{lead.phone}</PipelineCardIconRow>
        <PipelineCardIconRow icon={IconMapPin}>{location}</PipelineCardIconRow>
        <PipelineCardIconRow icon={IconCurrencyDollar}>
          {budget}
        </PipelineCardIconRow>
        <PipelineCardIconRow icon={IconCategory}>
          {lead.source ? `Origem: ${lead.source}` : null}
        </PipelineCardIconRow>
        {scoreN != null ? (
          <PipelineCardIconRow icon={IconStar}>
            {`${scoreN.toFixed(1)}${lead.reviewsCount != null ? ` · ${lead.reviewsCount} aval.` : ""}`}
          </PipelineCardIconRow>
        ) : null}
      </div>

      <PipelineCardLeadActions lead={lead} />
    </article>
  )
}
