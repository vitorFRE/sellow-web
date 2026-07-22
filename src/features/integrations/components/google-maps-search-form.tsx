import * as React from "react"
import { IconCurrentLocation, IconPlus, IconX } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlaceSearchField } from "@/features/integrations/components/place-search-field"
import { SearchAreaMap } from "@/features/integrations/components/search-area-map"
import { formatRadiusMeters } from "@/features/integrations/lib/format-run-input"
import { cn } from "@/lib/utils"

const MAX_QUERIES = 10
const MIN_QUERY_LEN = 2
const MAX_QUERY_LEN = 200
const DEFAULT_MAX_RESULTS = 50
const DEFAULT_RADIUS_METERS = 3000
const MIN_RADIUS_METERS = 100
const MAX_RADIUS_METERS = 50_000
/** São Paulo — fallback visual até o usuário escolher o centro. */
const DEFAULT_LAT = -23.5505
const DEFAULT_LNG = -46.6333

export type GoogleMapsSearchFormValues = {
  lat: number
  lng: number
  radiusMeters: number
  searchQueries: string[]
  maxResults: number
}

type Props = {
  disabled?: boolean
  isPending?: boolean
  onSubmit: (values: GoogleMapsSearchFormValues) => void
  className?: string
}

export function GoogleMapsSearchForm({
  disabled,
  isPending,
  onSubmit,
  className,
}: Props) {
  const [lat, setLat] = React.useState(DEFAULT_LAT)
  const [lng, setLng] = React.useState(DEFAULT_LNG)
  const [radiusMeters, setRadiusMeters] = React.useState(DEFAULT_RADIUS_METERS)
  const [recenterKey, setRecenterKey] = React.useState(0)
  const [queryDraft, setQueryDraft] = React.useState("")
  const [queries, setQueries] = React.useState<string[]>([])
  const [maxResults, setMaxResults] = React.useState(DEFAULT_MAX_RESULTS)
  const [localError, setLocalError] = React.useState<string | null>(null)
  const [isLocating, setIsLocating] = React.useState(false)

  function setCenter(nextLat: number, nextLng: number, fly = false) {
    setLat(nextLat)
    setLng(nextLng)
    setLocalError(null)
    if (fly) setRecenterKey((key) => key + 1)
  }

  function addQuery() {
    const parts = queryDraft
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)

    if (parts.length === 0) return

    const slotsLeft = MAX_QUERIES - queries.length
    if (slotsLeft <= 0) {
      setLocalError(`No máximo ${MAX_QUERIES} buscas por execução.`)
      return
    }

    const existing = new Set(queries.map((q) => q.toLowerCase()))
    const toAdd: string[] = []
    const invalid: string[] = []
    const duplicates: string[] = []

    for (const part of parts) {
      if (toAdd.length >= slotsLeft) break
      if (part.length < MIN_QUERY_LEN || part.length > MAX_QUERY_LEN) {
        invalid.push(part)
        continue
      }
      const key = part.toLowerCase()
      if (existing.has(key)) {
        duplicates.push(part)
        continue
      }
      existing.add(key)
      toAdd.push(part)
    }

    if (toAdd.length > 0) {
      setQueries((prev) => [...prev, ...toAdd])
      setQueryDraft("")
    }

    if (parts.length > slotsLeft && toAdd.length === slotsLeft) {
      setLocalError(
        `Adicionados ${toAdd.length}. Limite de ${MAX_QUERIES} buscas — o restante foi ignorado.`
      )
      return
    }
    if (toAdd.length === 0) {
      if (invalid.length > 0) {
        setLocalError(
          `Cada termo precisa ter entre ${MIN_QUERY_LEN} e ${MAX_QUERY_LEN} caracteres.`
        )
        return
      }
      if (duplicates.length > 0) {
        setLocalError("Esses termos já foram adicionados.")
        return
      }
    }

    setLocalError(null)
  }

  function removeQuery(index: number) {
    setQueries((prev) => prev.filter((_, i) => i !== index))
    setLocalError(null)
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocalError("Seu navegador não suporta geolocalização.")
      return
    }
    setIsLocating(true)
    setLocalError(null)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter(position.coords.latitude, position.coords.longitude, true)
        setIsLocating(false)
      },
      () => {
        setIsLocating(false)
        setLocalError(
          "Não foi possível obter sua localização. Busque uma cidade ou clique no mapa."
        )
      },
      { enableHighAccuracy: true, timeout: 12_000 }
    )
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (
      !Number.isFinite(radiusMeters) ||
      radiusMeters < MIN_RADIUS_METERS ||
      radiusMeters > MAX_RADIUS_METERS
    ) {
      setLocalError(
        `O raio deve ser entre ${MIN_RADIUS_METERS} m e ${formatRadiusMeters(MAX_RADIUS_METERS)}.`
      )
      return
    }
    if (queries.length < 1) {
      setLocalError("Adicione pelo menos uma busca.")
      return
    }
    if (maxResults < 1 || maxResults > 200) {
      setLocalError("Máximo de resultados deve ser entre 1 e 200.")
      return
    }

    setLocalError(null)
    onSubmit({
      lat,
      lng,
      radiusMeters,
      searchQueries: queries,
      maxResults,
    })
  }

  const formDisabled = disabled || isPending

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-8", className)}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-stat-value">Área de busca</p>
          <p className="max-w-lg text-xs leading-relaxed text-stat-muted">
            Busque uma cidade, use sua localização ou clique no mapa. O raio
            fica logo abaixo do mapa.
          </p>
        </div>

        <SearchAreaMap
          lat={lat}
          lng={lng}
          radiusMeters={radiusMeters}
          recenterKey={recenterKey}
          disabled={formDisabled}
          onCenterChange={(nextLat, nextLng) => setCenter(nextLat, nextLng)}
          onRadiusChange={(next) => {
            setRadiusMeters(next)
            setLocalError(null)
          }}
          toolbar={
            <>
              <PlaceSearchField
                disabled={formDisabled}
                onSelect={(place) => {
                  setCenter(place.lat, place.lng, true)
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={formDisabled || isLocating}
                className="shrink-0 gap-1.5"
                onClick={useCurrentLocation}
              >
                <IconCurrentLocation className="size-3.5" aria-hidden />
                {isLocating ? "…" : "Minha localização"}
              </Button>
            </>
          }
        />
      </div>

      <div className="space-y-3 border-t border-border pt-6">
        <label
          htmlFor="gmaps-query"
          className="text-sm font-medium text-stat-value"
        >
          Termos de busca
        </label>
        <p className="text-xs leading-relaxed text-stat-muted">
          Até {MAX_QUERIES} termos. Separe por vírgula para adicionar vários de
          uma vez. Ex.: clínicas, posto, escritórios dentários.
        </p>
        <div className="flex gap-2">
          <Input
            id="gmaps-query"
            value={queryDraft}
            disabled={formDisabled || queries.length >= MAX_QUERIES}
            placeholder="clínicas, posto, escritórios dentários"
            onChange={(e) => {
              setQueryDraft(e.target.value)
              setLocalError(null)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addQuery()
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={formDisabled || queries.length >= MAX_QUERIES}
            onClick={addQuery}
            aria-label="Adicionar busca"
          >
            <IconPlus className="size-4" aria-hidden />
          </Button>
        </div>
        {queries.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {queries.map((query, index) => (
              <li
                key={`${query}-${index}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-sm text-stat-value"
              >
                <span className="max-w-[14rem] truncate">{query}</span>
                <button
                  type="button"
                  disabled={formDisabled}
                  className="text-stat-muted transition-colors hover:text-stat-value"
                  aria-label={`Remover ${query}`}
                  onClick={() => removeQuery(index)}
                >
                  <IconX className="size-3.5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="gmaps-max-results"
          className="text-sm font-medium text-stat-value"
        >
          Máximo por termo
        </label>
        <Input
          id="gmaps-max-results"
          type="number"
          min={1}
          max={200}
          value={maxResults}
          disabled={formDisabled}
          onChange={(e) => {
            setMaxResults(Number(e.target.value) || 0)
            setLocalError(null)
          }}
          className="max-w-[10rem]"
        />
        <p className="text-xs text-stat-muted">Entre 1 e 200. Padrão: 50.</p>
      </div>

      {localError ? (
        <p
          className="rounded-lg border border-destructive/35 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {localError}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-stat-muted">
          O scrape roda em segundo plano. Acompanhe o status nesta página até a
          importação terminar.
        </p>
        <Button
          type="submit"
          disabled={formDisabled}
          className="shrink-0 bg-[#111111] text-white hover:bg-[#333333] dark:bg-foreground dark:text-background dark:hover:opacity-90"
        >
          {isPending ? "Iniciando…" : "Iniciar busca"}
        </Button>
      </div>
    </form>
  )
}
