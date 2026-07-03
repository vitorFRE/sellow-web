import type { LeadListFilterState } from "@/features/leads/types/lead-list-query"
import type { LeadStatus } from "@/features/leads/types/lead"
import { pipelineFiltersQueryPayload } from "@/features/leads/lib/lead-list-filters"
import { PIPELINE_PAGE_SIZE } from "@/features/pipeline/config/pipeline-columns"
import { businessQueryKey } from "@/features/workspaces/lib/business-query-key"

export const pipelineColumnQueryKey = (
  workspaceId: string,
  status: LeadStatus,
  filters: LeadListFilterState
) =>
  businessQueryKey(workspaceId, "leads", "pipeline", status, {
    page: 1,
    limit: PIPELINE_PAGE_SIZE,
    ...pipelineFiltersQueryPayload(filters),
  })

export const pipelineBusinessPrefix = (workspaceId: string) =>
  businessQueryKey(workspaceId, "leads", "pipeline")
