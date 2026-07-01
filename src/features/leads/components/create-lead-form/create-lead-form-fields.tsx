import type { ReactFormExtendedApi } from "@tanstack/react-form"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  getLeadStatusLabel,
  isKanbanLeadStatus,
  KANBAN_LEAD_STATUSES,
} from "@/features/leads/config/lead-status"
import { CreateLeadFieldShell } from "@/features/leads/components/create-lead-form/create-lead-field-shell"
import type { CreateLeadFormValues } from "@/features/leads/schemas/create-lead-form-schema"

type FormApi = ReactFormExtendedApi<
  CreateLeadFormValues,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  unknown
>

type Props = {
  form: FormApi
}

export function CreateLeadFormFields({ form }: Props) {
  return (
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
              onValueChange={(v) => {
                if (isKanbanLeadStatus(v)) field.handleChange(v)
              }}
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
                {KANBAN_LEAD_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {getLeadStatusLabel(s)}
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
  )
}
