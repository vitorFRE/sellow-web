import type { FeedbackStatus, FeedbackType } from "@/features/feedback/types/feedback"

export type FeedbackAdminFilterState = {
  status: FeedbackStatus | "all"
  type: FeedbackType | "all"
  workspaceId: string | "all"
  search: string
  createdFrom: string
  createdTo: string
}

export const defaultFeedbackAdminFilters = (): FeedbackAdminFilterState => ({
  status: "all",
  type: "all",
  workspaceId: "all",
  search: "",
  createdFrom: "",
  createdTo: "",
})

export function hasActiveFeedbackAdminFilters(
  filters: FeedbackAdminFilterState
): boolean {
  return (
    filters.status !== "all" ||
    filters.type !== "all" ||
    filters.workspaceId !== "all" ||
    filters.search.trim().length > 0 ||
    filters.createdFrom.length > 0 ||
    filters.createdTo.length > 0
  )
}

export function countAdvancedFeedbackAdminFilters(
  filters: FeedbackAdminFilterState
): number {
  let count = 0
  if (filters.status !== "all") count += 1
  if (filters.type !== "all") count += 1
  if (filters.workspaceId !== "all") count += 1
  if (filters.createdFrom.length > 0) count += 1
  if (filters.createdTo.length > 0) count += 1
  return count
}

export function toAdminFeedbackQueryParams(
  filters: FeedbackAdminFilterState,
  page: number,
  limit = 10
) {
  return {
    page,
    limit,
    status: filters.status === "all" ? undefined : filters.status,
    type: filters.type === "all" ? undefined : filters.type,
    workspaceId:
      filters.workspaceId === "all" ? undefined : filters.workspaceId,
    search: filters.search.trim() || undefined,
    createdFrom: filters.createdFrom || undefined,
    createdTo: filters.createdTo || undefined,
  }
}
