import type { WorkspaceRole } from "@/features/workspaces/types"

export type WorkspaceUser = {
  id: string
  email: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  workspaceRole: WorkspaceRole
}

export type WorkspaceUsersListResponse = {
  data: WorkspaceUser[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export type ListWorkspaceUsersParams = {
  page?: number
  limit?: number
}
