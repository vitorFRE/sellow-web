export type GeocodePlace = {
  id: string
  label: string
  lat: number
  lng: number
}

type NominatimResult = {
  place_id: number
  lat: string
  lon: string
  display_name: string
  type?: string
  class?: string
}

/**
 * Busca lugares via Nominatim (OpenStreetMap). Sem API key.
 * Uso leve no cliente; debounce no caller.
 */
export async function searchPlaces(
  query: string,
  signal?: AbortSignal
): Promise<GeocodePlace[]> {
  const trimmed = query.trim()
  if (trimmed.length < 2) return []

  const params = new URLSearchParams({
    q: trimmed,
    format: "json",
    addressdetails: "0",
    limit: "6",
    countrycodes: "br",
  })

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?${params}`,
    {
      signal,
      headers: {
        Accept: "application/json",
      },
    }
  )

  if (!res.ok) {
    throw new Error("Não foi possível buscar o lugar.")
  }

  const data = (await res.json()) as NominatimResult[]

  return data
    .map((item) => {
      const lat = Number(item.lat)
      const lng = Number(item.lon)
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
      return {
        id: String(item.place_id),
        label: item.display_name,
        lat,
        lng,
      } satisfies GeocodePlace
    })
    .filter((item): item is GeocodePlace => item != null)
}
