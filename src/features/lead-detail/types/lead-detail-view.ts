export type LeadFollowUpView = {
  nextContactAt: string
  channel: "WhatsApp" | "Ligação" | "E-mail" | "Visita"
  ownerLabel: string
  reminder?: string
}
