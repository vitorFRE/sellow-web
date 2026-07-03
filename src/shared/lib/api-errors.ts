import { HttpError } from "@/shared/api/http-error"

export const WORKSPACE_FORBIDDEN_MESSAGE =
  "Você não tem permissão neste workspace."

/** @deprecated Use isWorkspaceForbidden */
export const ADMIN_FORBIDDEN_MESSAGE = WORKSPACE_FORBIDDEN_MESSAGE

export function isHttpError(err: unknown): err is HttpError {
  return err instanceof HttpError
}

export function isWorkspaceForbidden(err: unknown): boolean {
  return isHttpError(err) && err.status === 403
}

/** @deprecated Use isWorkspaceForbidden */
export function isAdminForbidden(err: unknown): boolean {
  return isWorkspaceForbidden(err)
}

export function isMissingWorkspaceHeader(err: unknown): boolean {
  return (
    isHttpError(err) &&
    err.status === 400 &&
    err.message.toLowerCase().includes("x-workspace-id")
  )
}

export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (isHttpError(err)) return err.message
  return fallback
}

export function getWorkspaceForbiddenMessage(
  err: unknown,
  fallback: string
): string {
  if (isWorkspaceForbidden(err)) return WORKSPACE_FORBIDDEN_MESSAGE
  return getApiErrorMessage(err, fallback)
}

/** @deprecated Use getWorkspaceForbiddenMessage */
export function getAdminForbiddenMessage(
  err: unknown,
  fallback: string
): string {
  return getWorkspaceForbiddenMessage(err, fallback)
}
