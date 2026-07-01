import { settingsNavItems } from "@/features/settings/config/settings-nav"
import type { SettingsSectionId } from "@/features/settings/config/settings-nav"
import { cn } from "@/lib/utils"

type Props = {
  onSelect: (id: SettingsSectionId) => void
}

export function SettingsMobileMenuList({ onSelect }: Props) {
  return (
    <nav aria-label="Áreas de configuração">
      <p className="mb-4 text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
        Configurações
      </p>
      <ul className="divide-y divide-border border-y border-border">
        {settingsNavItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-stat-value transition-colors"
              )}
            >
              <span>{item.title}</span>
              <span className="font-mono text-xs text-stat-muted" aria-hidden>
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
