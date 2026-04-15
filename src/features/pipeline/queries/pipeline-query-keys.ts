import type { LeadStatus } from "@/features/leads/types/lead"

import { PIPELINE_PAGE_SIZE } from "@/features/pipeline/config/pipeline-columns"

export const pipelineColumnQueryKey = (status: LeadStatus) =>
  [
    "leads",
    "pipeline",
    status,
    { page: 1, limit: PIPELINE_PAGE_SIZE },
  ] as const
