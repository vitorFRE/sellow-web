import type { QueryClient } from "@tanstack/react-query"

import type { Lead, LeadStatus, LeadsListResponse } from "@/features/leads/types/lead"
import {
  PIPELINE_PAGE_SIZE,
  PIPELINE_STATUSES,
} from "@/features/pipeline/config/pipeline-columns"
import { bumpLeadsListMeta } from "@/features/pipeline/lib/pipeline-leads-list-meta"
import { pipelineColumnQueryKey } from "@/features/pipeline/queries/pipeline-query-keys"

export function replaceLeadInPipelineColumn(
  queryClient: QueryClient,
  columnStatus: LeadStatus,
  serverLead: Lead
): void {
  const key = pipelineColumnQueryKey(columnStatus)
  const data = queryClient.getQueryData<LeadsListResponse>(key)
  if (!data) return
  queryClient.setQueryData<LeadsListResponse>(key, {
    ...data,
    data: data.data.map((l) => (l.id === serverLead.id ? serverLead : l)),
  })
}

export function reconcilePipelineCacheWithServerLead(
  queryClient: QueryClient,
  serverLead: Lead,
  destinationColumn: LeadStatus
): void {
  if (serverLead.status === destinationColumn) {
    replaceLeadInPipelineColumn(queryClient, destinationColumn, serverLead)
    return
  }

  for (const status of PIPELINE_STATUSES) {
    const key = pipelineColumnQueryKey(status)
    const data = queryClient.getQueryData<LeadsListResponse>(key)
    if (!data?.data.some((l) => l.id === serverLead.id)) continue
    queryClient.setQueryData<LeadsListResponse>(key, {
      data: data.data.filter((l) => l.id !== serverLead.id),
      meta: bumpLeadsListMeta(data.meta, -1),
    })
    break
  }

  const destKey = pipelineColumnQueryKey(serverLead.status)
  const destData = queryClient.getQueryData<LeadsListResponse>(destKey)
  const limit =
    destData?.meta.limit ??
    queryClient.getQueryData<LeadsListResponse>(
      pipelineColumnQueryKey(destinationColumn)
    )?.meta.limit ??
    PIPELINE_PAGE_SIZE

  if (destData) {
    const had = destData.data.some((l) => l.id === serverLead.id)
    queryClient.setQueryData<LeadsListResponse>(destKey, {
      data: [serverLead, ...destData.data.filter((l) => l.id !== serverLead.id)],
      meta: bumpLeadsListMeta(destData.meta, had ? 0 : 1),
    })
  } else {
    queryClient.setQueryData<LeadsListResponse>(destKey, {
      data: [serverLead],
      meta: {
        total: 1,
        page: 1,
        limit,
        totalPages: 1,
      },
    })
  }
}
