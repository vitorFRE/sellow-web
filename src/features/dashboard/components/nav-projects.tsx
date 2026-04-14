import type { ReactNode } from "react"
import { Link } from "@tanstack/react-router"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  IconDots,
  IconFolder,
  //IconShare2,
  //IconTrash,
} from "@tabler/icons-react"

function linkFor(url: string) {
  if (url.startsWith("#")) {
    return <a href={url} />
  }
  return <Link to={url} />
}

export function NavProjects({
  projects,
  groupLabel = "Biblioteca",
}: {
  projects: {
    name: string
    url: string
    icon: ReactNode
  }[]
  groupLabel?: string
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton render={linkFor(item.url)}>
              {item.icon}
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction
                    showOnHover
                    className="aria-expanded:bg-muted"
                  />
                }
              >
                <IconDots />
                <span className="sr-only">Mais opções</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <IconFolder className="text-muted-foreground" />
                  <span>Abrir</span>
                </DropdownMenuItem>
                {/*   <DropdownMenuItem>
                  <IconShare2 className="text-muted-foreground" />
                  <span>Compartilhar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <IconTrash className="text-muted-foreground" />
                  <span>Remover</span>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {/*  <SidebarMenuItem>
          <SidebarMenuButton render={<a href="#" />}>
            <IconDots />
            <span>Ver mais</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  )
}
