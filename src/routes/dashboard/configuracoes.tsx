import { createFileRoute } from "@tanstack/react-router"

import { ConfiguracoesSettingsPage } from "@/features/settings/pages/configuracoes-settings-page"

export const Route = createFileRoute("/dashboard/configuracoes")({
  component: ConfiguracoesPage,
})

function ConfiguracoesPage() {
  return <ConfiguracoesSettingsPage />
}
