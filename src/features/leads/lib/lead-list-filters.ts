import type { ListLeadsParams } from "@/features/leads/api/leads-api"
import type { LeadListFilterState } from "@/features/leads/types/lead-list-query"
import { DEFAULT_LEAD_LIST_FILTER_STATE } from "@/features/leads/types/lead-list-query"

type ToParamsOptions = {
  /** Incluir `status` do estado (página de leads com filtro por etapa). */
  includeStatus: boolean
}

export function leadListFiltersToParams(
  f: LeadListFilterState,
  options: ToParamsOptions
):   Pick<
  ListLeadsParams,
  | "search"
  | "status"
  | "minTotalScore"
  | "minReviewsCount"
  | "hasWebsite"
  | "importReview"
  | "sortBy"
  | "sortDir"
> {
  const params: Pick<
    ListLeadsParams,
    | "search"
    | "status"
    | "minTotalScore"
    | "minReviewsCount"
    | "hasWebsite"
    | "importReview"
    | "sortBy"
    | "sortDir"
  > = {
    sortBy: f.sortBy,
    sortDir: f.sortDir,
  }

  const s = f.search.trim()
  if (s) params.search = s.slice(0, 200)

  if (options.includeStatus && f.status != null) {
    params.status = f.status
  }

  const minS = f.minTotalScore.trim()
  if (minS !== "") {
    const n = Number(minS)
    if (!Number.isNaN(n) && n >= 0) params.minTotalScore = n
  }

  const minR = f.minReviewsCount.trim()
  if (minR !== "") {
    const n = parseInt(minR, 10)
    if (!Number.isNaN(n) && n >= 0) params.minReviewsCount = n
  }

  if (f.hasWebsite === "yes") params.hasWebsite = true
  if (f.hasWebsite === "no") params.hasWebsite = false

  if (f.importReview !== "all") params.importReview = f.importReview

  return params
}

/** Payload estável para query keys do pipeline (sem status/página). */
export function pipelineFiltersQueryPayload(
  f: LeadListFilterState
): Record<string, string | number | boolean | undefined> {
  const p = leadListFiltersToParams(f, { includeStatus: false })
  return {
    search: p.search,
    minTotalScore: p.minTotalScore,
    minReviewsCount: p.minReviewsCount,
    hasWebsite: p.hasWebsite,
    importReview: p.importReview,
    sortBy: p.sortBy,
    sortDir: p.sortDir,
  }
}

export function countActiveLeadListFilters(
  f: LeadListFilterState,
  options: { includeStatus: boolean }
): number {
  const defaults = DEFAULT_LEAD_LIST_FILTER_STATE
  let n = 0
  if (f.search.trim() !== "") n += 1
  if (options.includeStatus && f.status != null) n += 1
  if (f.minTotalScore.trim() !== "") n += 1
  if (f.minReviewsCount.trim() !== "") n += 1
  if (f.hasWebsite !== "all") n += 1
  if (f.importReview !== "all") n += 1
  if (f.sortBy !== defaults.sortBy) n += 1
  if (f.sortDir !== defaults.sortDir) n += 1
  return n
}

export type LeadListAdvancedFilterState = Pick<
  LeadListFilterState,
  | "minTotalScore"
  | "minReviewsCount"
  | "hasWebsite"
  | "importReview"
  | "sortBy"
  | "sortDir"
>

export function pickAdvancedLeadListFilters(
  f: LeadListFilterState
): LeadListAdvancedFilterState {
  return {
    minTotalScore: f.minTotalScore,
    minReviewsCount: f.minReviewsCount,
    hasWebsite: f.hasWebsite,
    importReview: f.importReview,
    sortBy: f.sortBy,
    sortDir: f.sortDir,
  }
}

export function defaultAdvancedLeadListFilters(): LeadListAdvancedFilterState {
  return pickAdvancedLeadListFilters(DEFAULT_LEAD_LIST_FILTER_STATE)
}

export function mergeAdvancedLeadListFilters(
  f: LeadListFilterState,
  advanced: LeadListAdvancedFilterState
): LeadListFilterState {
  return { ...f, ...advanced }
}

export function countAdvancedLeadListFilters(f: LeadListFilterState): number {
  return countActiveLeadListFilters(f, { includeStatus: false }) -
    (f.search.trim() !== "" ? 1 : 0)
}

export function advancedLeadListFiltersEqual(
  a: LeadListAdvancedFilterState,
  b: LeadListAdvancedFilterState
): boolean {
  return (
    a.minTotalScore === b.minTotalScore &&
    a.minReviewsCount === b.minReviewsCount &&
    a.hasWebsite === b.hasWebsite &&
    a.importReview === b.importReview &&
    a.sortBy === b.sortBy &&
    a.sortDir === b.sortDir
  )
}
