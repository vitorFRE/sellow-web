import * as React from "react"

import { CreateLeadModal } from "@/features/leads/components/create-lead-form"
import type { LeadListAdvancedFilterState } from "@/features/leads/lib/lead-list-filters"
import {
  DEFAULT_LEAD_LIST_FILTER_STATE,
  type LeadListFilterState,
} from "@/features/leads/types/lead-list-query"
import { PipelineKanban } from "@/features/pipeline/components/pipeline-kanban"
import { PipelineToolbar } from "@/features/pipeline/components/pipeline-toolbar"

type Props = {
  createLeadOpen: boolean
  onCreateLeadOpenChange: (open: boolean) => void
}

export function PipelinePage({
  createLeadOpen,
  onCreateLeadOpenChange,
}: Props) {
  const [appliedFilters, setAppliedFilters] =
    React.useState<LeadListFilterState>(() => ({
      ...DEFAULT_LEAD_LIST_FILTER_STATE,
    }))

  const onSearchChange = React.useCallback((search: string) => {
    setAppliedFilters((prev) => ({ ...prev, search }))
  }, [])

  const onApplyAdvanced = React.useCallback(
    (advanced: LeadListAdvancedFilterState) => {
      setAppliedFilters((prev) => ({ ...prev, ...advanced }))
    },
    []
  )

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden">
      <PipelineToolbar
        applied={appliedFilters}
        onSearchChange={onSearchChange}
        onApplyAdvanced={onApplyAdvanced}
        onOpenCreateLead={() => onCreateLeadOpenChange(true)}
      />
      <div className="min-h-0 min-w-0 flex-1 overflow-hidden px-4 py-3 md:px-6">
        <PipelineKanban filters={appliedFilters} />
      </div>
      <CreateLeadModal
        open={createLeadOpen}
        onOpenChange={onCreateLeadOpenChange}
      />
    </div>
  )
}
