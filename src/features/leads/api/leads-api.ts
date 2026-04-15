import { HttpError } from "@/features/auth/api/auth-api"
import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import { getApiBaseUrl } from "@/shared/config/api-base"
import type {
  Lead,
  LeadStatus,
  LeadsListResponse,
} from "@/features/leads/types/lead"
import type { CreateLeadRequestBody } from "@/features/leads/lib/build-create-lead-body"
import type {
  GoogleMapsImportPayload,
  GoogleMapsImportResult,
} from "@/features/leads/types/google-maps-import"

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

export type ListLeadsParams = {
  page?: number
  limit?: number
  status?: LeadStatus
}

export async function listLeads(
  params: ListLeadsParams = {}
): Promise<LeadsListResponse> {
  const page = params.page ?? 1
  const limit = params.limit ?? 20
  const search = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })
  if (params.status != null) {
    search.set("status", params.status)
  }
  const res = await authorizedFetch(`${getApiBaseUrl()}/leads?${search}`)
  return parseJson<LeadsListResponse>(res)
}

export type UpdateLeadStatusBody = {
  status: LeadStatus
  lossReasonId?: string | null
  lossReasonNote?: string | null
}

export async function updateLeadStatus(
  id: string,
  body: UpdateLeadStatusBody
): Promise<Lead> {
  const payload: Record<string, unknown> = { status: body.status }
  if (body.status === "LOST") {
    if (body.lossReasonId) payload.lossReasonId = body.lossReasonId
    if (
      body.lossReasonNote != null &&
      String(body.lossReasonNote).trim() !== ""
    ) {
      payload.lossReasonNote = String(body.lossReasonNote).trim()
    }
  }
  const res = await authorizedFetch(`${getApiBaseUrl()}/leads/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  })
  const parsed = await parseJson<Lead | { data: Lead }>(res)
  return "data" in parsed && parsed.data ? parsed.data : (parsed as Lead)
}

export async function deleteLead(id: string): Promise<string> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/leads/delete/${id}`, {
    method: "DELETE",
  })
  const body = await parseJson<{ data: string }>(res)
  return body.data
}

export async function importGoogleMapsLeads(
  payload: GoogleMapsImportPayload
): Promise<GoogleMapsImportResult> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/leads/import/google-maps`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  )
  return parseJson<GoogleMapsImportResult>(res)
}

export async function createLead(body: CreateLeadRequestBody): Promise<Lead> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/leads/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const parsed = await parseJson<Lead | { data: Lead }>(res)
  return "data" in parsed && parsed.data ? parsed.data : (parsed as Lead)
}
