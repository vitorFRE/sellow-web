/** Approximate Earth radius in meters (WGS84 mean). */
const EARTH_RADIUS_M = 6_371_008.8

/**
 * Builds a GeoJSON polygon approximating a geodesic circle.
 * Coordinates are [longitude, latitude] (GeoJSON order).
 */
export function buildCirclePolygon(
  lng: number,
  lat: number,
  radiusMeters: number,
  steps = 64
): GeoJSON.Feature<GeoJSON.Polygon, { id: string }> {
  const coords: [number, number][] = []
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180
  const angularDistance = radiusMeters / EARTH_RADIUS_M

  for (let i = 0; i <= steps; i++) {
    const bearing = (i / steps) * 2 * Math.PI
    const lat2 = Math.asin(
      Math.sin(latRad) * Math.cos(angularDistance) +
        Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(bearing)
    )
    const lng2 =
      lngRad +
      Math.atan2(
        Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latRad),
        Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(lat2)
      )
    coords.push([(lng2 * 180) / Math.PI, (lat2 * 180) / Math.PI])
  }

  return {
    type: "Feature",
    properties: { id: "search-radius" },
    geometry: {
      type: "Polygon",
      coordinates: [coords],
    },
  }
}

/** Rough zoom so the radius circle fits the map viewport. */
export function zoomForRadiusMeters(radiusMeters: number): number {
  if (radiusMeters <= 500) return 14.2
  if (radiusMeters <= 1000) return 13.4
  if (radiusMeters <= 3000) return 12.2
  if (radiusMeters <= 5000) return 11.6
  if (radiusMeters <= 10_000) return 10.8
  if (radiusMeters <= 25_000) return 9.8
  return 8.8
}
