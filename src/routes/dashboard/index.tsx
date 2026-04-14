import { createFileRoute } from "@tanstack/react-router"

import { SectionPlaceholder } from "@/features/dashboard/pages/section-placeholder"

export const Route = createFileRoute("/dashboard/")({
  component: InicioPage,
})

function InicioPage() {
  return (
    <SectionPlaceholder
      title="Início"
      description="Visão geral do dia: próximos follow-ups e o que precisa de atenção."
    />
  )
}
