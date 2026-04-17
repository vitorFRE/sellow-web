import { IconFlame } from "@tabler/icons-react"

import type { Lead } from "@/features/leads/types/lead"
import { cn } from "@/lib/utils"
import type { LeadDetailView } from "@/features/lead-detail/types/lead-detail-view"

const tempDot: Record<LeadDetailView["temperatureLabel"], string> = {
  Frio: "bg-sky-500",
  Morno: "bg-amber-500",
  Quente: "bg-rose-500",
}

type Props = {
  lead: Lead
  detail: LeadDetailView
  className?: string
}

export function LeadDetailSummary({ lead, detail, className }: Props) {
  const category = lead.categoryName?.trim() || "Lead"

  return (
    <section className={cn("space-y-3 border-b border-border/80 pb-4", className)}>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {category}
        </p>
        <h2 className="mt-1 font-heading text-lg font-semibold text-foreground">
          {detail.headline}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Etapa: <span className="text-foreground">{detail.pipelineStageLabel}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-muted/40 px-2 py-1 text-xs font-medium text-muted-foreground">
          <span
            className={cn("size-1.5 rounded-full", tempDot[detail.temperatureLabel])}
            aria-hidden
          />
          {detail.temperatureLabel}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-muted/20 px-2 py-1 text-xs text-muted-foreground">
          <IconFlame className="size-3.5 opacity-70" aria-hidden />
          Oportunidade: venda de site (mock)
        </span>
      </div>
    </section>
  )
}
