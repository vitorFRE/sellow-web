import { createFileRoute } from "@tanstack/react-router"

import { SectionPlaceholder } from "@/features/dashboard/pages/section-placeholder"

export const Route = createFileRoute("/dashboard/importar")({
  component: ImportarPage,
})

function ImportarPage() {
  return (
    <SectionPlaceholder
      title="Importar"
      description="Importar leads (Google Sheets, CSV, etc.)."
    />
  )
}
