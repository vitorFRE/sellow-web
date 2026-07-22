import * as React from "react"
import { IconLoader2, IconMapPin, IconSearch, IconX } from "@tabler/icons-react"

import { Input } from "@/components/ui/input"
import {
  searchPlaces,
  type GeocodePlace,
} from "@/features/integrations/lib/geocode-places"
import { cn } from "@/lib/utils"

type Props = {
  disabled?: boolean
  onSelect: (place: GeocodePlace) => void
  className?: string
}

export function PlaceSearchField({ disabled, onSelect, className }: Props) {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<GeocodePlace[]>([])
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const requestIdRef = React.useRef(0)

  React.useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  React.useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setResults([])
      setIsLoading(false)
      setError(null)
      return
    }

    const controller = new AbortController()
    const requestId = ++requestIdRef.current
    setIsLoading(true)
    setError(null)

    const timer = window.setTimeout(() => {
      void searchPlaces(trimmed, controller.signal)
        .then((places) => {
          if (requestId !== requestIdRef.current) return
          setResults(places)
          setOpen(true)
          setIsLoading(false)
        })
        .catch((err: unknown) => {
          if (controller.signal.aborted) return
          if (requestId !== requestIdRef.current) return
          setResults([])
          setIsLoading(false)
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível buscar o lugar."
          )
        })
    }, 320)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  function handleSelect(place: GeocodePlace) {
    setQuery(place.label.split(",")[0]?.trim() || place.label)
    setResults([])
    setOpen(false)
    setError(null)
    onSelect(place)
  }

  function clearQuery() {
    setQuery("")
    setResults([])
    setOpen(false)
    setError(null)
  }

  return (
    <div ref={rootRef} className={cn("relative min-w-0 flex-1", className)}>
      <div className="relative">
        <IconSearch
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stat-muted"
          aria-hidden
        />
        <Input
          value={query}
          disabled={disabled}
          placeholder="Buscar cidade ou bairro…"
          className="pr-9 pl-9"
          autoComplete="off"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls="place-search-results"
          aria-autocomplete="list"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setOpen(true)
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false)
          }}
        />
        {isLoading ? (
          <IconLoader2
            className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-stat-muted"
            aria-hidden
          />
        ) : query ? (
          <button
            type="button"
            disabled={disabled}
            className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-0.5 text-stat-muted transition-colors hover:text-stat-value"
            aria-label="Limpar busca"
            onClick={clearQuery}
          >
            <IconX className="size-3.5" aria-hidden />
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      {open && results.length > 0 ? (
        <ul
          id="place-search-results"
          role="listbox"
          className="absolute z-20 mt-1.5 max-h-56 w-full overflow-auto rounded-lg border border-border bg-card py-1"
        >
          {results.map((place) => (
            <li key={place.id} role="option">
              <button
                type="button"
                className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-muted/50"
                onClick={() => handleSelect(place)}
              >
                <IconMapPin
                  className="mt-0.5 size-3.5 shrink-0 text-stat-muted"
                  aria-hidden
                />
                <span className="min-w-0 text-sm leading-snug text-stat-value">
                  {place.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {open &&
      !isLoading &&
      query.trim().length >= 2 &&
      results.length === 0 &&
      !error ? (
        <p className="absolute z-20 mt-1.5 w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-stat-muted">
          Nenhum lugar encontrado.
        </p>
      ) : null}
    </div>
  )
}
