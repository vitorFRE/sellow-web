import { createFileRoute } from "@tanstack/react-router"

import { PipelinePage } from "@/features/pipeline/pages/pipeline-page"

type PipelineSearch = { criar?: "1" }

export const Route = createFileRoute("/dashboard/pipeline")({
  validateSearch: (raw: Record<string, unknown>): PipelineSearch => {
    const c = raw.criar
    if (c === "1" || c === 1) return { criar: "1" }
    return {}
  },
  component: PipelineRoute,
})

function PipelineRoute() {
  const { criar } = Route.useSearch()
  const navigate = Route.useNavigate()
  const createOpen = criar === "1"

  return (
    <PipelinePage
      createLeadOpen={createOpen}
      onCreateLeadOpenChange={(open) => {
        void navigate({
          search: (prev) => ({ ...prev, criar: open ? "1" : undefined }),
          replace: true,
        })
      }}
    />
  )
}
