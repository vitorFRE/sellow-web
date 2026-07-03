import { WorkspaceSelector } from "@/features/workspaces/components/workspace-selector"
import { DashboardReveal } from "@/features/dashboard/components/dashboard-reveal"

export function WorkspaceSelectorPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
      <DashboardReveal>
        <WorkspaceSelector />
      </DashboardReveal>
    </div>
  )
}
