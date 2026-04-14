import { createFileRoute } from "@tanstack/react-router"

import { SectionPlaceholder } from "@/features/dashboard/pages/section-placeholder"

export const Route = createFileRoute("/dashboard/leads")({
  component: LeadsPage,
})

function LeadsPage() {
  return (
    <SectionPlaceholder
      title="Leads"
      description="Lista única com filtros — importação Google e cadastro manual."
    />
  )
}
