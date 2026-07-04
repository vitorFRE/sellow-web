import type { FeedbackStatus, FeedbackType } from "@/features/feedback/types/feedback"

export const FEEDBACK_TYPE_LABELS: Record<FeedbackType, string> = {
  BUG: "Bug",
  SUGGESTION: "Sugestão",
  OTHER: "Outro",
}

export const FEEDBACK_STATUS_LABELS: Record<FeedbackStatus, string> = {
  OPEN: "Aberto",
  IN_REVIEW: "Em análise",
  RESOLVED: "Resolvido",
  CLOSED: "Fechado",
}

export const FEEDBACK_TYPES: FeedbackType[] = ["BUG", "SUGGESTION", "OTHER"]

export const FEEDBACK_STATUSES: FeedbackStatus[] = [
  "OPEN",
  "IN_REVIEW",
  "RESOLVED",
  "CLOSED",
]
