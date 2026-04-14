import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import { DashboardShell } from "@/features/dashboard/layout/dashboard-shell"
import {
  authMeQueryKey,
  fetchAuthMe,
} from "@/features/auth/queries/auth-me-query"

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData({
        queryKey: authMeQueryKey,
        queryFn: fetchAuthMe,
      })
    } catch {
      throw redirect({ to: "/" })
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
