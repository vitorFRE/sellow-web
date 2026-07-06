import type { EditLeadFormValues } from "@/features/leads/schemas/edit-lead-form-schema"
import type { Lead } from "@/features/leads/types/lead"

export function leadToEditFormValues(lead: Lead): EditLeadFormValues {
  return {
    name: lead.name ?? "",
    email: lead.email ?? "",
    phone: lead.phone ?? "",
    budget:
      lead.budget != null && String(lead.budget).trim() !== ""
        ? String(lead.budget)
        : "",
    source: lead.source ?? "",
    city: lead.city ?? "",
    state: lead.state ?? "",
    url: lead.url ?? "",
    website: lead.website ?? "",
    instagram: lead.instagram ?? "",
    facebook: lead.facebook ?? "",
    categoryName: lead.categoryName ?? "",
  }
}
