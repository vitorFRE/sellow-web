import { useQueries } from "@tanstack/react-query"

import { listLeads } from "@/features/leads/api/leads-api"
import type {
  Lead,
  LeadStatus,
  LeadsListMeta,
  LeadsListResponse,
} from "@/features/leads/types/lead"
import {
  PIPELINE_PAGE_SIZE,
  PIPELINE_STATUSES,
} from "@/features/pipeline/config/pipeline-columns"
import { pipelineColumnQueryKey } from "@/features/pipeline/queries/pipeline-query-keys"

export function usePipelineBoardQueries() {
  const queries = useQueries({
    queries: PIPELINE_STATUSES.map((status) => ({
      queryKey: pipelineColumnQueryKey(status),
      queryFn: () =>
        listLeads({ page: 1, limit: PIPELINE_PAGE_SIZE, status }),
      placeholderData: (previousData: LeadsListResponse | undefined) =>
        previousData,
    })),
  })

  const byStatus = PIPELINE_STATUSES.reduce(
    (acc, status, i) => {
      acc[status] = queries[i]?.data?.data ?? []
      return acc
    },
    {} as Record<LeadStatus, Lead[]>
  )

  const metaByStatus = PIPELINE_STATUSES.reduce(
    (acc, status, i) => {
      acc[status] = queries[i]?.data?.meta
      return acc
    },
    {} as Record<LeadStatus, LeadsListMeta | undefined>
  )

  const isError = queries.some((q) => q.isError)
  const error = queries.find((q) => q.error)?.error

  return { byStatus, metaByStatus, isError, error, queries }
}
