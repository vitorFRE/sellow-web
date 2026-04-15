import { HttpError } from "@/features/auth/api/auth-api"
import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import { getApiBaseUrl } from "@/shared/config/api-base"
import type { LossReason } from "@/features/settings/types/loss-reason"

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

export async function listLossReasons(): Promise<LossReason[]> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/loss-reasons`)
  return parseJson<LossReason[]>(res)
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
  return parseJson<LossReason>(res)
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
  return parseJson<LossReason>(res)
}

export async function deleteLossReason(id: string): Promise<string> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/loss-reasons/${id}`, {
    method: "DELETE",
  })
  const data = await parseJson<{ data: string }>(res)
  return data.data
}
