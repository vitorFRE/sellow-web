import { HttpError } from "@/features/auth/api/auth-api"
import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import { getApiBaseUrl } from "@/shared/config/api-base"

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

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Erro ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch {
      // ignora
    }
    throw new HttpError(res.status, message)
  }
  return res.json() as Promise<T>
}

export async function getLeadNotes(leadId: string): Promise<LeadNotes> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/leads/${leadId}/notes`
  )
  return parseJson<LeadNotes>(res)
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
  return parseJson<LeadNotes>(res)
}

export async function getLeadFollowUp(
  leadId: string
): Promise<LeadFollowUpResponse | null> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/leads/${leadId}/follow-up`
  )
  return parseJson<LeadFollowUpResponse | null>(res)
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
  return parseJson<LeadFollowUpResponse>(res)
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

  // Sucesso: o backend pode devolver 200 com corpo vazio, `null` em JSON ou só `null`.
  // `parseJson` + `res.json()` quebram em corpo vazio — aqui não exigimos JSON no OK.
  return null
}
