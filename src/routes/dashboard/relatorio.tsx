import { createFileRoute } from "@tanstack/react-router"

import { SectionPlaceholder } from "@/features/dashboard/pages/section-placeholder"

export const Route = createFileRoute("/dashboard/relatorio")({
  component: RelatorioPage,
})

function RelatorioPage() {
  return (
    <SectionPlaceholder
      title="Relatório"
      description="Números do mês: novos leads, conversão por etapa, ticket médio."
    />
  )
}
