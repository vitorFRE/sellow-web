import type { ListFeedbackParams } from "@/features/feedback/api/feedback-api"

export const myFeedbackQueryKey = (page = 1) =>
  ["feedback", "mine", page] as const

export const adminFeedbackQueryKey = (params: ListFeedbackParams) =>
  [
    "feedback",
    "admin",
    params.page ?? 1,
    params.status ?? "",
    params.type ?? "",
    params.workspaceId ?? "",
    params.search ?? "",
    params.createdFrom ?? "",
    params.createdTo ?? "",
  ] as const
