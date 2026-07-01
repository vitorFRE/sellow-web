import { ImportApifyFormatHint } from "./import-apify-format-hint"

export function ImportGoogleMapsHeader() {
  return (
    <header className="space-y-6 border-b border-border pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
          Importação
        </p>
        <span className="rounded-full border border-stat-card-border bg-muted px-2.5 py-0.5 text-[10px] font-medium tracking-[0.12em] text-stat-muted uppercase">
          Google Maps
        </span>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-stat-value md:text-4xl">
          Importar leads
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-stat-muted">
          Envie um JSON com até{" "}
          <span className="font-medium text-stat-value">500 itens</span>. Cada
          item precisa de <span className="font-mono text-stat-value">title</span>{" "}
          e telefone válido ou{" "}
          <span className="font-mono text-stat-value">query_place_id</span> na URL
          do Maps. O backend define{" "}
          <span className="font-mono text-stat-value">source</span> como{" "}
          <span className="font-mono text-stat-value">google_maps</span>.
        </p>
      </div>

      <ImportApifyFormatHint />
    </header>
  )
}
