import type { EditLeadFormValues } from "@/features/leads/schemas/edit-lead-form-schema"
import type { UpdateLeadBody } from "@/features/leads/api/leads-api"

function trimOrNull(s: string): string | null {
  const t = s.trim()
  return t === "" ? null : t
}

function numOrNull(s: string): number | null {
  const t = s.trim()
  if (t === "") return null
  const n = Number(t)
  return Number.isFinite(n) ? n : null
}

export function buildUpdateLeadBody(v: EditLeadFormValues): UpdateLeadBody {
  return {
    name: v.name.trim(),
    email: trimOrNull(v.email),
    phone: trimOrNull(v.phone),
    budget: numOrNull(v.budget),
    source: trimOrNull(v.source),
    city: trimOrNull(v.city),
    state: trimOrNull(v.state),
    url: trimOrNull(v.url),
    website: trimOrNull(v.website),
    instagram: trimOrNull(v.instagram),
    facebook: trimOrNull(v.facebook),
    categoryName: trimOrNull(v.categoryName),
  }
}
