import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  abortIntegrationRun,
  startGoogleMapsLeadsRun,
} from "@/features/integrations/api/integrations-api"
import type { StartGoogleMapsLeadsRunPayload } from "@/features/integrations/types/integration-run"
import {
  getApiErrorMessage,
  isHttpError,
} from "@/shared/lib/api-errors"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"

const CONFLICT_MESSAGE =
  "Já existe uma busca em andamento neste workspace. Aguarde ou aborte a run ativa."

export function useIntegrationMutations() {
  const queryClient = useQueryClient()
  const { workspaceId } = useActiveWorkspace()

  async function invalidateRuns() {
    if (!workspaceId) return
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey
        return (
          key[0] === "business" &&
          key[1] === workspaceId &&
          key[2] === "integrations"
        )
      },
    })
  }

  const startMutation = useMutation({
    mutationFn: (payload: StartGoogleMapsLeadsRunPayload) =>
      startGoogleMapsLeadsRun(payload),
    onSuccess: async () => {
      await invalidateRuns()
    },
  })

  const abortMutation = useMutation({
    mutationFn: (runId: string) => abortIntegrationRun(runId),
    onSuccess: async () => {
      await invalidateRuns()
    },
  })

  function getStartErrorMessage(fallback: string): string {
    const err = startMutation.error
    if (isHttpError(err) && err.status === 409) return CONFLICT_MESSAGE
    return getApiErrorMessage(err, fallback)
  }

  function getAbortErrorMessage(fallback: string): string {
    const err = abortMutation.error
    if (isHttpError(err) && err.status === 409) {
      return "Esta run não pode mais ser abortada."
    }
    return getApiErrorMessage(err, fallback)
  }

  return {
    startMutation,
    abortMutation,
    getStartErrorMessage,
    getAbortErrorMessage,
  }
}
