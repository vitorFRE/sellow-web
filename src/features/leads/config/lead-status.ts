import type { LeadStatus } from "@/features/leads/types/lead"

export const ALL_LEAD_STATUSES = [
  "IMPORTED",
  "NEW",
  "CONTACTED",
  "QUALIFYING",
  "BRIEFING",
  "PROPOSAL_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
] as const satisfies readonly LeadStatus[]

/** Status exibidos no kanban (importados ficam em Leads). */
export const KANBAN_LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFYING",
  "BRIEFING",
  "PROPOSAL_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
] as const satisfies readonly LeadStatus[]

export type LeadStatusMeta = {
  label: string
  badgeClass: string
  dotClass: string
  inKanban: boolean
}

export const LEAD_STATUS_META: Record<LeadStatus, LeadStatusMeta> = {
  IMPORTED: {
    label: "Importado",
    badgeClass: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300",
    dotClass: "bg-zinc-400 dark:bg-zinc-500",
    inKanban: false,
  },
  NEW: {
    label: "Novo",
    badgeClass: "bg-primary/15 text-primary",
    dotClass: "bg-primary",
    inKanban: true,
  },
  CONTACTED: {
    label: "Contatado",
    badgeClass: "bg-muted text-muted-foreground",
    dotClass: "bg-slate-400 dark:bg-slate-500",
    inKanban: true,
  },
  QUALIFYING: {
    label: "Qualificação",
    badgeClass: "bg-amber-500/15 text-amber-800 dark:text-amber-400",
    dotClass: "bg-amber-500",
    inKanban: true,
  },
  BRIEFING: {
    label: "Briefing",
    badgeClass: "bg-sky-500/15 text-sky-800 dark:text-sky-400",
    dotClass: "bg-sky-500",
    inKanban: true,
  },
  PROPOSAL_SENT: {
    label: "Proposta enviada",
    badgeClass: "bg-violet-500/15 text-violet-800 dark:text-violet-400",
    dotClass: "bg-violet-500",
    inKanban: true,
  },
  NEGOTIATION: {
    label: "Negociação",
    badgeClass: "bg-orange-500/15 text-orange-800 dark:text-orange-400",
    dotClass: "bg-orange-500",
    inKanban: true,
  },
  WON: {
    label: "Ganho",
    badgeClass: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-400",
    dotClass: "bg-primary",
    inKanban: true,
  },
  LOST: {
    label: "Perdido",
    badgeClass: "bg-destructive/10 text-destructive",
    dotClass: "bg-destructive",
    inKanban: true,
  },
}

export function getLeadStatusLabel(status: LeadStatus): string {
  return LEAD_STATUS_META[status].label
}

export function isKanbanLeadStatus(v: string): v is LeadStatus {
  return (KANBAN_LEAD_STATUSES as readonly string[]).includes(v)
}
