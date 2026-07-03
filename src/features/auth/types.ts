import type { UserWorkspace } from "@/features/workspaces/types"

export type GlobalRole = "USER" | "SUPER_ADMIN"

export type AuthUser = {
  id: string
  email: string
  name: string
  role: GlobalRole
  isActive: boolean
  createdAt?: string
  updatedAt?: string
  workspaces: UserWorkspace[]
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  user: AuthUser
}

export type RefreshResponse = {
  accessToken: string
  refreshToken: string
}
