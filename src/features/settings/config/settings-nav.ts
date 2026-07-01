export type SettingsSectionId = "loss-reasons"

export type SettingsNavItem = {
  id: SettingsSectionId
  title: string
}

export const settingsNavItems: SettingsNavItem[] = [
  {
    id: "loss-reasons",
    title: "Motivos de perda",
  },
]
