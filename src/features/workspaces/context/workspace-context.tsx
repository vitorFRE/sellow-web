import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"

import { useAuthUser } from "@/features/auth/queries/auth-me-query"
import { isBusinessQuery } from "@/features/workspaces/lib/business-query-key"
import { workspaceStorage } from "@/features/workspaces/lib/workspace-storage"
import type { UserWorkspace, WorkspaceRole } from "@/features/workspaces/types"

export type ActiveWorkspaceState = {
  workspaceId: string | null
  workspace: UserWorkspace | null
  role: WorkspaceRole | undefined
  workspaces: UserWorkspace[]
  isLoading: boolean
  setWorkspace: (workspaceId: string) => void
}

const WorkspaceContext = React.createContext<ActiveWorkspaceState | null>(null)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const { data: authUser, isLoading } = useAuthUser()
  const workspaces = authUser?.workspaces ?? []

  const [workspaceId, setWorkspaceIdState] = React.useState<string | null>(() =>
    workspaceStorage.get()
  )
  const skipWorkspaceInvalidation = React.useRef(true)

  React.useEffect(() => {
    const stored = workspaceStorage.get()
    if (stored && stored !== workspaceId) {
      setWorkspaceIdState(stored)
    }
  }, [authUser, workspaceId])

  React.useEffect(() => {
    if (!workspaceId) return
    if (skipWorkspaceInvalidation.current) {
      skipWorkspaceInvalidation.current = false
      return
    }

    void queryClient.invalidateQueries({
      predicate: (query) =>
        isBusinessQuery(query.queryKey) &&
        query.queryKey[1] === workspaceId,
    })
  }, [workspaceId, queryClient])

  const workspace = React.useMemo(
    () => workspaces.find((item) => item.id === workspaceId) ?? null,
    [workspaces, workspaceId]
  )

  const setWorkspace = React.useCallback(
    (nextWorkspaceId: string) => {
      if (nextWorkspaceId === workspaceId) return
      workspaceStorage.set(nextWorkspaceId)
      setWorkspaceIdState(nextWorkspaceId)
    },
    [workspaceId]
  )

  const value = React.useMemo(
    () => ({
      workspaceId,
      workspace,
      role: workspace?.role,
      workspaces,
      isLoading,
      setWorkspace,
    }),
    [workspaceId, workspace, workspaces, isLoading, setWorkspace]
  )

  return (
    <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
  )
}

export function useActiveWorkspace(): ActiveWorkspaceState {
  const context = React.useContext(WorkspaceContext)
  if (!context) {
    throw new Error("useActiveWorkspace must be used within WorkspaceProvider")
  }
  return context
}
