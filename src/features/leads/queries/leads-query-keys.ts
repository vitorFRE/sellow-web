import { businessQueryKey } from "@/features/workspaces/lib/business-query-key"

export const leadsListQueryKey = (workspaceId: string) =>
  businessQueryKey(workspaceId, "leads", "list")

export const leadsBusinessPrefix = (workspaceId: string) =>
  businessQueryKey(workspaceId, "leads")
