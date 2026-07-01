import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import { getApiBaseUrl } from "@/shared/config/api-base"
import { parseApiJson } from "@/shared/api/parse-api-json"
import type {
  Lead,
  LeadStatus,
  LeadsListResponse,
} from "@/features/leads/types/lead"
import type {
  LeadSortBy,
  LeadSortDir,
} from "@/features/leads/types/lead-list-query"
import type { CreateLeadRequestBody } from "@/features/leads/lib/build-create-lead-body"
import type {
  GoogleMapsImportPayload,
  GoogleMapsImportResult,
} from "@/features/leads/types/google-maps-import"

function unwrapLeadResponse(parsed: Lead | { data: Lead }): Lead {
  if ("data" in parsed && parsed.data) return parsed.data
  return parsed as Lead
}

export type ListLeadsParams = {
  page?: number
  limit?: number
  status?: LeadStatus
  /** Máx. 200 caracteres no backend; o cliente pode trimar antes. */
  search?: string
  minTotalScore?: number
  minReviewsCount?: number
  hasWebsite?: boolean
  sortBy?: LeadSortBy
  sortDir?: LeadSortDir
}

export async function listLeads(
  params: ListLeadsParams = {}
): Promise<LeadsListResponse> {
  const page = params.page ?? 1
  const limit = params.limit ?? 20
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })
  if (params.status != null) {
    searchParams.set("status", params.status)
  }
  const q = params.search?.trim()
  if (q) {
    searchParams.set("search", q.slice(0, 200))
  }
  if (params.minTotalScore != null) {
    searchParams.set("minTotalScore", String(params.minTotalScore))
  }
  if (params.minReviewsCount != null) {
    searchParams.set("minReviewsCount", String(params.minReviewsCount))
  }
  if (params.hasWebsite === true) {
    searchParams.set("hasWebsite", "true")
  }
  if (params.hasWebsite === false) {
    searchParams.set("hasWebsite", "false")
  }
  const sortBy = params.sortBy ?? "updatedAt"
  const sortDir = params.sortDir ?? "desc"
  searchParams.set("sortBy", sortBy)
  searchParams.set("sortDir", sortDir)

  const res = await authorizedFetch(
    `${getApiBaseUrl()}/leads?${searchParams}`
  )
  return parseApiJson<LeadsListResponse>(res)
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
  const parsed = await parseApiJson<Lead | { data: Lead }>(res)
  return unwrapLeadResponse(parsed)
}

export async function deleteLead(id: string): Promise<string> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/leads/delete/${id}`, {
    method: "DELETE",
  })
  const body = await parseApiJson<{ data: string }>(res)
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
  return parseApiJson<GoogleMapsImportResult>(res)
}

export async function createLead(body: CreateLeadRequestBody): Promise<Lead> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/leads/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const parsed = await parseApiJson<Lead | { data: Lead }>(res)
  return unwrapLeadResponse(parsed)
}
