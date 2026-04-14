import type { QueryClient } from "@tanstack/react-query"

import { tokenStorage } from "@/features/auth/lib/token-storage"
import { authMeQueryKey } from "@/features/auth/queries/auth-query-keys"

export function clearAuthState(queryClient?: QueryClient): void {
  tokenStorage.clearTokens()
  if (queryClient) {
    queryClient.removeQueries({ queryKey: authMeQueryKey })
  }
}
