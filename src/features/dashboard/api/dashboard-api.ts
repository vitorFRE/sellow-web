import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import type { DashboardOverviewResponse } from "@/features/dashboard/types/dashboard-overview"
import { parseApiJson } from "@/shared/api/parse-api-json"
import { getApiBaseUrl } from "@/shared/config/api-base"

export async function getDashboardOverview(): Promise<DashboardOverviewResponse> {
  const res = await authorizedFetch(`${getApiBaseUrl()}/dashboard`)
  return parseApiJson<DashboardOverviewResponse>(res)
}
