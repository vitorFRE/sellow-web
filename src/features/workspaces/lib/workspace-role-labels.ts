import type { WorkspaceRole } from "@/features/workspaces/types"

const workspaceRoleLabels: Record<WorkspaceRole, string> = {
  OWNER: "Proprietário",
  ADMIN: "Administrador",
  MEMBER: "Membro",
}

export function getWorkspaceRoleLabel(role: WorkspaceRole): string {
  return workspaceRoleLabels[role]
}
