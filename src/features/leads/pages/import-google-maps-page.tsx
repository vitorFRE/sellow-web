import * as React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"

import { HttpError } from "@/features/auth/api/auth-api"
import { importGoogleMapsLeads } from "@/features/leads/api/leads-api"
import {
  ImportGoogleMapsActions,
  ImportGoogleMapsHeader,
  ImportItemsPreview,
  ImportJsonSource,
  ImportResultDialog,
  ImportStepPanel,
} from "@/features/leads/components/import-google-maps"
import { parseGoogleMapsImportJson } from "@/features/leads/lib/parse-google-maps-json"
import type { GoogleMapsImportResult } from "@/features/leads/types/google-maps-import"

export function ImportGoogleMapsPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [text, setText] = React.useState("")
  const [result, setResult] = React.useState<GoogleMapsImportResult | null>(
    null
  )

  const parsed = React.useMemo(() => parseGoogleMapsImportJson(text), [text])

  const mutation = useMutation({
    mutationFn: importGoogleMapsLeads,
    onSuccess: async (data) => {
      setResult(data)
      await queryClient.invalidateQueries({ queryKey: ["leads"] })
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
    <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col gap-8 pb-10">
      <ImportGoogleMapsHeader />

      <ImportStepPanel
        step={1}
        title="Cole ou carregue o JSON"
        description="O arquivo deve estar no formato esperado pela API (array ou objeto com lista de itens)."
      >
        <ImportJsonSource value={text} onChange={setJsonText} />
        {!parsed.ok ? (
          <p
            className="rounded-3xl border border-destructive/35 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            {parsed.error}
          </p>
        ) : null}
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
              <p
                className="rounded-3xl border border-destructive/35 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {mutation.error instanceof HttpError
                  ? mutation.error.message
                  : "Não foi possível concluir a importação."}
              </p>
            ) : null}
            <ImportGoogleMapsActions
              canImport={canImport}
              isPending={mutation.isPending}
              onImport={() => mutation.mutate(parsed.data)}
            />
          </div>
        </ImportStepPanel>
      ) : null}

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
    </div>
  )
}
