import type { QueryClient, QueryKey } from "@tanstack/react-query"

import type { Lead, LeadStatus, LeadsListResponse } from "@/features/leads/types/lead"
import { pipelineColumnQueryKey } from "@/features/pipeline/queries/pipeline-query-keys"
import { bumpLeadsListMeta } from "@/features/pipeline/lib/pipeline-leads-list-meta"

export type PipelineMoveVariables = {
  id: string
  status: LeadStatus
  fromStatus: LeadStatus
  lossReasonId?: string | null
  lossReasonNote?: string | null
}

export function snapshotLeadsQueries(queryClient: QueryClient) {
  return queryClient.getQueriesData<LeadsListResponse>({
    queryKey: ["leads"],
  })
}

export function restoreLeadsQueries(
  queryClient: QueryClient,
  entries: [QueryKey, LeadsListResponse | undefined][]
) {
  for (const [key, data] of entries) {
    queryClient.setQueryData(key, data)
  }
}

/** Atualiza o cache das colunas origem/destino sem esperar o refetch. */
export function applyOptimisticPipelineMove(
  queryClient: QueryClient,
  {
    id,
    status: toStatus,
    fromStatus,
    lossReasonId,
    lossReasonNote,
  }: PipelineMoveVariables
): void {
  if (fromStatus === toStatus) return

  const fromKey = pipelineColumnQueryKey(fromStatus)
  const fromData = queryClient.getQueryData<LeadsListResponse>(fromKey)
  if (!fromData) return

  const lead = fromData.data.find((l) => l.id === id)
  if (!lead) return

  const nextLead: Lead = {
    ...lead,
    status: toStatus,
    updatedAt: new Date().toISOString(),
    ...(toStatus === "LOST"
      ? {
          lossReasonId: lossReasonId ?? lead.lossReasonId ?? null,
          lossReasonNote: lossReasonNote ?? null,
        }
      : { lossReasonId: null, lossReasonNote: null }),
  }

  queryClient.setQueryData<LeadsListResponse>(fromKey, {
    data: fromData.data.filter((l) => l.id !== id),
    meta: bumpLeadsListMeta(fromData.meta, -1),
  })

  const toKey = pipelineColumnQueryKey(toStatus)
  const toData = queryClient.getQueryData<LeadsListResponse>(toKey)
  const limit = fromData.meta.limit

  if (toData) {
    queryClient.setQueryData<LeadsListResponse>(toKey, {
      data: [nextLead, ...toData.data.filter((l) => l.id !== id)],
      meta: bumpLeadsListMeta(toData.meta, 1),
    })
  } else {
    queryClient.setQueryData<LeadsListResponse>(toKey, {
      data: [nextLead],
      meta: {
        total: 1,
        page: 1,
        limit,
        totalPages: 1,
      },
    })
  }
}
