import type { LeadStatus } from "@/features/leads/types/lead"

export type LeadSortBy = "updatedAt" | "totalScore" | "reviewsCount"

export type LeadSortDir = "asc" | "desc"

export type LeadImportReviewFilter =
  | "all"
  | "POSITIVE"
  | "NEGATIVE"
  | "UNEVALUATED"

/** Estado de UI compartilhado entre pipeline e lista de leads. */
export type LeadListFilterState = {
  search: string
  /** Só usado na página de lista completa; pipeline ignora. */
  status: LeadStatus | null
  minTotalScore: string
  minReviewsCount: string
  hasWebsite: "all" | "yes" | "no"
  /** Triagem like/dislike na importação (só na lista de importados). */
  importReview: LeadImportReviewFilter
  sortBy: LeadSortBy
  sortDir: LeadSortDir
}

export const DEFAULT_LEAD_LIST_FILTER_STATE: LeadListFilterState = {
  search: "",
  status: null,
  minTotalScore: "",
  minReviewsCount: "",
  hasWebsite: "all",
  importReview: "all",
  sortBy: "updatedAt",
  sortDir: "desc",
}
