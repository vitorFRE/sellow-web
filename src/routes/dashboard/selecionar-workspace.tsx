import { createFileRoute } from "@tanstack/react-router"

import { WorkspaceSelectorPage } from "@/features/workspaces/pages/workspace-selector-page"

export const Route = createFileRoute("/dashboard/selecionar-workspace")({
  component: WorkspaceSelectorPage,
})
