import { createFileRoute } from "@tanstack/react-router"

import { ImportHubPage } from "@/features/integrations/pages/import-hub-page"

export const Route = createFileRoute("/dashboard/importar")({
  component: ImportHubPage,
})
