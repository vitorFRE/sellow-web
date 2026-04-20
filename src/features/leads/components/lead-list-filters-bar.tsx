import type { KeyboardEvent } from "react"
import { IconFilter, IconRotateClockwise } from "@tabler/icons-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { countActiveLeadListFilters } from "@/features/leads/lib/lead-list-filters"
import type { LeadStatus } from "@/features/leads/types/lead"
import {
  DEFAULT_LEAD_LIST_FILTER_STATE,
  type LeadListFilterState,
} from "@/features/leads/types/lead-list-query"
import {
  PIPELINE_COLUMN_LABELS,
  PIPELINE_STATUSES,
} from "@/features/pipeline/config/pipeline-columns"

const sortByLabels: Record<LeadListFilterState["sortBy"], string> = {
  updatedAt: "Atualizado em",
  totalScore: "Nota (Google)",
  reviewsCount: "Qtd. avaliações",
}

const hasWebsiteLabels: Record<LeadListFilterState["hasWebsite"], string> = {
  all: "Todos",
  yes: "Com website",
  no: "Sem website",
}

const sortDirLabels: Record<LeadListFilterState["sortDir"], string> = {
  asc: "Crescente",
  desc: "Decrescente",
}

/** Evita que o Menu capture teclas (typeahead/setas) e bloqueie digitação nos inputs. */
function stopMenuKeyFromStealingInput(e: KeyboardEvent) {
  e.stopPropagation()
}

type Props = {
  value: LeadListFilterState
  onChange: (next: LeadListFilterState) => void
  showStatus: boolean
  /** Alinhamento do painel em relação ao botão (ex.: pipeline à direita). */
  align?: "start" | "center" | "end"
  className?: string
}

export function LeadListFiltersBar({
  value,
  onChange,
  showStatus,
  align = "end",
  className,
}: Props) {
  const activeCount = countActiveLeadListFilters(value, {
    includeStatus: showStatus,
  })

  const reset = () => onChange({ ...DEFAULT_LEAD_LIST_FILTER_STATE })

  return (
    <div className={cn("flex shrink-0 justify-end", className)}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          type="button"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "h-9 gap-2 rounded-2xl"
          )}
          aria-label="Abrir filtros"
        >
          <IconFilter className="size-4" aria-hidden />
          Filtros
          {activeCount > 0 ? (
            <span className="rounded-full bg-primary/15 px-2 py-px text-[11px] font-medium tabular-nums text-foreground">
              {activeCount}
            </span>
          ) : null}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={align}
          sideOffset={6}
          className="w-[min(calc(100vw-2rem),22rem)] max-h-[min(80vh,32rem)] overflow-y-auto p-0"
        >
          {/* Evita fechar o menu ao interagir com inputs/selects */}
          <div
            className="flex flex-col gap-3 p-3"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
              <span className="text-sm font-medium leading-none text-foreground">
                Filtros da lista
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 shrink-0 gap-1.5 text-muted-foreground"
                onClick={reset}
                disabled={activeCount === 0}
              >
                <IconRotateClockwise className="size-3.5" aria-hidden />
                Limpar
              </Button>
            </div>

            <label className="grid min-w-0 gap-1.5 text-xs font-medium">
              <span className="text-muted-foreground">Busca (nome ou telefone)</span>
              <Input
                value={value.search}
                onChange={(e) => onChange({ ...value, search: e.target.value })}
                onKeyDown={stopMenuKeyFromStealingInput}
                placeholder="Ex.: acme ou +5511…"
                maxLength={200}
                className="min-w-0"
              />
              <span className="font-normal text-[10px] leading-snug text-muted-foreground/90">
                Busca case-sensitive no servidor (substring em nome ou telefone).
              </span>
            </label>

            {showStatus ? (
              <div className="grid min-w-0 gap-1.5 text-xs font-medium">
                <span className="text-muted-foreground">Status</span>
                <Select
                  value={value.status ?? "ALL"}
                  onValueChange={(v) =>
                    onChange({
                      ...value,
                      status: v === "ALL" ? null : (v as LeadStatus),
                    })
                  }
                >
                  <SelectTrigger className="w-full min-w-0" size="sm">
                    <SelectValue placeholder="Todos">
                      {value.status == null
                        ? "Todos"
                        : PIPELINE_COLUMN_LABELS[value.status]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Todos</SelectItem>
                    {PIPELINE_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {PIPELINE_COLUMN_LABELS[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}

            <label className="grid min-w-0 gap-1.5 text-xs font-medium">
              <span className="text-muted-foreground">Nota mín. (totalScore)</span>
              <Input
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={value.minTotalScore}
                onChange={(e) =>
                  onChange({ ...value, minTotalScore: e.target.value })
                }
                onKeyDown={stopMenuKeyFromStealingInput}
                placeholder="0"
                className="min-w-0"
              />
            </label>

            <label className="grid min-w-0 gap-1.5 text-xs font-medium">
              <span className="text-muted-foreground">Avaliações mín.</span>
              <Input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={value.minReviewsCount}
                onChange={(e) =>
                  onChange({ ...value, minReviewsCount: e.target.value })
                }
                onKeyDown={stopMenuKeyFromStealingInput}
                placeholder="0"
                className="min-w-0"
              />
            </label>

            <div className="grid min-w-0 gap-1.5 text-xs font-medium">
              <span className="text-muted-foreground">Site</span>
              <Select
                value={value.hasWebsite}
                onValueChange={(v) =>
                  onChange({
                    ...value,
                    hasWebsite: v as LeadListFilterState["hasWebsite"],
                  })
                }
              >
                <SelectTrigger className="w-full min-w-0" size="sm">
                  <SelectValue>
                    {hasWebsiteLabels[value.hasWebsite]}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="yes">Com website</SelectItem>
                  <SelectItem value="no">Sem website</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DropdownMenuSeparator className="my-0" />

            <div className="grid min-w-0 gap-1.5 text-xs font-medium">
              <span className="text-muted-foreground">Ordenar por</span>
              <Select
                value={value.sortBy}
                onValueChange={(v) =>
                  onChange({
                    ...value,
                    sortBy: v as LeadListFilterState["sortBy"],
                  })
                }
              >
                <SelectTrigger className="w-full min-w-0" size="sm">
                  <SelectValue>{sortByLabels[value.sortBy]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(sortByLabels) as LeadListFilterState["sortBy"][]).map(
                    (k) => (
                      <SelectItem key={k} value={k}>
                        {sortByLabels[k]}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid min-w-0 gap-1.5 text-xs font-medium">
              <span className="text-muted-foreground">Ordem</span>
              <Select
                value={value.sortDir}
                onValueChange={(v) =>
                  onChange({
                    ...value,
                    sortDir: v as LeadListFilterState["sortDir"],
                  })
                }
              >
                <SelectTrigger className="w-full min-w-0" size="sm">
                  <SelectValue>{sortDirLabels[value.sortDir]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Decrescente</SelectItem>
                  <SelectItem value="asc">Crescente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
