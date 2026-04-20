import type {
  LeadFollowUpInput,
  LeadFollowUpResponse,
} from "@/features/lead-detail/api/lead-detail-api"
import { FOLLOW_UP_CHANNELS } from "@/features/lead-detail/lib/follow-up-form-utils"
import type { LeadFollowUpView } from "@/features/lead-detail/types/lead-detail-view"

export function followUpResponseToView(
  res: LeadFollowUpResponse
): LeadFollowUpView {
  return {
    nextContactAt: res.nextContactAt,
    channel: res.channel,
    ownerLabel: res.ownerLabel,
    reminder: res.reminder ?? undefined,
  }
}

export function followUpViewToInput(view: LeadFollowUpView): LeadFollowUpInput {
  const reminder = view.reminder?.trim()
  return {
    nextContactAt: view.nextContactAt,
    channel: view.channel,
    ownerLabel: view.ownerLabel.trim(),
    reminder: reminder ? reminder : undefined,
  }
}

/** Valida o draft no cliente antes do PUT (a API também valida e retorna 400). */
export function validateFollowUpDraft(draft: LeadFollowUpView): string | null {
  const when = draft.nextContactAt.trim()
  if (!when) return "Informe data e hora do próximo contato."
  const parsed = new Date(when)
  if (Number.isNaN(parsed.getTime())) {
    return "Data do próximo contato inválida."
  }
  if (!FOLLOW_UP_CHANNELS.includes(draft.channel)) {
    return "Canal inválido."
  }
  const owner = draft.ownerLabel.trim()
  if (!owner) return "Informe o responsável pelo contato."
  if (owner.length > 500) {
    return "Responsável deve ter no máximo 500 caracteres."
  }
  const reminder = draft.reminder?.trim() ?? ""
  if (reminder.length > 500) {
    return "Lembrete deve ter no máximo 500 caracteres."
  }
  return null
}
