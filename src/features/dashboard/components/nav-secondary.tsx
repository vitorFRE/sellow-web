import * as React from "react"
import { Link } from "@tanstack/react-router"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ComingSoonBadge } from "@/shared/components/coming-soon-badge"

export type NavSecondaryItem = {
  title: string
  icon: React.ReactNode
  url?: string
  comingSoon?: boolean
}

function linkFor(url: string) {
  if (url.startsWith("#")) {
    return <a href={url} />
  }
  return <Link to={url} />
}

export function NavSecondary({
  items,
  ...props
}: {
  items: NavSecondaryItem[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.comingSoon || !item.url ? (
                <SidebarMenuButton
                  size="sm"
                  disabled
                  className="pointer-events-none opacity-80"
                >
                  {item.icon}
                  <span>{item.title}</span>
                  <ComingSoonBadge className="ml-auto" />
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton size="sm" render={linkFor(item.url)}>
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
