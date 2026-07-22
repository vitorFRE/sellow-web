import type { Lead } from "@/features/leads/types/lead"

export type LeadCoordinates = {
  lat: number
  lng: number
}

export function getLeadCoordinates(lead: Lead): LeadCoordinates | null {
  const lat = lead.latitude
  const lng = lead.longitude
  if (typeof lat !== "number" || typeof lng !== "number") return null
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null
  return { lat, lng }
}

export function leadHasCoordinates(lead: Lead): boolean {
  return getLeadCoordinates(lead) != null
}
