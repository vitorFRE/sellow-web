import * as React from "react"

import { Button } from "@/components/ui/button"
import { LeadProfileFormFields } from "@/features/leads/components/lead-profile-form-fields"
import { useEditLeadForm } from "@/features/leads/components/edit-lead-form/use-edit-lead-form"
import { leadToEditFormValues } from "@/features/leads/lib/lead-to-edit-form-values"
import type { LeadProfileFormApi } from "@/features/leads/lib/lead-profile-form-types"
import type { Lead } from "@/features/leads/types/lead"

type Props = {
  lead: Lead
  open: boolean
  onSaved: () => void
  onCancel: () => void
}

export function EditLeadForm({ lead, open, onSaved, onCancel }: Props) {
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [isPending, setIsPending] = React.useState(false)

  const form = useEditLeadForm({
    lead,
    onSaved,
    onSubmitStart: () => {
      setSubmitError(null)
      setIsPending(true)
    },
    onSubmitEnd: () => setIsPending(false),
    onSubmitError: setSubmitError,
  })

  React.useEffect(() => {
    if (!open) {
      form.reset(leadToEditFormValues(lead))
      setSubmitError(null)
    }
  }, [open, lead, form])

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        void form.handleSubmit()
      }}
      noValidate
    >
      <LeadProfileFormFields form={form as LeadProfileFormApi} showUrl />

      {submitError ? (
        <p
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
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
          {isPending ? "Salvando…" : "Salvar"}
        </Button>
      </div>
    </form>
  )
}
