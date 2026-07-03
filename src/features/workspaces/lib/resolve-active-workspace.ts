import type { UserWorkspace } from "@/features/workspaces/types"
import { DEFAULT_WORKSPACE_ID } from "@/features/workspaces/types"
import { workspaceStorage } from "@/features/workspaces/lib/workspace-storage"

export type ResolveActiveWorkspaceResult =
  | { status: "resolved"; workspaceId: string }
  | { status: "needs_selection" }
  | { status: "no_access" }

export function resolveActiveWorkspace(
  workspaces: UserWorkspace[]
): ResolveActiveWorkspaceResult {
  const storedId = workspaceStorage.get()

  if (storedId) {
    const match = workspaces.find((w) => w.id === storedId)
    if (match) return { status: "resolved", workspaceId: match.id }
  }

  if (workspaces.length === 1) {
    return { status: "resolved", workspaceId: workspaces[0]!.id }
  }

  if (workspaces.length > 1) {
    return { status: "needs_selection" }
  }

  if (storedId === DEFAULT_WORKSPACE_ID) {
    return { status: "resolved", workspaceId: DEFAULT_WORKSPACE_ID }
  }

  return { status: "no_access" }
}

export function applyActiveWorkspace(workspaceId: string): void {
  workspaceStorage.set(workspaceId)
}
