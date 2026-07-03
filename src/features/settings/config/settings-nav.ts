export type SettingsSectionId = "loss-reasons" | "members" | "workspaces-admin"

export type SettingsNavGroupId = "workspace" | "platform"

export type SettingsNavItem = {
  id: SettingsSectionId
  title: string
  requiresManageMembers?: boolean
  requiresSuperAdmin?: boolean
}

export type SettingsNavGroup = {
  id: SettingsNavGroupId
  label: string
  items: SettingsNavItem[]
}

export const settingsNavGroups: SettingsNavGroup[] = [
  {
    id: "workspace",
    label: "Workspace",
    items: [
      {
        id: "loss-reasons",
        title: "Motivos de perda",
      },
      {
        id: "members",
        title: "Membros",
        requiresManageMembers: true,
      },
    ],
  },
  {
    id: "platform",
    label: "Super admin",
    items: [
      {
        id: "workspaces-admin",
        title: "Workspaces",
        requiresSuperAdmin: true,
      },
    ],
  },
]

/** @deprecated Use settingsNavGroups */
export const settingsNavItems: SettingsNavItem[] = settingsNavGroups.flatMap(
  (group) => group.items
)
