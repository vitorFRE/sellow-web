import type { QueryClient } from "@tanstack/react-query"

import { tokenStorage } from "@/features/auth/lib/token-storage"
import { authMeQueryKey } from "@/features/auth/queries/auth-query-keys"
import { workspaceStorage } from "@/features/workspaces/lib/workspace-storage"

export function clearAuthState(queryClient?: QueryClient): void {
  tokenStorage.clearTokens()
  workspaceStorage.clear()
  if (queryClient) {
    queryClient.removeQueries({ queryKey: authMeQueryKey })
  }
}
