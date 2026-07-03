import * as React from "react"
import {
  IconChevronDown,
  IconMinus,
  IconRotateClockwise,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { LeadListFilterFields } from "@/features/leads/components/lead-list-filter-fields"
import {
  advancedLeadListFiltersEqual,
  countAdvancedLeadListFilters,
  defaultAdvancedLeadListFilters,
  mergeAdvancedLeadListFilters,
  pickAdvancedLeadListFilters,
  type LeadListAdvancedFilterState,
} from "@/features/leads/lib/lead-list-filters"
import type { LeadListFilterState } from "@/features/leads/types/lead-list-query"

type Props = {
  applied: LeadListFilterState
  onSearchChange: (search: string) => void
  onApplyAdvanced: (advanced: LeadListAdvancedFilterState) => void
  panelTitle: string
  showImportReviewFilter?: boolean
  className?: string
}

export function LeadListFiltersPanel({
  applied,
  onSearchChange,
  onApplyAdvanced,
  panelTitle,
  showImportReviewFilter = false,
  className,
}: Props) {
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<LeadListAdvancedFilterState>(() =>
    pickAdvancedLeadListFilters(applied)
  )

  const appliedAdvanced = pickAdvancedLeadListFilters(applied)
  const appliedCount = countAdvancedLeadListFilters(applied)
  const hasPendingChanges = !advancedLeadListFiltersEqual(draft, appliedAdvanced)

  const wasOpen = React.useRef(false)
  React.useEffect(() => {
    if (open && !wasOpen.current) {
      setDraft(appliedAdvanced)
    }
    wasOpen.current = open
  }, [open, appliedAdvanced])

  const draftFilters = mergeAdvancedLeadListFilters(applied, draft)

  const applyDraft = () => {
    onApplyAdvanced(draft)
    setOpen(false)
  }

  const clearAdvanced = () => {
    const cleared = defaultAdvancedLeadListFilters()
    setDraft(cleared)
    onApplyAdvanced(cleared)
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={className}>
      <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="grid min-w-0 flex-1 gap-2 sm:max-w-md">
          <span className="text-[11px] font-medium tracking-[0.08em] text-stat-label uppercase">
            Busca
          </span>
          <Input
            value={applied.search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Nome ou telefone"
            maxLength={200}
            className="border-stat-card-border bg-stat-card text-stat-value placeholder:text-stat-muted"
          />
        </label>

        <CollapsibleTrigger
          type="button"
          className="flex h-(--control-height-sm) w-full items-center justify-between gap-3 rounded-lg border border-stat-card-border bg-stat-card px-3 text-sm font-medium text-stat-value transition-colors sm:w-auto sm:min-w-48"
        >
          <span className="flex items-center gap-2">
            Filtros avançados
            {appliedCount > 0 ? (
              <span className="rounded-full border border-stat-card-border bg-muted px-2 py-px font-mono text-[10px] tabular-nums text-stat-muted">
                {appliedCount}
              </span>
            ) : null}
            {hasPendingChanges && open ? (
              <span className="text-[10px] font-medium tracking-wide text-primary uppercase">
                Pendente
              </span>
            ) : null}
          </span>
          {open ? (
            <IconMinus className="size-4 shrink-0 text-stat-muted" aria-hidden />
          ) : (
            <IconChevronDown
              className="size-4 shrink-0 text-stat-muted"
              aria-hidden
            />
          )}
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="overflow-hidden pb-4 data-[state=open]:max-h-[min(50vh,22rem)] data-[state=open]:overflow-y-auto">
        <div className="rounded-lg border border-stat-card-border bg-stat-card p-4">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3">
            <p className="text-sm font-medium text-stat-value">{panelTitle}</p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-stat-muted hover:text-stat-value"
              onClick={clearAdvanced}
            >
              <IconRotateClockwise className="size-3.5" aria-hidden />
              Limpar
            </Button>
          </div>

          <LeadListFilterFields
            value={draftFilters}
            onChange={(next) => setDraft(pickAdvancedLeadListFilters(next))}
            hideSearch
            showImportReviewFilter={showImportReviewFilter}
          />

          <div className="mt-4 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setDraft(appliedAdvanced)
                setOpen(false)
              }}
            >
              Cancelar
            </Button>
            <Button type="button" size="sm" onClick={applyDraft}>
              Aplicar filtros
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
