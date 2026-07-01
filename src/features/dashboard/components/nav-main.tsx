import type { ReactNode } from "react"
import { Link } from "@tanstack/react-router"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { IconChevronRight } from "@tabler/icons-react"

type NavItem = {
  title: string
  url: string
  icon: ReactNode
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

function linkFor(url: string) {
  if (url.startsWith("#")) {
    return <a href={url} />
  }
  return <Link to={url} />
}

export function NavMain({
  items,
  label = "Principal",
}: {
  items: NavItem[]
  label?: string
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items?.length ? (
            <Collapsible
              key={item.title}
              defaultOpen={item.isActive}
              render={<SidebarMenuItem />}
            >
              <SidebarMenuButton
                tooltip={item.title}
                render={linkFor(item.url)}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
              <CollapsibleTrigger
                render={
                  <SidebarMenuAction className="aria-expanded:rotate-90" />
                }
              >
                <IconChevronRight />
                <span className="sr-only">Expandir</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton render={linkFor(subItem.url)}>
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                render={linkFor(item.url)}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
