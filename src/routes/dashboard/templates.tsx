import { createFileRoute } from "@tanstack/react-router"

import { SectionPlaceholder } from "@/features/dashboard/pages/section-placeholder"

export const Route = createFileRoute("/dashboard/templates")({
  component: TemplatesPage,
})

function TemplatesPage() {
  return (
    <SectionPlaceholder
      title="Templates"
      description="Textos prontos para primeiro contato, follow-up e envio de proposta."
    />
  )
}
