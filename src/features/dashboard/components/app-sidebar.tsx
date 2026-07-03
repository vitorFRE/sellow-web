import * as React from "react"

import { dashboardSidebarData } from "@/features/dashboard/config/dashboard-sidebar-data"
import { NavMain } from "@/features/dashboard/components/nav-main"
import { NavSecondary } from "@/features/dashboard/components/nav-secondary"
import { NavUser } from "@/features/dashboard/components/nav-user"
import { useAuthUser } from "@/features/auth/queries/auth-me-query"
import { WorkspaceSwitcher } from "@/features/workspaces/components/workspace-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

const nav = dashboardSidebarData

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: authUser } = useAuthUser()

  const user = {
    name: authUser?.name ?? "Carregando...",
    email: authUser?.email ?? "",
    avatar: "",
  }

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={nav.navMain} label="Principal" />
        <NavMain items={nav.navImport} label="Importação" />
        <NavSecondary items={nav.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
