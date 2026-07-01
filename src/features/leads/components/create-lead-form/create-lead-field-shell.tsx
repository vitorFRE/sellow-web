import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function firstFieldErrorMessage(
  errors: readonly unknown[]
): string | undefined {
  for (const e of errors) {
    if (e != null && typeof e === "object" && "message" in e) {
      const m = (e as { message?: unknown }).message
      if (typeof m === "string" && m.length > 0) return m
    }
  }
  return undefined
}

export type CreateLeadFieldApi = {
  name: string
  state: {
    meta: {
      isTouched: boolean
      isValid: boolean
      errors: readonly unknown[]
    }
  }
}

type Props = {
  label: string
  required?: boolean
  field: CreateLeadFieldApi
  className?: string
  children: ReactNode
}

export function CreateLeadFieldShell({
  label,
  required,
  field,
  className,
  children,
}: Props) {
  const isInvalid =
    field.state.meta.isTouched && !field.state.meta.isValid
  const err = firstFieldErrorMessage(field.state.meta.errors)
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={field.name} className="text-sm font-medium">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </label>
      {children}
      {isInvalid && err ? (
        <p className="text-sm text-destructive">{err}</p>
      ) : null}
    </div>
  )
}
