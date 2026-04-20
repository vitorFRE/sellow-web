import { HttpError } from "@/features/auth/api/auth-api"
import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import type { DashboardOverviewResponse } from "@/features/dashboard/types/dashboard-overview"
import { getApiBaseUrl } from "@/shared/config/api-base"

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

export async function getDashboardOverview(): Promise<DashboardOverviewResponse> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/dashboard`)
  return parseJson<DashboardOverviewResponse>(res)
}
