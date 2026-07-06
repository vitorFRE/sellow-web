import type { QueryClient } from "@tanstack/react-query"

import type { LeadListFilterState } from "@/features/leads/types/lead-list-query"
import type { Lead, LeadStatus, LeadsListResponse } from "@/features/leads/types/lead"
import {
  PIPELINE_PAGE_SIZE,
  PIPELINE_STATUSES,
} from "@/features/pipeline/config/pipeline-columns"
import { bumpLeadsListMeta } from "@/features/pipeline/lib/pipeline-leads-list-meta"
import { pipelineColumnQueryKey } from "@/features/pipeline/queries/pipeline-query-keys"

export function replaceLeadInPipelineColumn(
  queryClient: QueryClient,
  workspaceId: string,
  columnStatus: LeadStatus,
  serverLead: Lead,
  filters: LeadListFilterState
): void {
  const key = pipelineColumnQueryKey(workspaceId, columnStatus, filters)
  const data = queryClient.getQueryData<LeadsListResponse>(key)
  if (!data) return
  queryClient.setQueryData<LeadsListResponse>(key, {
    ...data,
    data: data.data.map((l) => (l.id === serverLead.id ? serverLead : l)),
  })
}

export function reconcilePipelineCacheWithServerLead(
  queryClient: QueryClient,
  workspaceId: string,
  serverLead: Lead,
  destinationColumn: LeadStatus,
  filters: LeadListFilterState
): void {
  if (serverLead.status === "IMPORTED") {
    for (const status of PIPELINE_STATUSES) {
      const key = pipelineColumnQueryKey(workspaceId, status, filters)
      const data = queryClient.getQueryData<LeadsListResponse>(key)
      if (!data?.data.some((l) => l.id === serverLead.id)) continue
      queryClient.setQueryData<LeadsListResponse>(key, {
        data: data.data.filter((l) => l.id !== serverLead.id),
        meta: bumpLeadsListMeta(data.meta, -1),
      })
      break
    }
    return
  }

  if (serverLead.status === destinationColumn) {
    replaceLeadInPipelineColumn(
      queryClient,
      workspaceId,
      destinationColumn,
      serverLead,
      filters
    )
    return
  }

  for (const status of PIPELINE_STATUSES) {
    const key = pipelineColumnQueryKey(workspaceId, status, filters)
    const data = queryClient.getQueryData<LeadsListResponse>(key)
    if (!data?.data.some((l) => l.id === serverLead.id)) continue
    queryClient.setQueryData<LeadsListResponse>(key, {
      data: data.data.filter((l) => l.id !== serverLead.id),
      meta: bumpLeadsListMeta(data.meta, -1),
    })
    break
  }

  const destKey = pipelineColumnQueryKey(workspaceId, serverLead.status, filters)
  const destData = queryClient.getQueryData<LeadsListResponse>(destKey)
  const limit =
    destData?.meta.limit ??
    queryClient.getQueryData<LeadsListResponse>(
      pipelineColumnQueryKey(workspaceId, destinationColumn, filters)
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
