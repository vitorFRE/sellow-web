import { businessQueryKey } from "@/features/workspaces/lib/business-query-key"

export const leadNotesQueryKey = (workspaceId: string, leadId: string) =>
  businessQueryKey(workspaceId, "leads", "detail", leadId, "notes")

export const leadFollowUpQueryKey = (workspaceId: string, leadId: string) =>
  businessQueryKey(workspaceId, "leads", "detail", leadId, "follow-up")
