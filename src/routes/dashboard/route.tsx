import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import { DashboardShell } from "@/features/dashboard/layout/dashboard-shell"
import {
  authMeQueryKey,
  fetchAuthMe,
} from "@/features/auth/queries/auth-me-query"
import { resolveActiveWorkspace } from "@/features/workspaces/lib/resolve-active-workspace"
import { workspaceStorage } from "@/features/workspaces/lib/workspace-storage"

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context, location }) => {
    let authUser
    try {
      authUser = await context.queryClient.ensureQueryData({
        queryKey: authMeQueryKey,
        queryFn: fetchAuthMe,
      })
    } catch {
      throw redirect({ to: "/" })
    }

    const isSelectorRoute = location.pathname === "/dashboard/selecionar-workspace"
    const resolution = resolveActiveWorkspace(authUser.workspaces ?? [])

    if (resolution.status === "resolved") {
      workspaceStorage.set(resolution.workspaceId)
    }

    if (
      resolution.status === "needs_selection" &&
      !isSelectorRoute
    ) {
      throw redirect({ to: "/dashboard/selecionar-workspace" })
    }

    if (resolution.status === "no_access" && !isSelectorRoute) {
      throw redirect({ to: "/dashboard/selecionar-workspace" })
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  )
}
