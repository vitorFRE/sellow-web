import * as React from "react"

import { CreateLeadModal } from "@/features/leads/components/create-lead-form"
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
  const [filters, setFilters] = React.useState<LeadListFilterState>(
    () => ({ ...DEFAULT_LEAD_LIST_FILTER_STATE })
  )

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden">
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col gap-0 overflow-hidden">
        <PipelineToolbar
          filters={filters}
          onFiltersChange={setFilters}
          onOpenCreateLead={() => onCreateLeadOpenChange(true)}
        />
        <div className="min-h-0 min-w-0 flex-1">
          <PipelineKanban filters={filters} />
        </div>
      </div>
      <CreateLeadModal
        open={createLeadOpen}
        onOpenChange={onCreateLeadOpenChange}
      />
    </div>
  )
}
