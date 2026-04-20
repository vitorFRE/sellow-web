import * as React from "react"
import type { ReactNode } from "react"
import { useForm } from "@tanstack/react-form"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { HttpError } from "@/features/auth/api/auth-api"
import { createLead } from "@/features/leads/api/leads-api"
import { buildCreateLeadBody } from "@/features/leads/lib/build-create-lead-body"
import {
  createLeadDefaultValues,
  createLeadFormSchema,
} from "@/features/leads/schemas/create-lead-form-schema"
import type { LeadStatus } from "@/features/leads/types/lead"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  PIPELINE_COLUMN_LABELS,
  PIPELINE_STATUSES,
} from "@/features/pipeline/config/pipeline-columns"

function firstFieldErrorMessage(
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

function CreateLeadFieldShell({
  label,
  required,
  field,
  className,
  children,
}: {
  label: string
  required?: boolean
  field: {
    name: string
    state: {
      meta: {
        isTouched: boolean
        isValid: boolean
        errors: readonly unknown[]
      }
    }
  }
  className?: string
  children: ReactNode
}) {
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

type CreateLeadFormProps = {
  open: boolean
  onCreated: () => void
  onCancel: () => void
}

export function CreateLeadForm({
  open,
  onCreated,
  onCancel,
}: CreateLeadFormProps) {
  const queryClient = useQueryClient()
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [isPending, setIsPending] = React.useState(false)

  const form = useForm({
    defaultValues: createLeadDefaultValues,
    validators: {
      onSubmit: createLeadFormSchema,
      onBlur: createLeadFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      setIsPending(true)
      try {
        await createLead(buildCreateLeadBody(value))
        await queryClient.invalidateQueries({ queryKey: ["leads"] })
        toast.success("Lead criado.")
        form.reset()
        onCreated()
      } catch (err) {
        setSubmitError(
          err instanceof HttpError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Não foi possível criar o lead."
        )
      } finally {
        setIsPending(false)
      }
    },
  })

  React.useEffect(() => {
    if (!open) {
      form.reset()
      setSubmitError(null)
    }
  }, [open, form])

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        void form.handleSubmit()
      }}
      noValidate
    >
      <div className="grid max-h-[min(60vh,520px)] gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
        <form.Field
          name="name"
          children={(field) => (
            <CreateLeadFieldShell label="Nome" field={field} required>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Nome do lead"
                autoComplete="organization"
                aria-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              />
            </CreateLeadFieldShell>
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <CreateLeadFieldShell label="E-mail" field={field}>
              <Input
                id={field.name}
                type="email"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="opcional"
                autoComplete="email"
                aria-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              />
            </CreateLeadFieldShell>
          )}
        />
        <form.Field
          name="phone"
          children={(field) => (
            <CreateLeadFieldShell label="Telefone" field={field}>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="opcional (BR)"
                autoComplete="tel"
                aria-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              />
            </CreateLeadFieldShell>
          )}
        />
        <form.Field
          name="budget"
          children={(field) => (
            <CreateLeadFieldShell label="Orçamento" field={field}>
              <Input
                id={field.name}
                name={field.name}
                inputMode="decimal"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="opcional"
                aria-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              />
            </CreateLeadFieldShell>
          )}
        />
        <form.Field
          name="status"
          children={(field) => (
            <CreateLeadFieldShell label="Status" field={field}>
              <Select
                value={field.state.value}
                onValueChange={(v) =>
                  field.handleChange(v as LeadStatus)
                }
              >
                <SelectTrigger
                  id={field.name}
                  className="w-full min-w-0"
                  aria-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                  onBlur={field.handleBlur}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PIPELINE_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {PIPELINE_COLUMN_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CreateLeadFieldShell>
          )}
        />
        <form.Field
          name="source"
          children={(field) => (
            <CreateLeadFieldShell label="Origem" field={field}>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="opcional"
                aria-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              />
            </CreateLeadFieldShell>
          )}
        />
        <form.Field
          name="city"
          children={(field) => (
            <CreateLeadFieldShell label="Cidade" field={field}>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="opcional"
                aria-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              />
            </CreateLeadFieldShell>
          )}
        />
        <form.Field
          name="state"
          children={(field) => (
            <CreateLeadFieldShell label="UF" field={field}>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="opcional"
                aria-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              />
            </CreateLeadFieldShell>
          )}
        />
        <form.Field
          name="website"
          children={(field) => (
            <CreateLeadFieldShell
              label="Site"
              field={field}
              className="sm:col-span-2"
            >
              <Input
                id={field.name}
                name={field.name}
                type="url"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="https://..."
                aria-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              />
            </CreateLeadFieldShell>
          )}
        />
        <form.Field
          name="categoryName"
          children={(field) => (
            <CreateLeadFieldShell label="Categoria" field={field}>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="opcional"
                aria-invalid={
                  field.state.meta.isTouched && !field.state.meta.isValid
                }
              />
            </CreateLeadFieldShell>
          )}
        />
      </div>

      {submitError ? (
        <p
          className="rounded-3xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => onCancel()}
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Salvando..." : "Criar lead"}
        </Button>
      </div>
    </form>
  )
}

type CreateLeadModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateLeadModal({ open, onOpenChange }: CreateLeadModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[min(92dvh,720px)] gap-4 overflow-hidden sm:max-w-xl"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle>Novo lead</DialogTitle>
          <DialogDescription>
            Preencha os dados. Apenas o nome é obrigatório; os demais campos
            seguem a API{" "}
            <span className="font-mono text-foreground">POST /leads/create</span>
            .
          </DialogDescription>
        </DialogHeader>
        <CreateLeadForm
          open={open}
          onCreated={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
