export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER"

export type UserWorkspace = {
  id: string
  name: string
  role: WorkspaceRole
}

export type Workspace = {
  id: string
  name: string
  role: WorkspaceRole
  createdAt: string
  updatedAt: string
  memberCount?: number
}

export type WorkspaceMemberUser = {
  id: string
  email: string
  name: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export type WorkspaceMember = {
  userId: string
  role: WorkspaceRole
  user: WorkspaceMemberUser
}

export type AddWorkspaceMemberInput = {
  email: string
  password?: string
  name?: string
  role?: WorkspaceRole
}

export type AddWorkspaceMemberResponse = {
  linked: boolean
  member: WorkspaceMember
}

export type CreateWorkspaceInput = {
  name: string
  ownerUserId?: string
}

export const DEFAULT_WORKSPACE_ID = "00000000-0000-4000-8000-000000000001"
