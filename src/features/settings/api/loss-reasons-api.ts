import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import { getApiBaseUrl } from "@/shared/config/api-base"
import { parseApiJson } from "@/shared/api/parse-api-json"
import type { LossReason } from "@/features/settings/types/loss-reason"

export async function listLossReasons(): Promise<LossReason[]> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/loss-reasons`)
  return parseApiJson<LossReason[]>(res)
}

export type CreateLossReasonBody = {
  name: string
  description?: string | null
}

export async function createLossReason(
  body: CreateLossReasonBody
): Promise<LossReason> {
  const payload: { name: string; description?: string } = { name: body.name }
  if (body.description != null && body.description !== "") {
    payload.description = body.description
  }
  const res = await authorizedFetch(`${getApiBaseUrl()}/loss-reasons/create`, {
    method: "POST",
    body: JSON.stringify(payload),
  })
  return parseApiJson<LossReason>(res)
}

export type PatchLossReasonBody = {
  name?: string
  description?: string | null
}

export async function patchLossReason(
  id: string,
  body: PatchLossReasonBody
): Promise<LossReason> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/loss-reasons/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
  return parseApiJson<LossReason>(res)
}

export async function deleteLossReason(id: string): Promise<string> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/loss-reasons/${id}`, {
    method: "DELETE",
  })
  const data = await parseApiJson<{ data: string }>(res)
  return data.data
}
