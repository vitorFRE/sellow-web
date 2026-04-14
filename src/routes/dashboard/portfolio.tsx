import { createFileRoute } from "@tanstack/react-router"

import { SectionPlaceholder } from "@/features/dashboard/pages/section-placeholder"

export const Route = createFileRoute("/dashboard/portfolio")({
  component: PortfolioPage,
})

function PortfolioPage() {
  return (
    <SectionPlaceholder
      title="Portfólio"
      description="Links dos últimos sites para colar rápido em e-mail ou WhatsApp."
    />
  )
}
