import { businessQueryKey } from "@/features/workspaces/lib/business-query-key"

export const lossReasonsQueryKey = (workspaceId: string) =>
  businessQueryKey(workspaceId, "loss-reasons")

export const workspaceUsersQueryKey = (workspaceId: string, page: number) =>
  businessQueryKey(workspaceId, "users", page)

export const workspacesAdminQueryKey = () =>
  ["workspaces", "admin-list"] as const
