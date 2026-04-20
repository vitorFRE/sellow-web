export const leadNotesQueryKey = (leadId: string) =>
  ["leads", "detail", leadId, "notes"] as const

export const leadFollowUpQueryKey = (leadId: string) =>
  ["leads", "detail", leadId, "follow-up"] as const
