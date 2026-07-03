import type { SettingsSectionId } from "@/features/settings/config/settings-nav"
import { useVisibleSettingsNavGroups } from "@/features/settings/hooks/use-visible-settings-nav-items"
import { cn } from "@/lib/utils"

type Props = {
  onSelect: (id: SettingsSectionId) => void
}

export function SettingsMobileMenuList({ onSelect }: Props) {
  const visibleGroups = useVisibleSettingsNavGroups()

  return (
    <nav aria-label="Áreas de configuração">
      <p className="mb-6 font-mono text-[10px] tracking-[0.16em] text-stat-label uppercase">
        Configurações
      </p>
      <div>
        {visibleGroups.map((group, index) => (
          <div
            key={group.id}
            className={cn(index > 0 && "mt-8 border-t border-border pt-8")}
          >
            <p
              className="mb-3 select-none font-mono text-[10px] tracking-[0.16em] text-stat-label/60 uppercase"
              aria-hidden
            >
              {group.label}
            </p>
            <ul className="divide-y divide-border border-y border-border">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    className="flex w-full items-center justify-between py-3.5 pl-1 text-left text-sm font-medium text-stat-value transition-colors"
                  >
                    <span>{item.title}</span>
                    <span className="font-mono text-xs text-stat-muted" aria-hidden>
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
