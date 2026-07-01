import { settingsNavItems } from "@/features/settings/config/settings-nav"
import type { SettingsSectionId } from "@/features/settings/config/settings-nav"
import { cn } from "@/lib/utils"

type Props = {
  section: SettingsSectionId
  onSectionChange: (id: SettingsSectionId) => void
  className?: string
}

export function SettingsConfigNav({
  section,
  onSectionChange,
  className,
}: Props) {
  return (
    <nav
      className={cn(
        "w-full shrink-0 border-b border-border pb-6 sm:w-44 sm:border-b-0 sm:border-r sm:pr-8 sm:pb-0 lg:w-48",
        className
      )}
      aria-label="Configurações"
    >
      <p className="text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
        Configurações
      </p>

      <p className="mt-8 mb-3 text-[11px] font-medium tracking-[0.08em] text-stat-muted uppercase">
        Áreas
      </p>

      <ul className="divide-y divide-border">
        {settingsNavItems.map((item) => {
          const active = section === item.id
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full py-2.5 text-left text-sm transition-colors",
                  active
                    ? "font-medium text-stat-value"
                    : "text-stat-muted hover:text-stat-value"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.title}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
