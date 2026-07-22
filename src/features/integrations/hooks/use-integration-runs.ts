import { useQuery, useQueryClient } from "@tanstack/react-query"
import * as React from "react"

import {
  getIntegrationRun,
  listIntegrationRuns,
} from "@/features/integrations/api/integrations-api"
import {
  isActiveIntegrationRunStatus,
  isTerminalSuccessStatus,
  ACTIVE_INTEGRATION_RUN_STATUSES,
} from "@/features/integrations/lib/integration-run-status"
import {
  integrationRunDetailQueryKey,
  integrationRunsListQueryKey,
} from "@/features/integrations/queries/integrations-query-keys"
import type {
  IntegrationRun,
  IntegrationType,
} from "@/features/integrations/types/integration-run"
import { invalidateWorkspaceLeadsQueries } from "@/features/workspaces/lib/business-query-key"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"

const GOOGLE_MAPS_TYPE: IntegrationType = "GOOGLE_MAPS_LEADS"
/** Intervalo enquanto a run estiver PENDING / RUNNING / IMPORTING. */
const POLL_INTERVAL_MS = 15_000

function findActiveRun(runs: IntegrationRun[]): IntegrationRun | null {
  return runs.find((run) => isActiveIntegrationRunStatus(run.status)) ?? null
}

export function useGoogleMapsIntegrationRuns(options?: {
  page?: number
  limit?: number
}) {
  const { workspaceId } = useActiveWorkspace()
  const queryClient = useQueryClient()
  const page = options?.page ?? 1
  const limit = options?.limit ?? 20

  const listQuery = useQuery({
    queryKey: workspaceId
      ? integrationRunsListQueryKey(workspaceId, {
          page,
          limit,
          type: GOOGLE_MAPS_TYPE,
        })
      : ["integrations", "runs", "list", "disabled"],
    queryFn: () =>
      listIntegrationRuns({
        page,
        limit,
        type: GOOGLE_MAPS_TYPE,
      }),
    enabled: Boolean(workspaceId),
    refetchInterval: (query) => {
      const runs = query.state.data?.data ?? []
      return findActiveRun(runs) ? POLL_INTERVAL_MS : false
    },
  })

  const runs = listQuery.data?.data ?? []
  const activeRun = findActiveRun(runs)
  const activeRunId = activeRun?.id ?? null

  const detailQuery = useQuery({
    queryKey:
      workspaceId && activeRunId
        ? integrationRunDetailQueryKey(workspaceId, activeRunId)
        : ["integrations", "runs", "detail", "disabled"],
    queryFn: () => getIntegrationRun(activeRunId!),
    enabled: Boolean(workspaceId && activeRunId),
    refetchInterval: (query) => {
      const status = query.state.data?.status
      return status && isActiveIntegrationRunStatus(status)
        ? POLL_INTERVAL_MS
        : false
    },
  })

  const watchedRun = detailQuery.data ?? activeRun
  const previousStatusRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!workspaceId || !watchedRun) return

    const prev = previousStatusRef.current
    const next = watchedRun.status
    previousStatusRef.current = next

    if (
      prev &&
      prev !== next &&
      (ACTIVE_INTEGRATION_RUN_STATUSES as readonly string[]).includes(prev) &&
      isTerminalSuccessStatus(next)
    ) {
      void invalidateWorkspaceLeadsQueries(queryClient, workspaceId)
      void queryClient.invalidateQueries({
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
  }, [watchedRun, workspaceId, queryClient])

  return {
    workspaceId,
    listQuery,
    detailQuery,
    runs,
    meta: listQuery.data?.meta,
    activeRun: watchedRun,
    hasActiveRun: Boolean(activeRun),
  }
}
