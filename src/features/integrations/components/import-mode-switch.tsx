import {
  IconFileCode,
  IconMapSearch,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"

export type ImportHubMode = "search" | "json"

type Props = {
  mode: ImportHubMode
  onModeChange: (mode: ImportHubMode) => void
}

const MODES: {
  id: ImportHubMode
  label: string
  description: string
  icon: typeof IconMapSearch
}[] = [
  {
    id: "search",
    label: "Buscar no Maps",
    description: "Defina um círculo no mapa e importe leads automaticamente.",
    icon: IconMapSearch,
  },
  {
    id: "json",
    label: "Importar JSON",
    description: "Cole ou envie uma exportação Apify já pronta.",
    icon: IconFileCode,
  },
]

export function ImportModeSwitch({ mode, onModeChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Modo de importação"
      className="grid gap-3 sm:grid-cols-2"
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
              "group flex items-start gap-4 rounded-xl border px-4 py-4 text-left transition-colors",
              selected
                ? "border-foreground/20 bg-card"
                : "border-border bg-transparent hover:border-foreground/15 hover:bg-card/60"
            )}
            onClick={() => onModeChange(item.id)}
          >
            <span
              className={cn(
                "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border",
                selected
                  ? "border-foreground/15 bg-[#111111] text-white dark:bg-foreground dark:text-background"
                  : "border-border bg-muted/40 text-stat-muted group-hover:text-stat-value"
              )}
            >
              <Icon className="size-4" aria-hidden stroke={1.75} />
            </span>
            <span className="min-w-0 space-y-1">
              <span className="block text-sm font-semibold tracking-tight text-stat-value">
                {item.label}
              </span>
              <span className="block text-xs leading-relaxed text-stat-muted">
                {item.description}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
