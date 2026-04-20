import { IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { LeadListFiltersBar } from "@/features/leads/components/lead-list-filters-bar"
import type { LeadListFilterState } from "@/features/leads/types/lead-list-query"

type Props = {
  onOpenCreateLead: () => void
  filters: LeadListFilterState
  onFiltersChange: (next: LeadListFilterState) => void
}

export function PipelineToolbar({
  onOpenCreateLead,
  filters,
  onFiltersChange,
}: Props) {
  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-background/95 px-1 pb-3">
      <h1 className="text-base font-semibold tracking-tight md:text-lg">
        Pipeline
      </h1>
      <div className="flex items-center gap-2">
        <LeadListFiltersBar
          value={filters}
          onChange={onFiltersChange}
          showStatus={false}
          align="end"
        />
        <Button
          type="button"
          size="sm"
          className="gap-2 rounded-2xl"
          onClick={onOpenCreateLead}
        >
          <IconPlus className="size-4" aria-hidden />
          Novo lead
        </Button>
      </div>
    </header>
  )
}
