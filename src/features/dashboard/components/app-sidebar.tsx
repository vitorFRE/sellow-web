import * as React from "react"
import { Link } from "@tanstack/react-router"

import { dashboardSidebarData } from "@/features/dashboard/config/dashboard-sidebar-data"
import { NavMain } from "@/features/dashboard/components/nav-main"
import { NavProjects } from "@/features/dashboard/components/nav-projects"
import { NavSecondary } from "@/features/dashboard/components/nav-secondary"
import { NavUser } from "@/features/dashboard/components/nav-user"
import { useAuthUser } from "@/features/auth/queries/auth-me-query"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {nav.brandIcon}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Sellow</span>
                <span className="truncate text-xs">Leads e vendas</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={nav.navMain} />
        <NavProjects projects={nav.projects} />
        <NavSecondary items={nav.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
