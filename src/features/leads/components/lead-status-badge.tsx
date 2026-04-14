import { cn } from "@/lib/utils"
import type { LeadStatus } from "@/features/leads/types/lead"

const STYLES: Record<LeadStatus, string> = {
  NEW: "bg-primary/15 text-primary",
  CONTACTED: "bg-muted text-muted-foreground",
  QUALIFYING: "bg-amber-500/15 text-amber-800 dark:text-amber-400",
  BRIEFING: "bg-sky-500/15 text-sky-800 dark:text-sky-400",
  PROPOSAL_SENT: "bg-violet-500/15 text-violet-800 dark:text-violet-400",
  NEGOTIATION: "bg-orange-500/15 text-orange-800 dark:text-orange-400",
  WON: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-400",
  LOST: "bg-destructive/10 text-destructive",
}

const LABELS: Record<LeadStatus, string> = {
  NEW: "Novo",
  CONTACTED: "Contatado",
  QUALIFYING: "Qualificação",
  BRIEFING: "Briefing",
  PROPOSAL_SENT: "Proposta enviada",
  NEGOTIATION: "Negociação",
  WON: "Ganho",
  LOST: "Perdido",
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full rounded-full px-2.5 py-0.5 text-xs font-medium",
        STYLES[status]
      )}
    >
      {LABELS[status]}
    </span>
  )
}
