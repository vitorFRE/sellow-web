import { getApiBaseUrl } from "@/shared/config/api-base"
import type {
  AuthUser,
  LoginResponse,
  RefreshResponse,
} from "@/features/auth/types"
import { tokenStorage } from "@/features/auth/lib/token-storage"

export class HttpError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "HttpError"
    this.status = status
  }
}

async function parseResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Erro ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch {
      // ignora parse errors
    }
    throw new HttpError(res.status, message)
  }
  return res.json() as Promise<T>
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${getApiBaseUrl()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  return parseResponse<LoginResponse>(res)
}

export async function refreshTokens(): Promise<RefreshResponse> {
  const refreshToken = tokenStorage.getRefresh()
  const res = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
  return parseResponse<RefreshResponse>(res)
}

export async function getMe(): Promise<AuthUser> {
  const accessToken = tokenStorage.getAccess()
  const res = await fetch(`${getApiBaseUrl()}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return parseResponse<AuthUser>(res)
}

export async function logout(): Promise<void> {
  const accessToken = tokenStorage.getAccess()
  await fetch(`${getApiBaseUrl()}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
