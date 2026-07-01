import { useQuery } from "@tanstack/react-query"

import { getMe } from "@/features/auth/api/auth-api"
import { isHttpError } from "@/shared/lib/api-errors"
import { tryRefreshTokens } from "@/features/auth/lib/refresh-mutex"
import { clearAuthState } from "@/features/auth/lib/clear-auth-state"
import type { AuthUser } from "@/features/auth/types"
import { authMeQueryKey } from "@/features/auth/queries/auth-query-keys"

export { authMeQueryKey }

export async function fetchAuthMe(): Promise<AuthUser> {
  try {
    return await getMe()
  } catch (firstError) {
    if (!(isHttpError(firstError) && firstError.status === 401)) {
      throw firstError
    }

    const refreshed = await tryRefreshTokens()
    if (!refreshed) {
      clearAuthState()
      throw firstError
    }

    try {
      return await getMe()
    } catch (secondError) {
      clearAuthState()
      throw secondError
    }
  }
}

export function useAuthUser() {
  return useQuery({
    queryKey: authMeQueryKey,
    queryFn: fetchAuthMe,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}
