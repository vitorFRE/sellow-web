import { IconChevronRight } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { settingsNavItems } from "@/features/settings/config/settings-nav"
import type { SettingsSectionId } from "@/features/settings/config/settings-nav"
import { cn } from "@/lib/utils"

type Props = {
  onSelect: (id: SettingsSectionId) => void
}

export function SettingsMobileMenuList({ onSelect }: Props) {
  return (
    <nav
      className="flex flex-col gap-2 rounded-xl border border-border/80 bg-card/40 p-2"
      aria-label="Áreas de configuração"
    >
      <p className="px-2 pt-1 text-xs font-medium text-muted-foreground">
        Escolha uma área
      </p>
      <ul className="flex flex-col gap-1">
        {settingsNavItems.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.id}>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "h-auto w-full justify-between gap-3 rounded-xl px-3 py-3 text-left font-normal"
                )}
                onClick={() => onSelect(item.id)}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                  <span className="truncate font-medium text-foreground">
                    {item.title}
                  </span>
                </span>
                <IconChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              </Button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
