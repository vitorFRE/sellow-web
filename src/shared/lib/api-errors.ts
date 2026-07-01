import { HttpError } from "@/shared/api/http-error"

export const ADMIN_FORBIDDEN_MESSAGE =
  "Acesso negado. Esta área é restrita a administradores."

export function isHttpError(err: unknown): err is HttpError {
  return err instanceof HttpError
}

export function isAdminForbidden(err: unknown): boolean {
  return isHttpError(err) && err.status === 403
}

export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (isHttpError(err)) return err.message
  return fallback
}

export function getAdminForbiddenMessage(err: unknown, fallback: string): string {
  if (isAdminForbidden(err)) return ADMIN_FORBIDDEN_MESSAGE
  return getApiErrorMessage(err, fallback)
}
