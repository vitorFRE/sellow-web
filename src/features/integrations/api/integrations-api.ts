import { authorizedFetch } from "@/features/auth/lib/authorized-fetch"
import { getApiBaseUrl } from "@/shared/config/api-base"
import { parseApiJson } from "@/shared/api/parse-api-json"
import type {
  IntegrationRun,
  IntegrationRunsListResponse,
  ListIntegrationRunsParams,
  StartGoogleMapsLeadsRunPayload,
} from "@/features/integrations/types/integration-run"

function unwrapRunResponse(
  parsed: IntegrationRun | { data: IntegrationRun }
): IntegrationRun {
  if ("data" in parsed && parsed.data) return parsed.data
  return parsed as IntegrationRun
}

export async function startGoogleMapsLeadsRun(
  payload: StartGoogleMapsLeadsRunPayload
): Promise<IntegrationRun> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/integrations/google-maps-leads/runs`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  )
  const parsed = await parseApiJson<
    IntegrationRun | { data: IntegrationRun }
  >(res)
  return unwrapRunResponse(parsed)
}

export async function listIntegrationRuns(
  params: ListIntegrationRunsParams = {}
): Promise<IntegrationRunsListResponse> {
  const page = params.page ?? 1
  const limit = params.limit ?? 20
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })
  if (params.status) searchParams.set("status", params.status)
  if (params.type) searchParams.set("type", params.type)

  const res = await authorizedFetch(
    `${getApiBaseUrl()}/integrations/runs?${searchParams}`
  )
  return parseApiJson<IntegrationRunsListResponse>(res)
}

export async function getIntegrationRun(id: string): Promise<IntegrationRun> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/integrations/runs/${id}`
  )
  const parsed = await parseApiJson<
    IntegrationRun | { data: IntegrationRun }
  >(res)
  return unwrapRunResponse(parsed)
}

export async function abortIntegrationRun(id: string): Promise<IntegrationRun> {
  const res = await authorizedFetch(
    `${getApiBaseUrl()}/integrations/runs/${id}/abort`,
    { method: "POST" }
  )
  const parsed = await parseApiJson<
    IntegrationRun | { data: IntegrationRun }
  >(res)
  return unwrapRunResponse(parsed)
}
