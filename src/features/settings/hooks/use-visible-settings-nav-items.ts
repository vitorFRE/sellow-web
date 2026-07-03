import { settingsNavGroups } from "@/features/settings/config/settings-nav"
import type {
  SettingsNavGroup,
  SettingsNavItem,
} from "@/features/settings/config/settings-nav"
import { useWorkspacePermissions } from "@/features/workspaces/hooks/use-workspace-permissions"

function isItemVisible(
  item: SettingsNavItem,
  canManageMembers: boolean,
  isSuperAdmin: boolean
) {
  if (item.requiresSuperAdmin && !isSuperAdmin) return false
  if (item.requiresManageMembers && !canManageMembers && !isSuperAdmin) {
    return false
  }
  return true
}

export function useVisibleSettingsNavGroups(): SettingsNavGroup[] {
  const { canManageMembers, isSuperAdmin } = useWorkspacePermissions()

  return settingsNavGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        isItemVisible(item, canManageMembers, isSuperAdmin)
      ),
    }))
    .filter((group) => group.items.length > 0)
}

/** @deprecated Use useVisibleSettingsNavGroups */
export function useVisibleSettingsNavItems(): SettingsNavItem[] {
  return useVisibleSettingsNavGroups().flatMap((group) => group.items)
}
