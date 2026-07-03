export type ImportReview = "POSITIVE" | "NEGATIVE"

export type LeadStatus =
  | "IMPORTED"
  | "NEW"
  | "CONTACTED"
  | "QUALIFYING"
  | "BRIEFING"
  | "PROPOSAL_SENT"
  | "NEGOTIATION"
  | "WON"
  | "LOST"

/** Resposta do Prisma / API (GET /leads) */
export type Lead = {
  id: string
  name: string
  email: string | null
  phone: string | null
  budget: string | number | null
  status: LeadStatus
  lossReasonId?: string | null
  lossReason?: string | null
  lossReasonNote?: string | null
  source: string | null
  totalScore?: number | null
  reviewsCount?: number | null
  city?: string | null
  state?: string | null
  url?: string | null
  website?: string | null
  categoryName?: string | null
  googlePlaceId?: string | null
  importReview?: ImportReview | null
  createdAt: string
  updatedAt: string
}

export type LeadsListMeta = {
  total: number
  page: number
  limit: number
  totalPages: number
}

export type LeadsListResponse = {
  data: Lead[]
  meta: LeadsListMeta
}
