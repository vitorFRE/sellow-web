import type { LeadFollowUpView } from "@/features/lead-detail/types/lead-detail-view"

/** Estado inicial ao agendar um follow-up novo (sem API). */
export const EMPTY_FOLLOW_UP: LeadFollowUpView = {
  nextContactAt: "",
  channel: "WhatsApp",
  ownerLabel: "",
  reminder: undefined,
}

/** Há algo a mostrar no card (data, lembrete ou responsável definido). */
export function hasFollowUpContent(f: LeadFollowUpView): boolean {
  return Boolean(
    f.nextContactAt.trim() || (f.reminder ?? "").trim() || f.ownerLabel.trim()
  )
}

export const FOLLOW_UP_CHANNELS: LeadFollowUpView["channel"][] = [
  "WhatsApp",
  "Ligação",
  "E-mail",
  "Visita",
]

export function isFollowUpDirty(a: LeadFollowUpView, b: LeadFollowUpView) {
  return (
    a.nextContactAt !== b.nextContactAt ||
    a.channel !== b.channel ||
    a.ownerLabel !== b.ownerLabel ||
    (a.reminder ?? "") !== (b.reminder ?? "")
  )
}
