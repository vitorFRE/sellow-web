import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import { getApiBaseUrl } from "@/shared/config/api-base"
import { parseApiJson } from "@/shared/api/parse-api-json"
import type {
  Feedback,
  FeedbackListResponse,
  FeedbackStatus,
  FeedbackType,
} from "@/features/feedback/types/feedback"

export type CreateFeedbackBody = {
  type: FeedbackType
  message: string
}

export async function createFeedback(
  body: CreateFeedbackBody
): Promise<Feedback> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/feedback/create`, {
    method: "POST",
    body: JSON.stringify(body),
  })
  return parseApiJson<Feedback>(res)
}

export type ListFeedbackParams = {
  page?: number
  limit?: number
  status?: FeedbackStatus
  type?: FeedbackType
  workspaceId?: string
  search?: string
  createdFrom?: string
  createdTo?: string
}

function buildFeedbackQuery(params?: ListFeedbackParams): string {
  const search = new URLSearchParams()
  if (params?.page) search.set("page", String(params.page))
  if (params?.limit) search.set("limit", String(params.limit))
  if (params?.status) search.set("status", params.status)
  if (params?.type) search.set("type", params.type)
  if (params?.workspaceId) search.set("workspaceId", params.workspaceId)
  if (params?.search) search.set("search", params.search)
  if (params?.createdFrom) search.set("createdFrom", params.createdFrom)
  if (params?.createdTo) search.set("createdTo", params.createdTo)
  const qs = search.toString()
  return qs ? `?${qs}` : ""
}

export async function listMyFeedback(
  params?: ListFeedbackParams
): Promise<FeedbackListResponse> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/feedback/mine${buildFeedbackQuery(params)}`,
    { skipWorkspaceHeader: true }
  )
  return parseApiJson<FeedbackListResponse>(res)
}

export async function listAllFeedback(
  params?: ListFeedbackParams
): Promise<FeedbackListResponse> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/feedback${buildFeedbackQuery(params)}`,
    { skipWorkspaceHeader: true }
  )
  return parseApiJson<FeedbackListResponse>(res)
}

export type PatchFeedbackBody = {
  status?: FeedbackStatus
  adminNote?: string | null
}

export async function patchFeedback(
  id: string,
  body: PatchFeedbackBody
): Promise<Feedback> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/feedback/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    skipWorkspaceHeader: true,
  })
  return parseApiJson<Feedback>(res)
}
