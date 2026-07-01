import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import { getApiBaseUrl } from "@/shared/config/api-base"
import { HttpError } from "@/shared/api/http-error"
import { parseApiJson } from "@/shared/api/parse-api-json"

export type LeadNotes = {
  body: string
}

export type LeadFollowUpChannel = "WhatsApp" | "Ligação" | "E-mail" | "Visita"

export type LeadFollowUpResponse = {
  nextContactAt: string
  channel: LeadFollowUpChannel
  ownerLabel: string
  reminder: string | null
}

export type LeadFollowUpInput = {
  nextContactAt: string
  channel: LeadFollowUpChannel
  ownerLabel: string
  reminder?: string
}

export async function getLeadNotes(leadId: string): Promise<LeadNotes> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/leads/${leadId}/notes`
  )
  return parseApiJson<LeadNotes>(res)
}

export async function putLeadNotes(
  leadId: string,
  body: string
): Promise<LeadNotes> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/leads/${leadId}/notes`,
    {
      method: "PUT",
      body: JSON.stringify({ body }),
    }
  )
  return parseApiJson<LeadNotes>(res)
}

export async function getLeadFollowUp(
  leadId: string
): Promise<LeadFollowUpResponse | null> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/leads/${leadId}/follow-up`
  )
  return parseApiJson<LeadFollowUpResponse | null>(res)
}

export async function putLeadFollowUp(
  leadId: string,
  input: LeadFollowUpInput
): Promise<LeadFollowUpResponse> {
  const payload: Record<string, unknown> = {
    nextContactAt: input.nextContactAt,
    channel: input.channel,
    ownerLabel: input.ownerLabel,
  }
  if (input.reminder != null && input.reminder.trim() !== "") {
    payload.reminder = input.reminder
  }
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/leads/${leadId}/follow-up`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  )
  return parseApiJson<LeadFollowUpResponse>(res)
}

export async function deleteLeadFollowUp(leadId: string): Promise<null> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/leads/${leadId}/follow-up`,
    {
      method: "DELETE",
    }
  )
  const text = await res.text()

  if (!res.ok) {
    let message = `Erro ${res.status}`
    try {
      const body = text.trim() ? (JSON.parse(text) as { message?: string }) : null
      if (body?.message) message = body.message
    } catch {
      // ignora parse
    }
    throw new HttpError(res.status, message)
  }

  return null
}
