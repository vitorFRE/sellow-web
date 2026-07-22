import * as React from "react"

import { ImportStepPanel } from "@/features/leads/components/import-google-maps"
import { ActiveIntegrationRunPanel } from "@/features/integrations/components/active-integration-run-panel"
import {
  GoogleMapsSearchForm,
  type GoogleMapsSearchFormValues,
} from "@/features/integrations/components/google-maps-search-form"
import { IntegrationRunsList } from "@/features/integrations/components/integration-runs-list"
import { useIntegrationMutations } from "@/features/integrations/hooks/use-integration-mutations"
import { useGoogleMapsIntegrationRuns } from "@/features/integrations/hooks/use-integration-runs"
import { isActiveIntegrationRunStatus } from "@/features/integrations/lib/integration-run-status"
import type { IntegrationRun } from "@/features/integrations/types/integration-run"
import { getApiErrorMessage } from "@/shared/lib/api-errors"

export function GoogleMapsAsyncPanel() {
  const { listQuery, runs, activeRun, hasActiveRun } =
    useGoogleMapsIntegrationRuns({ limit: 10 })
  const {
    startMutation,
    abortMutation,
    getStartErrorMessage,
    getAbortErrorMessage,
  } = useIntegrationMutations()
  const [focusedRunId, setFocusedRunId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (activeRun?.id) setFocusedRunId(activeRun.id)
  }, [activeRun?.id])

  React.useEffect(() => {
    if (startMutation.data?.id) setFocusedRunId(startMutation.data.id)
  }, [startMutation.data?.id])

  const focusedRun: IntegrationRun | null = React.useMemo(() => {
    if (activeRun && isActiveIntegrationRunStatus(activeRun.status)) {
      return activeRun
    }
    if (focusedRunId) {
      const fromList = runs.find((run) => run.id === focusedRunId)
      if (fromList) return fromList
      if (startMutation.data?.id === focusedRunId) return startMutation.data
      if (abortMutation.data?.id === focusedRunId) return abortMutation.data
    }
    return activeRun
  }, [
    abortMutation.data,
    activeRun,
    focusedRunId,
    runs,
    startMutation.data,
  ])

  function handleStart(values: GoogleMapsSearchFormValues) {
    startMutation.mutate({
      lat: values.lat,
      lng: values.lng,
      radiusMeters: values.radiusMeters,
      searchQueries: values.searchQueries,
      maxResults: values.maxResults,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <ImportStepPanel
        step={1}
        title="Configurar busca"
        description="Defina o círculo no mapa e os termos. O scrape roda no Apify e os leads entram automaticamente no workspace."
      >
        <div className="flex flex-col gap-4">
          <GoogleMapsSearchForm
            disabled={hasActiveRun}
            isPending={startMutation.isPending}
            onSubmit={handleStart}
          />
          {startMutation.isError ? (
            <p
              className="rounded-lg border border-destructive/35 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {getStartErrorMessage("Não foi possível iniciar a busca.")}
            </p>
          ) : null}
          {hasActiveRun ? (
            <p className="text-sm text-stat-muted">
              Há uma execução em andamento. Aguarde ou aborte antes de iniciar
              outra.
            </p>
          ) : null}
        </div>
      </ImportStepPanel>

      {focusedRun ? (
        <ActiveIntegrationRunPanel
          run={focusedRun}
          isAborting={abortMutation.isPending}
          abortError={
            abortMutation.isError
              ? getAbortErrorMessage("Não foi possível abortar a execução.")
              : null
          }
          onAbort={() => abortMutation.mutate(focusedRun.id)}
        />
      ) : null}

      <IntegrationRunsList
        runs={runs}
        isLoading={listQuery.isLoading}
        isError={listQuery.isError}
        errorMessage={getApiErrorMessage(
          listQuery.error,
          "Não foi possível carregar o histórico."
        )}
      />
    </div>
  )
}
