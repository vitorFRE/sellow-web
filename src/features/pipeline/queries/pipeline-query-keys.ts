import type { LeadListFilterState } from "@/features/leads/types/lead-list-query"
import type { LeadStatus } from "@/features/leads/types/lead"
import { pipelineFiltersQueryPayload } from "@/features/leads/lib/lead-list-filters"
import { PIPELINE_PAGE_SIZE } from "@/features/pipeline/config/pipeline-columns"

export const pipelineColumnQueryKey = (
  status: LeadStatus,
  filters: LeadListFilterState
) =>
  [
    "leads",
    "pipeline",
    status,
    {
      page: 1,
      limit: PIPELINE_PAGE_SIZE,
      ...pipelineFiltersQueryPayload(filters),
    },
  ] as const
