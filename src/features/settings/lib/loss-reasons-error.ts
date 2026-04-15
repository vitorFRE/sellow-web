import { HttpError } from "@/features/auth/api/auth-api"

export function lossReasonsErrorMessage(err: unknown, fallback: string) {
  if (err instanceof HttpError) return err.message
  return fallback
}
