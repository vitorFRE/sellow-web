import { createFileRoute, redirect, isRedirect } from "@tanstack/react-router"

import { LoginPage } from "@/features/auth/components/login-page"
import {
  authMeQueryKey,
  fetchAuthMe,
} from "@/features/auth/queries/auth-me-query"
import { tokenStorage } from "@/features/auth/lib/token-storage"

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    if (!tokenStorage.getAccess()) return
    try {
      await context.queryClient.ensureQueryData({
        queryKey: authMeQueryKey,
        queryFn: fetchAuthMe,
      })
      throw redirect({ to: "/dashboard" })
    } catch (err) {
      if (isRedirect(err)) throw err
    }
  },
  component: LoginRoute,
})

function LoginRoute() {
  return <LoginPage />
}
