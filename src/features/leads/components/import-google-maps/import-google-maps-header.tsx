import { IconMapPin } from "@tabler/icons-react"

import { ImportApifyFormatHint } from "./import-apify-format-hint"

export function ImportGoogleMapsHeader() {
  return (
    <header className="relative overflow-hidden rounded-4xl border border-primary/15 bg-gradient-to-br from-primary/[0.07] via-card to-card p-6 shadow-sm sm:p-8">
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/[0.06] blur-2xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-3xl bg-primary/12 text-primary shadow-inner">
            <IconMapPin className="size-7" aria-hidden />
          </span>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Importar leads
              </h1>
              <span className="rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                Google Maps
              </span>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Envie um JSON com até{" "}
              <span className="font-medium text-foreground">500 itens</span>.
              Cada item precisa de{" "}
              <span className="text-foreground">title</span> e telefone válido
              ou <span className="text-foreground">query_place_id</span> na URL
              do Maps. O backend define{" "}
              <span className="font-mono text-foreground">source</span> como{" "}
              <span className="font-mono text-foreground">google_maps</span>.
            </p>
          </div>
        </div>
        <ImportApifyFormatHint />
      </div>
    </header>
  )
}
