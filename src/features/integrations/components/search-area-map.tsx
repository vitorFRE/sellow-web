import * as React from "react"
import { useEffectEvent } from "react"
import type { MapMouseEvent } from "maplibre-gl"

import {
  Map,
  MapControls,
  MapGeoJSON,
  MapMarker,
  MarkerContent,
  useMap,
} from "@/components/ui/map"
import {
  buildCirclePolygon,
  zoomForRadiusMeters,
} from "@/features/integrations/lib/circle-polygon"
import { formatRadiusMeters } from "@/features/integrations/lib/format-run-input"
import { cn } from "@/lib/utils"

const RADIUS_PRESETS = [
  { label: "500 m", value: 500 },
  { label: "1 km", value: 1000 },
  { label: "3 km", value: 3000 },
  { label: "5 km", value: 5000 },
  { label: "10 km", value: 10_000 },
  { label: "25 km", value: 25_000 },
] as const

type Props = {
  lat: number
  lng: number
  radiusMeters: number
  recenterKey?: number
  disabled?: boolean
  onCenterChange: (lat: number, lng: number) => void
  onRadiusChange: (radiusMeters: number) => void
  toolbar?: React.ReactNode
  className?: string
}

function MapPickCenter({
  disabled,
  onPick,
}: {
  disabled?: boolean
  onPick: (lat: number, lng: number) => void
}) {
  const { map, isLoaded } = useMap()
  const handlePick = useEffectEvent(onPick)

  React.useEffect(() => {
    if (!isLoaded || disabled) return

    const onClick = (event: MapMouseEvent) => {
      handlePick(event.lngLat.lat, event.lngLat.lng)
    }

    map.getCanvas().style.cursor = "crosshair"
    map.on("click", onClick)
    return () => {
      map.getCanvas().style.cursor = ""
      map.off("click", onClick)
    }
  }, [disabled, isLoaded, map])

  return null
}

function MapFitToRadius({
  lat,
  lng,
  radiusMeters,
}: {
  lat: number
  lng: number
  radiusMeters: number
}) {
  const { map, isLoaded } = useMap()
  const prevRadiusRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (!isLoaded) return
    if (prevRadiusRef.current === radiusMeters) return
    prevRadiusRef.current = radiusMeters

    map.flyTo({
      center: [lng, lat],
      zoom: zoomForRadiusMeters(radiusMeters),
      duration: 650,
    })
  }, [isLoaded, lat, lng, map, radiusMeters])

  return null
}

function MapRecenter({
  lat,
  lng,
  radiusMeters,
  recenterKey = 0,
}: {
  lat: number
  lng: number
  radiusMeters: number
  recenterKey?: number
}) {
  const { map, isLoaded } = useMap()
  const lastKeyRef = React.useRef(0)

  React.useEffect(() => {
    if (!isLoaded || recenterKey === 0) return
    if (lastKeyRef.current === recenterKey) return
    lastKeyRef.current = recenterKey

    map.flyTo({
      center: [lng, lat],
      zoom: zoomForRadiusMeters(radiusMeters),
      duration: 900,
    })
  }, [isLoaded, lat, lng, map, radiusMeters, recenterKey])

  return null
}

export function SearchAreaMap({
  lat,
  lng,
  radiusMeters,
  recenterKey = 0,
  disabled,
  onCenterChange,
  onRadiusChange,
  toolbar,
  className,
}: Props) {
  const circleData = React.useMemo(
    () => buildCirclePolygon(lng, lat, radiusMeters),
    [lat, lng, radiusMeters]
  )

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card",
        className
      )}
    >
      {toolbar ? (
        <div className="relative z-30 flex flex-wrap items-center gap-2 border-b border-border px-3 py-2.5">
          {toolbar}
        </div>
      ) : null}

      <div className="relative overflow-hidden">
        <Map className="h-72 w-full sm:h-[22rem]" attributionControl={false}>
          <MapPickCenter
            disabled={disabled}
            onPick={(nextLat, nextLng) => onCenterChange(nextLat, nextLng)}
          />
          <MapFitToRadius lat={lat} lng={lng} radiusMeters={radiusMeters} />
          <MapRecenter
            lat={lat}
            lng={lng}
            radiusMeters={radiusMeters}
            recenterKey={recenterKey}
          />
          <MapGeoJSON
            id="search-radius"
            promoteId="id"
            data={circleData}
            fillPaint={{
              "fill-color": "#1F6C9F",
              "fill-opacity": 0.18,
            }}
            linePaint={{
              "line-color": "#1F6C9F",
              "line-width": 1.5,
              "line-opacity": 0.75,
            }}
          />
          <MapMarker
            longitude={lng}
            latitude={lat}
            draggable={!disabled}
            onDragEnd={({ lat: nextLat, lng: nextLng }) => {
              onCenterChange(nextLat, nextLng)
            }}
          >
            <MarkerContent>
              <span className="relative flex size-4 items-center justify-center">
                <span className="absolute size-4 rounded-full bg-[#1F6C9F]/30" />
                <span className="relative size-2.5 rounded-full border-2 border-white bg-[#1F6C9F]" />
              </span>
            </MarkerContent>
          </MapMarker>
          <MapControls
            position="bottom-right"
            showZoom
            showLocate={!disabled}
            onLocate={({ latitude, longitude }) => {
              onCenterChange(latitude, longitude)
            }}
          />
        </Map>

        <div className="pointer-events-none absolute inset-x-0 top-0 px-3 py-2">
          <p className="inline-block rounded-md border border-border/70 bg-background/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] text-stat-muted uppercase">
            Clique ou arraste o marcador
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-[10px] font-medium tracking-[0.08em] text-stat-muted uppercase">
            Raio
          </span>
          <span className="font-mono text-xs tabular-nums text-stat-value">
            {formatRadiusMeters(radiusMeters)}
          </span>
        </div>
        <div
          role="group"
          aria-label="Presets de raio"
          className="flex flex-wrap gap-1.5"
        >
          {RADIUS_PRESETS.map((preset) => {
            const selected = radiusMeters === preset.value
            return (
              <button
                key={preset.value}
                type="button"
                disabled={disabled}
                className={cn(
                  "rounded-md border px-2 py-1 text-[11px] font-medium transition-colors",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-transparent text-stat-muted hover:text-stat-value"
                )}
                onClick={() => onRadiusChange(preset.value)}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
