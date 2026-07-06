import type { CreateLeadFormApi } from "@/features/leads/components/create-lead-form/use-create-lead-form"
import { LeadProfileFormFields } from "@/features/leads/components/lead-profile-form-fields"
import type { LeadProfileFormApi } from "@/features/leads/lib/lead-profile-form-types"

type Props = {
  form: CreateLeadFormApi
}

export function CreateLeadFormFields({ form }: Props) {
  return <LeadProfileFormFields form={form as LeadProfileFormApi} showStatus />
}
