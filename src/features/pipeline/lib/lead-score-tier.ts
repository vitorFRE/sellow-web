export type LeadScoreTier = "high" | "medium" | "low"

const TIER_MIN: Record<LeadScoreTier, number> = {
  high: 4.2,
  medium: 3,
  low: 0,
}

export function leadScoreTier(
  score: number | null | undefined
): LeadScoreTier | null {
  if (score == null || !Number.isFinite(Number(score))) return null
  const n = Number(score)
  if (n >= TIER_MIN.high) return "high"
  if (n >= TIER_MIN.medium) return "medium"
  return "low"
}

export const LEAD_SCORE_TIER_LABEL: Record<LeadScoreTier, string> = {
  high: "Alta",
  medium: "Média",
  low: "Baixa",
}

export const LEAD_SCORE_TIER_DOT: Record<LeadScoreTier, string> = {
  high: "bg-destructive",
  medium: "bg-amber-500",
  low: "bg-muted-foreground/50",
}

/** Barra 0–100% assumindo nota ~0–5 (ex.: Google). */
export function leadScoreProgressPercent(
  score: number | null | undefined
): number | null {
  if (score == null || !Number.isFinite(Number(score))) return null
  return Math.min(100, Math.max(0, Math.round((Number(score) / 5) * 100)))
}
