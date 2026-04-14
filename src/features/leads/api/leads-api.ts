import { HttpError } from "@/features/auth/api/auth-api"
import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import { getApiBaseUrl } from "@/shared/config/api-base"
import type { LeadsListResponse } from "@/features/leads/types/lead"
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
  const res = await authorizedFetch(`${getApiBaseUrl()}/leads?${search}`)
  return parseJson<LeadsListResponse>(res)
}

export async function deleteLead(id: string): Promise<string> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/leads/delete/${id}`,
    { method: "DELETE" }
  )
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
