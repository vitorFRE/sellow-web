import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { IconBuilding, IconCheck, IconSelector } from "@tabler/icons-react"

import { getWorkspaceRoleLabel } from "@/features/workspaces/lib/workspace-role-labels"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"
import { dashboardSidebarData } from "@/features/dashboard/config/dashboard-sidebar-data"

export function WorkspaceSwitcher() {
  const { isMobile } = useSidebar()
  const { workspace, workspaces, workspaceId, setWorkspace } = useActiveWorkspace()
  const nav = dashboardSidebarData

  if (workspaces.length <= 1) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="pointer-events-none">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground ring-1 ring-sidebar-primary/30">
              {nav.brandIcon}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Sellow</span>
              <span className="truncate text-xs">
                {workspace?.name ?? "Carregando..."}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />
            }
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground ring-1 ring-sidebar-primary/30">
              {nav.brandIcon}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Sellow</span>
              <span className="truncate text-xs">
                {workspace?.name ?? "Selecionar workspace"}
              </span>
            </div>
            <IconSelector className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {workspaces.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => setWorkspace(item.id)}
                >
                  <IconBuilding className="size-4" />
                  <span className="min-w-0 flex-1 truncate">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {getWorkspaceRoleLabel(item.role)}
                  </span>
                  {item.id === workspaceId ? (
                    <IconCheck className="size-4 text-primary" />
                  ) : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
