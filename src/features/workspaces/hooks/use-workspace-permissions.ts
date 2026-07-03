import { useQueryClient } from "@tanstack/react-query"

import {
  canDeleteLeads,
  canManageMembers,
  canWriteLeads,
  canWriteLossReasons,
  isSuperAdmin,
} from "@/features/workspaces/lib/workspace-permissions"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"
import { useAuthUser } from "@/features/auth/queries/auth-me-query"

export function useWorkspacePermissions() {
  const { data: authUser } = useAuthUser()
  const { role } = useActiveWorkspace()

  return {
    role,
    globalRole: authUser?.role,
    canWriteLeads: canWriteLeads(role),
    canDeleteLeads: canDeleteLeads(role),
    canWriteLossReasons: canWriteLossReasons(role),
    canManageMembers: canManageMembers(role),
    isSuperAdmin: authUser ? isSuperAdmin(authUser.role) : false,
  }
}

export function useInvalidateBusinessQueries() {
  const queryClient = useQueryClient()
  const { setWorkspace, workspaceId } = useActiveWorkspace()

  return {
    workspaceId,
    setWorkspace,
    queryClient,
  }
}
