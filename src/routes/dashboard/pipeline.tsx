import { createFileRoute } from "@tanstack/react-router"

import { SectionPlaceholder } from "@/features/dashboard/pages/section-placeholder"

export const Route = createFileRoute("/dashboard/pipeline")({
  component: PipelinePage,
})

function PipelinePage() {
  return (
    <SectionPlaceholder
      title="Pipeline"
      description="Kanban por etapa do lead — em construção."
    />
  )
}
