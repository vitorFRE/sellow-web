import type { LeadStatus } from "@/features/leads/types/lead"

/** Ordem das colunas do Kanban (espelha o fluxo comercial). */
export const PIPELINE_STATUSES: readonly LeadStatus[] = [
  "IMPORTED",
  "NEW",
  "CONTACTED",
  "QUALIFYING",
  "BRIEFING",
  "PROPOSAL_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
] as const

export const PIPELINE_COLUMN_LABELS: Record<LeadStatus, string> = {
  IMPORTED: "Importado",
  NEW: "Novo",
  CONTACTED: "Contatado",
  QUALIFYING: "Qualificação",
  BRIEFING: "Briefing",
  PROPOSAL_SENT: "Proposta enviada",
  NEGOTIATION: "Negociação",
  WON: "Ganho",
  LOST: "Perdido",
}

export const PIPELINE_PAGE_SIZE = 100

/** Cor do indicador na coluna (bolinha). */
export const PIPELINE_STATUS_DOT: Record<LeadStatus, string> = {
  IMPORTED: "bg-zinc-400 dark:bg-zinc-500",
  NEW: "bg-primary",
  CONTACTED: "bg-slate-400 dark:bg-slate-500",
  QUALIFYING: "bg-amber-500",
  BRIEFING: "bg-sky-500",
  PROPOSAL_SENT: "bg-violet-500",
  NEGOTIATION: "bg-orange-500",
  WON: "bg-emerald-500",
  LOST: "bg-destructive",
}

export function isPipelineColumnStatus(v: string): v is LeadStatus {
  return (PIPELINE_STATUSES as readonly string[]).includes(v)
}
