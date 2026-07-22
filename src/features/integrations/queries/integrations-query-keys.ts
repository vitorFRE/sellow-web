import { businessQueryKey } from "@/features/workspaces/lib/business-query-key"
import type {
  IntegrationRunStatus,
  IntegrationType,
} from "@/features/integrations/types/integration-run"

export const integrationsBusinessPrefix = (workspaceId: string) =>
  businessQueryKey(workspaceId, "integrations")

export const integrationRunsListQueryKey = (
  workspaceId: string,
  params: {
    page?: number
    limit?: number
    status?: IntegrationRunStatus
    type?: IntegrationType
  } = {}
) => businessQueryKey(workspaceId, "integrations", "runs", "list", params)

export const integrationRunDetailQueryKey = (
  workspaceId: string,
  runId: string
) => businessQueryKey(workspaceId, "integrations", "runs", "detail", runId)
