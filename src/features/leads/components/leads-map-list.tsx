import * as React from "react"
import {
  IconMapPin,
  IconPhone,
  IconSearch,
  IconStar,
} from "@tabler/icons-react"

import { Input } from "@/components/ui/input"
import { formatLeadLocation } from "@/features/leads/lib/format-lead-meta"
import type { Lead } from "@/features/leads/types/lead"
import { cn } from "@/lib/utils"

type Props = {
  leads: Lead[]
  selectedId: string | null
  onSelect: (id: string) => void
  className?: string
}

export function LeadsMapList({
  leads,
  selectedId,
  onSelect,
  className,
}: Props) {
  const [query, setQuery] = React.useState("")
  const itemRefs = React.useRef(new Map<string, HTMLButtonElement>())

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return leads
    return leads.filter((lead) => {
      const location = formatLeadLocation(lead)?.toLowerCase() ?? ""
      return (
        lead.name.toLowerCase().includes(q) ||
        (lead.phone?.toLowerCase().includes(q) ?? false) ||
        location.includes(q) ||
        (lead.categoryName?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [leads, query])

  React.useEffect(() => {
    if (!selectedId) return
    itemRefs.current
      .get(selectedId)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }, [selectedId])

  return (
    <aside
      className={cn(
        "flex h-full min-h-0 w-full flex-col border-border bg-card md:w-80 md:shrink-0 md:border-r",
        className
      )}
    >
      <div className="space-y-3 border-b border-border p-4">
        <div>
          <p className="text-sm font-semibold tracking-tight text-stat-value">
            No mapa
          </p>
          <p className="mt-0.5 text-xs text-stat-muted">
            {filtered.length}{" "}
            {filtered.length === 1 ? "lead" : "leads"} com coordenadas
          </p>
        </div>
        <div className="relative">
          <IconSearch
            className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-stat-muted"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nome, telefone ou local"
            className="pl-9"
            aria-label="Filtrar leads no mapa"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-stat-muted">
            Nenhum lead corresponde à busca.
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {filtered.map((lead) => {
              const active = lead.id === selectedId
              const location = formatLeadLocation(lead)
              const score =
                lead.totalScore != null &&
                Number.isFinite(Number(lead.totalScore))
                  ? Number(lead.totalScore)
                  : null

              return (
                <li key={lead.id}>
                  <button
                    type="button"
                    ref={(el) => {
                      if (el) itemRefs.current.set(lead.id, el)
                      else itemRefs.current.delete(lead.id)
                    }}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "w-full rounded-lg border px-3 py-3 text-left transition-colors",
                      active
                        ? "border-foreground/20 bg-muted/50"
                        : "border-transparent hover:bg-muted/30"
                    )}
                    onClick={() => onSelect(lead.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 space-y-0.5">
                        {lead.categoryName?.trim() ? (
                          <p className="truncate text-[10px] font-medium tracking-[0.08em] text-stat-muted uppercase">
                            {lead.categoryName}
                          </p>
                        ) : null}
                        <p className="truncate text-sm font-medium text-stat-value">
                          {lead.name}
                        </p>
                      </div>
                      {score != null ? (
                        <span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-stat-muted">
                          <IconStar className="size-3" aria-hidden />
                          {score.toFixed(1)}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-2 space-y-1 text-xs text-stat-muted">
                      {location ? (
                        <p className="flex items-center gap-1.5">
                          <IconMapPin
                            className="size-3.5 shrink-0 opacity-70"
                            aria-hidden
                          />
                          <span className="truncate">{location}</span>
                        </p>
                      ) : null}
                      {lead.phone?.trim() ? (
                        <p className="flex items-center gap-1.5">
                          <IconPhone
                            className="size-3.5 shrink-0 opacity-70"
                            aria-hidden
                          />
                          <span className="font-mono tabular-nums">
                            {lead.phone}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </aside>
  )
}
