import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { settingsNavItems } from "@/features/settings/config/settings-nav"
import type { SettingsSectionId } from "@/features/settings/config/settings-nav"

type Props = {
  section: SettingsSectionId
  onSectionChange: (id: SettingsSectionId) => void
}

export function SettingsConfigNav({ section, onSectionChange }: Props) {
  return (
    <Sidebar
      collapsible="none"
      className="w-full shrink-0 border-sidebar-border bg-sidebar sm:w-52 sm:max-w-52 sm:border-y-0 sm:border-l sm:border-r"
    >
      <SidebarHeader className="border-b border-sidebar-border px-3 py-2.5">
        <p className="text-xs font-medium tracking-wide text-sidebar-foreground/70 uppercase">
          Configurações
        </p>
      </SidebarHeader>
      <SidebarContent className="px-2 py-2">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 text-[11px]">Áreas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      type="button"
                      isActive={section === item.id}
                      size="sm"
                      onClick={() => onSectionChange(item.id)}
                    >
                      <Icon aria-hidden />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
