import type { GlobalRole } from "@/features/auth/types"
import type { WorkspaceRole } from "@/features/workspaces/types"

export function isSuperAdmin(globalRole: string): globalRole is GlobalRole {
  return globalRole === "SUPER_ADMIN"
}

export function isWorkspaceMember(
  role: WorkspaceRole | undefined
): role is WorkspaceRole {
  return role === "OWNER" || role === "ADMIN" || role === "MEMBER"
}

/** Create, import, mover status, triagem, notes e follow-up. */
export function canWriteLeads(role: WorkspaceRole | undefined): boolean {
  return isWorkspaceMember(role)
}

/** DELETE /leads/delete/:id */
export function canDeleteLeads(role: WorkspaceRole | undefined): boolean {
  return role === "OWNER" || role === "ADMIN"
}

/** CRUD de motivos de perda. */
export function canWriteLossReasons(role: WorkspaceRole | undefined): boolean {
  return role === "OWNER" || role === "ADMIN"
}

export function canManageMembers(role: WorkspaceRole | undefined): boolean {
  return role === "OWNER" || role === "ADMIN"
}

export function canRemoveMember(role: WorkspaceRole | undefined): boolean {
  return role === "OWNER"
}

export function canPromoteToOwner(role: WorkspaceRole | undefined): boolean {
  return role === "OWNER"
}
