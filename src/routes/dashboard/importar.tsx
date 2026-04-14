import { createFileRoute } from "@tanstack/react-router"

import { ImportGoogleMapsPage } from "@/features/leads/pages/import-google-maps-page"

export const Route = createFileRoute("/dashboard/importar")({
  component: ImportGoogleMapsPage,
})
