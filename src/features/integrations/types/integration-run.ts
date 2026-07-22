export type IntegrationProvider = "APIFY"

export type IntegrationType = "GOOGLE_MAPS_LEADS"

export type IntegrationRunStatus =
  | "PENDING"
  | "RUNNING"
  | "IMPORTING"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "FAILED"
  | "ABORTED"
  | "TIMED_OUT"

export type IntegrationImportSummary = {
  itemCount: number
  created: number
  updated: number
  skipped: number
  failed: number
}

export type GoogleMapsLeadsRunInput = {
  searchQueries: string[]
  lat: number
  lng: number
  radiusMeters: number
  maxResults?: number
}

export type IntegrationRun = {
  id: string
  workspaceId: string
  provider: IntegrationProvider
  type: IntegrationType
  status: IntegrationRunStatus
  externalRunId: string | null
  externalActorId: string | null
  datasetId: string | null
  input: GoogleMapsLeadsRunInput | Record<string, unknown> | null
  importSummary: IntegrationImportSummary | null
  errorMessage: string | null
  startedAt: string | null
  finishedAt: string | null
  createdAt: string
  updatedAt: string
  createdById: string | null
}

export type IntegrationRunsListMeta = {
  total: number
  page: number
  limit: number
  totalPages: number
}

export type IntegrationRunsListResponse = {
  data: IntegrationRun[]
  meta: IntegrationRunsListMeta
}

export type StartGoogleMapsLeadsRunPayload = {
  searchQueries: string[]
  lat: number
  lng: number
  radiusMeters: number
  maxResults?: number
}

export type ListIntegrationRunsParams = {
  page?: number
  limit?: number
  status?: IntegrationRunStatus
  type?: IntegrationType
}
