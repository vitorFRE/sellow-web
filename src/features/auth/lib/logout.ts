import type { QueryClient } from "@tanstack/react-query"

import { logout as logoutApi } from "@/features/auth/api/auth-api"
import { clearAuthState } from "@/features/auth/lib/clear-auth-state"

export async function performLogout(
  queryClient: QueryClient,
  navigate: () => void
): Promise<void> {
  try {
    await logoutApi()
  } catch {
    // backend já pode ter invalidado a sessão; prosseguir com limpeza local
  }
  clearAuthState(queryClient)
  navigate()
}
