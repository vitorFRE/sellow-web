import { createFileRoute } from "@tanstack/react-router"

import { LeadsListPage } from "@/features/leads/pages/leads-list-page"

export const Route = createFileRoute("/dashboard/leads")({
  component: LeadsListPage,
})
