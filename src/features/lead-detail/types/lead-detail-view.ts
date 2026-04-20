export type LeadActivityKind =
  | "status"
  | "call"
  | "email"
  | "meeting"
  | "note"
  | "system"

export type LeadActivityLogItem = {
  id: string
  at: string
  title: string
  detail?: string
  kind: LeadActivityKind
}

export type LeadFollowUpView = {
  nextContactAt: string
  channel: "WhatsApp" | "Ligação" | "E-mail" | "Visita"
  ownerLabel: string
  reminder?: string
}
