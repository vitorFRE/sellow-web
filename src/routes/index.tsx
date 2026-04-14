import { createFileRoute, redirect, isRedirect } from "@tanstack/react-router"

import { LoginForm } from "@/features/auth/components/login-form"
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
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-primary),transparent_55%)]/8" />
      <div className="relative mx-auto w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
