import { tokenStorage } from "@/features/auth/lib/token-storage"
import { tryRefreshTokens } from "@/features/auth/lib/refresh-mutex"
import { clearAuthState } from "@/features/auth/lib/clear-auth-state"
import { workspaceStorage } from "@/features/workspaces/lib/workspace-storage"

export type AuthorizedFetchOptions = RequestInit & {
  skipWorkspaceHeader?: boolean
  workspaceId?: string
}

export async function authorizedFetch(
  url: string,
  init: AuthorizedFetchOptions = {}
): Promise<Response> {
  const { skipWorkspaceHeader, workspaceId, ...fetchInit } = init
  const accessToken = tokenStorage.getAccess()
  const headers = new Headers(fetchInit.headers ?? {})
  const method = (fetchInit.method ?? "GET").toUpperCase()
  if (method !== "GET" && method !== "HEAD") {
    headers.set("Content-Type", "application/json")
  }
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)

  if (!skipWorkspaceHeader) {
    const activeWorkspaceId = workspaceId ?? workspaceStorage.get()
    if (activeWorkspaceId) {
      headers.set("X-Workspace-Id", activeWorkspaceId)
    }
  }

  let res = await fetch(url, { ...fetchInit, headers })
  if (res.status !== 401) return res

  const refreshed = await tryRefreshTokens()
  if (!refreshed) {
    clearAuthState()
    return res
  }

  const newAccess = tokenStorage.getAccess()
  headers.set("Authorization", `Bearer ${newAccess}`)
  res = await fetch(url, { ...fetchInit, headers })

  if (res.status === 401) {
    clearAuthState()
  }

  return res
}
