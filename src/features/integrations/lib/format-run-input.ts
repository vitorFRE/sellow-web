import type { IntegrationRun } from "@/features/integrations/types/integration-run"

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

export function formatRadiusMeters(meters: number): string {
  if (meters >= 1000) {
    const km = meters / 1000
    const formatted = Number.isInteger(km) ? String(km) : km.toFixed(1)
    return `${formatted} km`
  }
  return `${meters} m`
}

export function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
}

export function getRunSearchQueries(
  input: IntegrationRun["input"]
): string[] {
  if (!input || typeof input !== "object") return []
  if (!("searchQueries" in input) || !Array.isArray(input.searchQueries)) {
    return []
  }
  return input.searchQueries.filter((q): q is string => typeof q === "string")
}

export function getRunGeoSummary(input: IntegrationRun["input"]): string | null {
  if (!input || typeof input !== "object") return null
  const lat = "lat" in input ? asNumber(input.lat) : null
  const lng = "lng" in input ? asNumber(input.lng) : null
  const radius =
    "radiusMeters" in input ? asNumber(input.radiusMeters) : null

  if (lat == null || lng == null) return null

  const coords = formatCoordinates(lat, lng)
  if (radius == null) return coords
  return `${coords} · raio ${formatRadiusMeters(radius)}`
}

export function formatRunInputSummary(run: IntegrationRun): string | null {
  const geo = getRunGeoSummary(run.input)
  const queries = getRunSearchQueries(run.input)
  const queryPart = queries.length > 0 ? queries.join(", ") : null

  if (geo && queryPart) return `${geo} · ${queryPart}`
  return geo ?? queryPart
}

export function formatRunListTitle(run: IntegrationRun): string {
  const geo = getRunGeoSummary(run.input)
  const queries = getRunSearchQueries(run.input)

  if (geo && queries.length > 0) {
    const preview = queries.slice(0, 2).join(", ")
    const extra = queries.length > 2 ? ` +${queries.length - 2}` : ""
    return `${geo} · ${preview}${extra}`
  }
  if (geo) return geo
  if (queries.length > 0) return queries.slice(0, 2).join(", ")
  return "Google Maps"
}
