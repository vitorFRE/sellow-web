import type { IntegrationRunStatus } from "@/features/integrations/types/integration-run"

export const ACTIVE_INTEGRATION_RUN_STATUSES: readonly IntegrationRunStatus[] =
  ["PENDING", "RUNNING", "IMPORTING"] as const

export const ABORTABLE_INTEGRATION_RUN_STATUSES: readonly IntegrationRunStatus[] =
  ["PENDING", "RUNNING"] as const

export function isActiveIntegrationRunStatus(
  status: IntegrationRunStatus
): boolean {
  return (ACTIVE_INTEGRATION_RUN_STATUSES as readonly string[]).includes(
    status
  )
}

export function isAbortableIntegrationRunStatus(
  status: IntegrationRunStatus
): boolean {
  return (ABORTABLE_INTEGRATION_RUN_STATUSES as readonly string[]).includes(
    status
  )
}

export function isTerminalSuccessStatus(
  status: IntegrationRunStatus
): boolean {
  return status === "COMPLETED" || status === "COMPLETED_WITH_ERRORS"
}

export const INTEGRATION_RUN_STATUS_LABEL: Record<
  IntegrationRunStatus,
  string
> = {
  PENDING: "Pendente",
  RUNNING: "Buscando",
  IMPORTING: "Importando",
  COMPLETED: "Concluído",
  COMPLETED_WITH_ERRORS: "Concluído com erros",
  FAILED: "Falhou",
  ABORTED: "Abortado",
  TIMED_OUT: "Timeout",
}

export type IntegrationStatusTone =
  | "neutral"
  | "blue"
  | "yellow"
  | "green"
  | "red"

export function integrationRunStatusTone(
  status: IntegrationRunStatus
): IntegrationStatusTone {
  switch (status) {
    case "PENDING":
      return "neutral"
    case "RUNNING":
    case "IMPORTING":
      return "blue"
    case "COMPLETED":
      return "green"
    case "COMPLETED_WITH_ERRORS":
      return "yellow"
    case "FAILED":
    case "ABORTED":
    case "TIMED_OUT":
      return "red"
  }
}
