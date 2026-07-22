import { IconLoader2, IconPlayerStop } from "@tabler/icons-react"
import { useRouter } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { IntegrationRunStatusBadge } from "@/features/integrations/components/integration-run-status-badge"
import {
  isAbortableIntegrationRunStatus,
  isActiveIntegrationRunStatus,
  isTerminalSuccessStatus,
} from "@/features/integrations/lib/integration-run-status"
import { formatRunInputSummary } from "@/features/integrations/lib/format-run-input"
import type { IntegrationRun } from "@/features/integrations/types/integration-run"

type Props = {
  run: IntegrationRun
  isAborting?: boolean
  abortError?: string | null
  onAbort: () => void
}

export function ActiveIntegrationRunPanel({
  run,
  isAborting,
  abortError,
  onAbort,
}: Props) {
  const router = useRouter()
  const canAbort = isAbortableIntegrationRunStatus(run.status)
  const isActive = isActiveIntegrationRunStatus(run.status)
  const isSuccess = isTerminalSuccessStatus(run.status)
  const inputSummary = formatRunInputSummary(run)

  return (
    <section className="dashboard-stat-board space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
        <div className="space-y-2">
          <p className="text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
            Execução atual
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <IntegrationRunStatusBadge status={run.status} />
            {isActive ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-stat-muted">
                <IconLoader2 className="size-3.5 animate-spin" aria-hidden />
                Atualizando automaticamente
              </span>
            ) : null}
          </div>
        </div>
        {canAbort ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isAborting}
            className="gap-1.5"
            onClick={onAbort}
          >
            {isAborting ? (
              <IconLoader2 className="size-3.5 animate-spin" aria-hidden />
            ) : (
              <IconPlayerStop className="size-3.5" aria-hidden />
            )}
            Abortar
          </Button>
        ) : null}
      </header>

      {inputSummary ? (
        <p className="text-sm leading-relaxed text-stat-value/80">
          {inputSummary}
        </p>
      ) : null}

      {run.errorMessage ? (
        <p
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {run.errorMessage}
        </p>
      ) : null}

      {abortError ? (
        <p
          className="rounded-lg border border-destructive/35 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {abortError}
        </p>
      ) : null}

      {run.importSummary ? (
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {(
            [
              ["Itens", run.importSummary.itemCount],
              ["Criados", run.importSummary.created],
              ["Atualizados", run.importSummary.updated],
              ["Ignorados", run.importSummary.skipped],
              ["Falhas", run.importSummary.failed],
            ] as const
          ).map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-stat-card-border bg-stat-card px-3 py-2.5"
            >
              <dt className="text-[10px] font-medium tracking-[0.08em] text-stat-label uppercase">
                {label}
              </dt>
              <dd className="mt-1 font-mono text-lg tabular-nums text-stat-value">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {isSuccess ? (
        <div className="flex justify-end border-t border-border pt-4">
          <Button
            type="button"
            onClick={() => void router.navigate({ to: "/dashboard/leads" })}
          >
            Ver leads
          </Button>
        </div>
      ) : null}
    </section>
  )
}
