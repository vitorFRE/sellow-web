import { createFileRoute } from "@tanstack/react-router"

import { SectionPlaceholder } from "@/features/dashboard/pages/section-placeholder"

export const Route = createFileRoute("/dashboard/propostas")({
  component: PropostasPage,
})

function PropostasPage() {
  return (
    <SectionPlaceholder
      title="Propostas"
      description="Rascunhos, valores enviados e status (rascunho / enviada / aceita)."
    />
  )
}
