import * as React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"

import { importGoogleMapsLeads } from "@/features/leads/api/leads-api"
import { ImportApifyFormatHint } from "@/features/leads/components/import-apify-format-hint"
import { ImportItemsPreview } from "@/features/leads/components/import-items-preview"
import { ImportJsonSource } from "@/features/leads/components/import-json-source"
import { ImportResultDialog } from "@/features/leads/components/import-result-dialog"
import { parseGoogleMapsImportJson } from "@/features/leads/lib/parse-google-maps-json"
import { leadsListQueryKey } from "@/features/leads/queries/leads-query-keys"
import type { GoogleMapsImportResult } from "@/features/leads/types/google-maps-import"
import { Button } from "@/components/ui/button"

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
      await queryClient.invalidateQueries({ queryKey: leadsListQueryKey })
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
    <div className="flex w-full min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <h1 className="text-xl font-medium">Importar leads (Google Maps)</h1>
        <p className="wrap-break-word text-sm text-muted-foreground">
          Envie um JSON com até 500 itens. Cada item precisa de{" "}
          <span className="text-foreground">title</span> e telefone válido ou{" "}
          <span className="text-foreground">query_place_id</span> na URL do
          Maps. O backend define <span className="font-mono">source</span> como{" "}
          <span className="font-mono">google_maps</span>.
        </p>
        <ImportApifyFormatHint />
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">1. JSON</h2>
        <ImportJsonSource value={text} onChange={setJsonText} />
        {!parsed.ok ? (
          <p className="rounded-3xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {parsed.error}
          </p>
        ) : null}
      </section>

      {parsed.ok ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">2. Pré-visualização</h2>
          <ImportItemsPreview items={parsed.data.items} />
        </section>
      ) : null}

      {parsed.ok ? (
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            disabled={!canImport}
            onClick={() => mutation.mutate(parsed.data)}
          >
            {mutation.isPending ? "Importando..." : "Importar"}
          </Button>
        </div>
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
