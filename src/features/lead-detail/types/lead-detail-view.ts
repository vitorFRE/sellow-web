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

export type LeadSiteProjectView = {
  sitePackageLabel: string
  sitePitchLine: string
  siteScopeBullets: string[]
  siteDeliverablesNote: string
  siteStackNote: string
}

export type LeadDetailView = {
  headline: string
  pipelineStageLabel: string
  temperatureLabel: "Frio" | "Morno" | "Quente"
  sitePackageLabel: string
  sitePitchLine: string
  siteScopeBullets: string[]
  siteDeliverablesNote: string
  siteStackNote: string
  activity: LeadActivityLogItem[]
  notes: string[]
  followUp: LeadFollowUpView
}
