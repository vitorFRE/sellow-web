import { CreateLeadModal } from "@/features/leads/components/create-lead-form"
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
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden">
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col gap-0 overflow-hidden">
        <PipelineToolbar
          onOpenCreateLead={() => onCreateLeadOpenChange(true)}
        />
        <div className="min-h-0 min-w-0 flex-1">
          <PipelineKanban />
        </div>
      </div>
      <CreateLeadModal
        open={createLeadOpen}
        onOpenChange={onCreateLeadOpenChange}
      />
    </div>
  )
}
