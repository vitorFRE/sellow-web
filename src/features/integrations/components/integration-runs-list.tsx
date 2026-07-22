import { IntegrationRunStatusBadge } from "@/features/integrations/components/integration-run-status-badge"
import { formatRunListTitle } from "@/features/integrations/lib/format-run-input"
import type { IntegrationRun } from "@/features/integrations/types/integration-run"

type Props = {
  runs: IntegrationRun[]
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
}

function formatDate(value: string | null): string {
  if (!value) return "—"
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value))
  } catch {
    return value
  }
}

export function IntegrationRunsList({
  runs,
  isLoading,
  isError,
  errorMessage,
}: Props) {
  return (
    <section className="dashboard-stat-board space-y-5">
      <header className="space-y-1.5 border-b border-border pb-4">
        <h2 className="text-base font-semibold tracking-tight text-stat-value">
          Histórico recente
        </h2>
        <p className="text-sm leading-relaxed text-stat-muted">
          Últimas execuções de busca neste workspace.
        </p>
      </header>

      {isLoading ? (
        <p className="text-sm text-stat-muted">Carregando execuções…</p>
      ) : null}

      {isError ? (
        <p
          className="rounded-lg border border-destructive/35 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {errorMessage ?? "Não foi possível carregar o histórico."}
        </p>
      ) : null}

      {!isLoading && !isError && runs.length === 0 ? (
        <p className="text-sm text-stat-muted">
          Nenhuma busca iniciada ainda. Configure a área e os termos acima para
          começar.
        </p>
      ) : null}

      {runs.length > 0 ? (
        <ul className="divide-y divide-border">
          {runs.map((run) => (
            <li
              key={run.id}
              className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1.5">
                <p className="truncate text-sm font-medium text-stat-value">
                  {formatRunListTitle(run)}
                </p>
                <p className="font-mono text-xs text-stat-muted">
                  {formatDate(run.startedAt ?? run.createdAt)}
                  {run.importSummary
                    ? ` · ${run.importSummary.created} criados`
                    : null}
                </p>
              </div>
              <IntegrationRunStatusBadge status={run.status} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
