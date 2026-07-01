import { useForm } from "@tanstack/react-form"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/shared/lib/api-errors"
import { createLead } from "@/features/leads/api/leads-api"
import { buildCreateLeadBody } from "@/features/leads/lib/build-create-lead-body"
import {
  createLeadDefaultValues,
  createLeadFormSchema,
} from "@/features/leads/schemas/create-lead-form-schema"

type Args = {
  onCreated: () => void
  onSubmitStart: () => void
  onSubmitEnd: () => void
  onSubmitError: (message: string) => void
}

export function useCreateLeadForm({
  onCreated,
  onSubmitStart,
  onSubmitEnd,
  onSubmitError,
}: Args) {
  const queryClient = useQueryClient()

  return useForm({
    defaultValues: createLeadDefaultValues,
    validators: {
      onSubmit: createLeadFormSchema,
      onBlur: createLeadFormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      onSubmitStart()
      try {
        await createLead(buildCreateLeadBody(value))
        await queryClient.invalidateQueries({ queryKey: ["leads"] })
        toast.success("Lead criado.")
        formApi.reset()
        onCreated()
      } catch (err) {
        onSubmitError(getApiErrorMessage(err, "Não foi possível criar o lead."))
      } finally {
        onSubmitEnd()
      }
    },
  })
}

export type CreateLeadFormApi = ReturnType<typeof useCreateLeadForm>
