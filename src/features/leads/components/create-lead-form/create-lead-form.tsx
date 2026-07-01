import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/shared/lib/api-errors"
import { createLead } from "@/features/leads/api/leads-api"
import { CreateLeadFormFields } from "@/features/leads/components/create-lead-form/create-lead-form-fields"
import { buildCreateLeadBody } from "@/features/leads/lib/build-create-lead-body"
import {
  createLeadDefaultValues,
  createLeadFormSchema,
} from "@/features/leads/schemas/create-lead-form-schema"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
          getApiErrorMessage(err, "Não foi possível criar o lead.")
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
      <CreateLeadFormFields form={form} />

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
