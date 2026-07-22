import * as React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"

import { getApiErrorMessage } from "@/shared/lib/api-errors"
import { importGoogleMapsLeads } from "@/features/leads/api/leads-api"
import { invalidateWorkspaceLeadsQueries } from "@/features/workspaces/lib/business-query-key"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"
import {
  ImportGoogleMapsActions,
  ImportItemsPreview,
  ImportJsonSource,
  ImportResultDialog,
  ImportStepPanel,
} from "@/features/leads/components/import-google-maps"
import { ImportApifyFormatHint } from "@/features/leads/components/import-google-maps/import-apify-format-hint"
import { parseGoogleMapsImportJson } from "@/features/leads/lib/parse-google-maps-json"
import type { GoogleMapsImportResult } from "@/features/leads/types/google-maps-import"

function ImportAlert({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="rounded-lg border border-destructive/35 bg-destructive/10 px-4 py-3 text-sm text-destructive"
      role="alert"
    >
      {children}
    </p>
  )
}

export function JsonImportPanel() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { workspaceId } = useActiveWorkspace()
  const [text, setText] = React.useState("")
  const [result, setResult] = React.useState<GoogleMapsImportResult | null>(
    null
  )

  const parsed = React.useMemo(() => parseGoogleMapsImportJson(text), [text])

  const mutation = useMutation({
    mutationFn: importGoogleMapsLeads,
    onSuccess: async (data) => {
      setResult(data)
      if (workspaceId) {
        await invalidateWorkspaceLeadsQueries(queryClient, workspaceId)
      }
    },
  })

  function setJsonText(value: string) {
    setText(value)
    setResult(null)
    mutation.reset()
  }

  function clearImportForm() {
    setResult(null)
    setText("")
    mutation.reset()
  }

  function handleResultOpenChange(open: boolean) {
    if (!open) clearImportForm()
  }

  function handleViewLeads() {
    clearImportForm()
    void router.navigate({ to: "/dashboard/leads" })
  }

  const canImport = parsed.ok && !mutation.isPending

  return (
    <>
      <div className="flex flex-col gap-6">
        <ImportApifyFormatHint />

        <ImportStepPanel
          step={1}
          title="Cole ou carregue o JSON"
          description="Array ou objeto com lista de itens no formato esperado pela API. Até 500 itens."
        >
          <div className="flex flex-col gap-4">
            <ImportJsonSource value={text} onChange={setJsonText} />
            {!parsed.ok && text.trim().length > 0 ? (
              <ImportAlert>{parsed.error}</ImportAlert>
            ) : null}
          </div>
        </ImportStepPanel>

        {parsed.ok ? (
          <ImportStepPanel
            step={2}
            title="Revise e importe"
            description="Confira os dados extraídos antes de enviar para o servidor."
          >
            <div className="flex flex-col gap-6">
              <ImportItemsPreview items={parsed.data.items} />
              {mutation.isError ? (
                <ImportAlert>
                  {getApiErrorMessage(
                    mutation.error,
                    "Não foi possível concluir a importação."
                  )}
                </ImportAlert>
              ) : null}
              <ImportGoogleMapsActions
                canImport={canImport}
                isPending={mutation.isPending}
                onImport={() => mutation.mutate(parsed.data)}
              />
            </div>
          </ImportStepPanel>
        ) : null}
      </div>

      {result ? (
        <ImportResultDialog
          open
          onOpenChange={handleResultOpenChange}
          onViewLeads={handleViewLeads}
          created={result.created}
          updated={result.updated}
          skipped={result.skipped}
        />
      ) : null}
    </>
  )
}
