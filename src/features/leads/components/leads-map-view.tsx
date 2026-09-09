import * as React from "react"
import { IconMapPin } from "@tabler/icons-react"

import {
  Map,
  MapControls,
  MapMarker,
  MapPopup,
  MarkerContent,
  MarkerTooltip,
  useMap,
} from "@/components/ui/map"
import { LeadMapPopup } from "@/features/leads/components/lead-map-popup"
import { LeadsMapList } from "@/features/leads/components/leads-map-list"
import {
  getLeadCoordinates,
  leadHasCoordinates,
} from "@/features/leads/lib/lead-coordinates"
import type { Lead } from "@/features/leads/types/lead"
import { cn } from "@/lib/utils"

type Props = {
  leads: Lead[]
  isLoading?: boolean
  canWriteLeads?: boolean
  canDeleteLeads?: boolean
  promotingLeadId?: string | null
  deletingLeadId?: string | null
  onPromoteToPipeline?: (id: string) => void
  onDeleteLead?: (id: string) => void
  className?: string
}

function LeadPin({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-background transition-transform",
        active
          ? "size-9 scale-110 bg-foreground text-background"
          : "size-7 bg-[#1F6C9F] text-white hover:scale-105"
      )}
    >
      <IconMapPin
        className={cn(active ? "size-4" : "size-3.5")}
        aria-hidden
      />
    </div>
  )
}

function FlyToSelected({
  lat,
  lng,
  selectedId,
}: {
  lat: number
  lng: number
  selectedId: string
}) {
  const { map, isLoaded } = useMap()
  const lastIdRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!isLoaded || !map) return
    if (lastIdRef.current === selectedId) return
    lastIdRef.current = selectedId

    map.flyTo({
      center: [lng, lat],
      zoom: 14,
      duration: 800,
    })
  }, [isLoaded, lat, lng, map, selectedId])

  return null
}

export function LeadsMapView({
  leads,
  isLoading,
  canWriteLeads,
  canDeleteLeads,
  promotingLeadId,
  deletingLeadId,
  onPromoteToPipeline,
  onDeleteLead,
  className,
}: Props) {
  const mappableLeads = React.useMemo(
    () => leads.filter(leadHasCoordinates),
    [leads]
  )

  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (mappableLeads.length === 0) {
      setSelectedId(null)
      return
    }
    setSelectedId((current) => {
      if (current && mappableLeads.some((lead) => lead.id === current)) {
        return current
      }
      return mappableLeads[0]?.id ?? null
    })
  }, [mappableLeads])

  const points = React.useMemo(
    () =>
      mappableLeads
        .map((lead) => {
          const coords = getLeadCoordinates(lead)
          return coords ? { id: lead.id, ...coords } : null
        })
        .filter(
          (p): p is { id: string; lat: number; lng: number } => p != null
        ),
    [mappableLeads]
  )

  const selectedLead = React.useMemo(() => {
    if (!selectedId) return null
    return mappableLeads.find((lead) => lead.id === selectedId) ?? null
  }, [mappableLeads, selectedId])

  const selectedCoords = selectedLead
    ? getLeadCoordinates(selectedLead)
    : null

  const withoutCoords = leads.length - mappableLeads.length
  const mapCenter: [number, number] = points[0]
    ? [points[0].lng, points[0].lat]
    : [-46.6333, -23.5505]

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex h-[32rem] items-center justify-center rounded-xl border border-border text-sm text-stat-muted",
          className
        )}
      >
        Carregando mapa…
      </div>
    )
  }

  if (mappableLeads.length === 0) {
    return (
      <div
        className={cn(
          "flex h-[32rem] flex-col items-center justify-center gap-2 rounded-xl border border-border px-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-stat-value">
          Nenhum lead com coordenadas
        </p>
        <p className="max-w-sm text-xs leading-relaxed text-stat-muted">
          Importe leads do Google Maps com latitude e longitude para vê-los no
          mapa.
        </p>
        {withoutCoords > 0 ? (
          <p className="text-xs text-stat-muted">
            {withoutCoords} lead(s) nesta página sem coordenadas.
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex h-[min(70vh,40rem)] min-h-[28rem] overflow-hidden rounded-xl border border-border bg-card md:flex-row">
        <LeadsMapList
          leads={mappableLeads}
          selectedId={selectedId}
          onSelect={setSelectedId}
          className="max-h-56 border-b md:max-h-none md:border-b-0"
        />

        <div className="relative min-h-0 min-w-0 flex-1">
          <Map
            className="h-full w-full"
            center={mapCenter}
            zoom={11}
            attributionControl={false}
          >
            {selectedCoords && selectedId ? (
              <FlyToSelected
                lat={selectedCoords.lat}
                lng={selectedCoords.lng}
                selectedId={selectedId}
              />
            ) : null}

            {mappableLeads.map((lead) => {
              const coords = getLeadCoordinates(lead)
              if (!coords) return null
              const active = lead.id === selectedId
              return (
                <MapMarker
                  key={lead.id}
                  longitude={coords.lng}
                  latitude={coords.lat}
                  onClick={() => setSelectedId(lead.id)}
                >
                  <MarkerContent>
                    <LeadPin active={active} />
                  </MarkerContent>
                  <MarkerTooltip
                    offset={24}
                    className="border-border bg-foreground text-background shadow-none"
                  >
                    {lead.name}
                  </MarkerTooltip>
                </MapMarker>
              )
            })}

            {selectedLead && selectedCoords ? (
              <MapPopup
                longitude={selectedCoords.lng}
                latitude={selectedCoords.lat}
                offset={28}
                closeButton
                closeOnClick={false}
                onClose={() => setSelectedId(null)}
                className="max-w-none border-border bg-card p-3 shadow-none"
              >
                <LeadMapPopup
                  lead={selectedLead}
                  canWriteLeads={canWriteLeads}
                  canDeleteLeads={canDeleteLeads}
                  promotingLeadId={promotingLeadId}
                  deletingLeadId={deletingLeadId}
                  onPromoteToPipeline={onPromoteToPipeline}
                  onDeleteLead={onDeleteLead}
                />
              </MapPopup>
            ) : null}

            <MapControls position="bottom-right" showZoom />
          </Map>
        </div>
      </div>

      {withoutCoords > 0 ? (
        <p className="text-xs text-stat-muted">
          {mappableLeads.length} no mapa · {withoutCoords} sem coordenadas nesta
          página
        </p>
      ) : null}
    </div>
  )
}
