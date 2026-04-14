export type AuthUser = {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
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
