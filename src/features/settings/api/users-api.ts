import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import { getApiBaseUrl } from "@/shared/config/api-base"
import { parseApiJson } from "@/shared/api/parse-api-json"
import type {
  ListWorkspaceUsersParams,
  WorkspaceUser,
  WorkspaceUsersListResponse,
} from "@/features/settings/types/workspace-user"

export async function listWorkspaceUsers(
  params: ListWorkspaceUsersParams = {}
): Promise<WorkspaceUsersListResponse> {
  const search = new URLSearchParams()
  if (params.page != null) search.set("page", String(params.page))
  if (params.limit != null) search.set("limit", String(params.limit))
  const qs = search.toString()
  const url = `${getApiBaseUrl()}/users${qs ? `?${qs}` : ""}`
  const res = await authorizedFetch(url)
  return parseApiJson<WorkspaceUsersListResponse>(res)
}

export async function getWorkspaceUser(userId: string): Promise<WorkspaceUser> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/users/${userId}`)
  return parseApiJson<WorkspaceUser>(res)
}
