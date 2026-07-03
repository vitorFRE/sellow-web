import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import { getApiBaseUrl } from "@/shared/config/api-base"
import { parseApiJson } from "@/shared/api/parse-api-json"
import type {
  AddWorkspaceMemberInput,
  AddWorkspaceMemberResponse,
  CreateWorkspaceInput,
  Workspace,
  WorkspaceMember,
  WorkspaceRole,
} from "@/features/workspaces/types"

export async function listWorkspaces(): Promise<Workspace[]> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/workspaces`, {
    skipWorkspaceHeader: true,
  })
  return parseApiJson<Workspace[]>(res)
}

export async function createWorkspace(
  input: CreateWorkspaceInput
): Promise<Workspace> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/workspaces`, {
    method: "POST",
    skipWorkspaceHeader: true,
    body: JSON.stringify(input),
  })
  return parseApiJson<Workspace>(res)
}

export async function listWorkspaceMembers(
  workspaceId: string
): Promise<WorkspaceMember[]> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/workspaces/${workspaceId}/members`,
    { workspaceId }
  )
  return parseApiJson<WorkspaceMember[]>(res)
}

export async function addWorkspaceMember(
  workspaceId: string,
  input: AddWorkspaceMemberInput
): Promise<AddWorkspaceMemberResponse> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/workspaces/${workspaceId}/members`,
    {
      method: "POST",
      workspaceId,
      body: JSON.stringify(input),
    }
  )
  return parseApiJson<AddWorkspaceMemberResponse>(res)
}

export async function updateWorkspaceMemberRole(
  workspaceId: string,
  userId: string,
  role: WorkspaceRole
): Promise<WorkspaceMember> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/workspaces/${workspaceId}/members/${userId}`,
    {
      method: "PATCH",
      workspaceId,
      body: JSON.stringify({ role }),
    }
  )
  return parseApiJson<WorkspaceMember>(res)
}

export async function removeWorkspaceMember(
  workspaceId: string,
  userId: string
): Promise<void> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/workspaces/${workspaceId}/members/${userId}`,
    {
      method: "DELETE",
      workspaceId,
    }
  )
  if (!res.ok) {
    await parseApiJson(res)
  }
}
