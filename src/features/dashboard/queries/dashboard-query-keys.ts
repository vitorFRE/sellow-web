import { businessQueryKey } from "@/features/workspaces/lib/business-query-key"

export const dashboardOverviewQueryKey = (workspaceId: string) =>
  businessQueryKey(workspaceId, "dashboard", "overview")
