import { IconList, IconMap } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

export type LeadsViewMode = "list" | "map"

type Props = {
  mode: LeadsViewMode
  onModeChange: (mode: LeadsViewMode) => void
  className?: string
}

const MODES: {
  id: LeadsViewMode
  label: string
  description: string
  icon: typeof IconList
}[] = [
  {
    id: "list",
    label: "Lista",
    description: "Tabela com triagem e ações.",
    icon: IconList,
  },
  {
    id: "map",
    label: "Mapa",
    description: "Localize e selecione no mapa.",
    icon: IconMap,
  },
]

export function LeadsViewToggle({ mode, onModeChange, className }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Visualização dos leads"
      className={cn("grid w-full gap-2 sm:grid-cols-2 sm:max-w-md", className)}
    >
      {MODES.map((item) => {
        const selected = mode === item.id
        const Icon = item.icon
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={cn(
              "group flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors",
              selected
                ? "border-foreground/20 bg-card"
                : "border-border bg-transparent hover:border-foreground/15 hover:bg-card/60"
            )}
            onClick={() => onModeChange(item.id)}
          >
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg border",
                selected
                  ? "border-foreground/15 bg-foreground text-background"
                  : "border-border bg-muted/40 text-stat-muted group-hover:text-stat-value"
              )}
            >
              <Icon className="size-3.5" aria-hidden stroke={1.75} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold tracking-tight text-stat-value">
                {item.label}
              </span>
              <span className="mt-0.5 block text-[11px] leading-snug text-stat-muted">
                {item.description}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
