import { IconTrendingDown } from "@tabler/icons-react"
import type { TablerIcon } from "@tabler/icons-react"

export type SettingsSectionId = "loss-reasons"

export type SettingsNavItem = {
  id: SettingsSectionId
  title: string
  icon: TablerIcon
}

export const settingsNavItems: SettingsNavItem[] = [
  {
    id: "loss-reasons",
    title: "Motivos de perda",
    icon: IconTrendingDown,
  },
]
