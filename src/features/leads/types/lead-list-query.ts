import type { LeadStatus } from "@/features/leads/types/lead"

export type LeadSortBy = "updatedAt" | "totalScore" | "reviewsCount"

export type LeadSortDir = "asc" | "desc"

/** Estado de UI compartilhado entre pipeline e lista de leads. */
export type LeadListFilterState = {
  search: string
  /** Só usado na página de lista completa; pipeline ignora. */
  status: LeadStatus | null
  minTotalScore: string
  minReviewsCount: string
  hasWebsite: "all" | "yes" | "no"
  sortBy: LeadSortBy
  sortDir: LeadSortDir
}

export const DEFAULT_LEAD_LIST_FILTER_STATE: LeadListFilterState = {
  search: "",
  status: null,
  minTotalScore: "",
  minReviewsCount: "",
  hasWebsite: "all",
  sortBy: "updatedAt",
  sortDir: "desc",
}
