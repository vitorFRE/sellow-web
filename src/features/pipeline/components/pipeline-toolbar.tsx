import { LeadListFiltersPanel } from "@/features/leads/components/lead-list-filters-panel"
import type { LeadListAdvancedFilterState } from "@/features/leads/lib/lead-list-filters"
import type { LeadListFilterState } from "@/features/leads/types/lead-list-query"
import { PipelineHeader } from "@/features/pipeline/components/pipeline-header"
import { useWorkspacePermissions } from "@/features/workspaces/hooks/use-workspace-permissions"

type Props = {
  applied: LeadListFilterState
  onSearchChange: (search: string) => void
  onApplyAdvanced: (advanced: LeadListAdvancedFilterState) => void
  onOpenCreateLead: () => void
}

export function PipelineToolbar({
  applied,
  onSearchChange,
  onApplyAdvanced,
  onOpenCreateLead,
}: Props) {
  const { canWriteLeads } = useWorkspacePermissions()

  return (
    <div className="shrink-0 border-b border-border bg-background px-4 md:px-6">
      <PipelineHeader
        onOpenCreateLead={canWriteLeads ? onOpenCreateLead : undefined}
        canWriteLeads={canWriteLeads}
      />
      <LeadListFiltersPanel
        applied={applied}
        onSearchChange={onSearchChange}
        onApplyAdvanced={onApplyAdvanced}
        panelTitle="Refinar pipeline"
      />
    </div>
  )
}
