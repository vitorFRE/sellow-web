const ACTIVE_WORKSPACE_KEY = "sellow_active_workspace_id"

export const workspaceStorage = {
  get(): string | null {
    return localStorage.getItem(ACTIVE_WORKSPACE_KEY)
  },
  set(workspaceId: string): void {
    localStorage.setItem(ACTIVE_WORKSPACE_KEY, workspaceId)
  },
  clear(): void {
    localStorage.removeItem(ACTIVE_WORKSPACE_KEY)
  },
}
