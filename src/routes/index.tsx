import { createFileRoute, redirect, isRedirect } from "@tanstack/react-router"

import { LoginPage } from "@/features/auth/components/login-page"
import {
  authMeQueryKey,
  fetchAuthMe,
} from "@/features/auth/queries/auth-me-query"
import { tokenStorage } from "@/features/auth/lib/token-storage"
import {
  applyActiveWorkspace,
  resolveActiveWorkspace,
} from "@/features/workspaces/lib/resolve-active-workspace"

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    if (!tokenStorage.getAccess()) return
    try {
      const me = await context.queryClient.ensureQueryData({
        queryKey: authMeQueryKey,
        queryFn: fetchAuthMe,
      })
      const resolution = resolveActiveWorkspace(me.workspaces ?? [])
      if (resolution.status === "needs_selection") {
        throw redirect({ to: "/dashboard/selecionar-workspace" })
      }
      if (resolution.status === "resolved") {
        applyActiveWorkspace(resolution.workspaceId)
        throw redirect({ to: "/dashboard" })
      }
      throw redirect({ to: "/dashboard/selecionar-workspace" })
    } catch (err) {
      if (isRedirect(err)) throw err
    }
  },
  component: LoginRoute,
})

function LoginRoute() {
  return <LoginPage />
}
