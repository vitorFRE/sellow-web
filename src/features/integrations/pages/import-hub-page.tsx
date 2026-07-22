import * as React from "react"

import { GoogleMapsAsyncPanel } from "@/features/integrations/components/google-maps-async-panel"
import { ImportHubHeader } from "@/features/integrations/components/import-hub-header"
import {
  ImportModeSwitch,
  type ImportHubMode,
} from "@/features/integrations/components/import-mode-switch"
import { JsonImportPanel } from "@/features/integrations/components/json-import-panel"

export function ImportHubPage() {
  const [mode, setMode] = React.useState<ImportHubMode>("search")

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-10 pb-12">
      <ImportHubHeader />

      <ImportModeSwitch mode={mode} onModeChange={setMode} />

      {mode === "search" ? <GoogleMapsAsyncPanel /> : <JsonImportPanel />}
    </div>
  )
}
