import { createFileRoute } from "@tanstack/react-router"

import { SectionPlaceholder } from "@/features/dashboard/pages/section-placeholder"

export const Route = createFileRoute("/dashboard/configuracoes")({
  component: ConfiguracoesPage,
})

function ConfiguracoesPage() {
  return (
    <SectionPlaceholder
      title="Configurações"
      description="Etapas do funil, origens e preferências da importação."
    />
  )
}
