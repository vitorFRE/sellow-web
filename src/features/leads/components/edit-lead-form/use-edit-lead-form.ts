import { useForm } from "@tanstack/react-form"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/shared/lib/api-errors"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"
import { invalidateWorkspaceLeadsQueries } from "@/features/workspaces/lib/business-query-key"
import { updateLead } from "@/features/leads/api/leads-api"
import { buildUpdateLeadBody } from "@/features/leads/lib/build-update-lead-body"
import { leadToEditFormValues } from "@/features/leads/lib/lead-to-edit-form-values"
import {
  editLeadDefaultValues,
  editLeadFormSchema,
} from "@/features/leads/schemas/edit-lead-form-schema"
import type { Lead } from "@/features/leads/types/lead"

type Args = {
  lead: Lead
  onSaved: () => void
  onSubmitStart: () => void
  onSubmitEnd: () => void
  onSubmitError: (message: string) => void
}

export function useEditLeadForm({
  lead,
  onSaved,
  onSubmitStart,
  onSubmitEnd,
  onSubmitError,
}: Args) {
  const queryClient = useQueryClient()
  const { workspaceId } = useActiveWorkspace()

  return useForm({
    defaultValues: leadToEditFormValues(lead),
    validators: {
      onSubmit: editLeadFormSchema,
      onBlur: editLeadFormSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmitStart()
      try {
        await updateLead(lead.id, buildUpdateLeadBody(value))
        if (workspaceId) {
          await invalidateWorkspaceLeadsQueries(queryClient, workspaceId)
        }
        toast.success("Lead atualizado.")
        onSaved()
      } catch (err) {
        onSubmitError(
          getApiErrorMessage(err, "Não foi possível atualizar o lead.")
        )
      } finally {
        onSubmitEnd()
      }
    },
  })
}

export type EditLeadFormApi = ReturnType<typeof useEditLeadForm>

export { editLeadDefaultValues }
