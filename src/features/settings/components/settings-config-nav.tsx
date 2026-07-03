import type { SettingsSectionId } from "@/features/settings/config/settings-nav"
import { useVisibleSettingsNavGroups } from "@/features/settings/hooks/use-visible-settings-nav-items"
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
  const visibleGroups = useVisibleSettingsNavGroups()

  return (
    <nav
      className={cn(
        "w-full shrink-0 border-b border-border pb-6 sm:w-44 sm:border-b-0 sm:border-r sm:pr-8 sm:pb-0 lg:w-48",
        className
      )}
      aria-label="Configurações"
    >
      <p className="font-mono text-[10px] tracking-[0.16em] text-stat-label uppercase">
        Configurações
      </p>

      <div className="mt-8">
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
            <ul>
              {group.items.map((item) => {
                const active = section === item.id
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSectionChange(item.id)}
                      className={cn(
                        "w-full border-l-2 py-2.5 pl-3 text-left text-sm transition-colors",
                        active
                          ? "border-stat-value font-medium text-stat-value"
                          : "border-transparent text-stat-muted hover:border-border hover:text-stat-value"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.title}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
