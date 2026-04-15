import type { CreateLeadFormValues } from "@/features/leads/schemas/create-lead-form-schema"
import type { LeadStatus } from "@/features/leads/types/lead"

export type CreateLeadRequestBody = {
  name: string
  email?: string
  phone?: string
  budget?: number
  status?: LeadStatus
  source?: string
  city?: string
  state?: string
  website?: string
  categoryName?: string
}

function trimOrUndef(s: string): string | undefined {
  const t = s.trim()
  return t === "" ? undefined : t
}

function numOrUndef(s: string): number | undefined {
  const t = s.trim()
  if (t === "") return undefined
  const n = Number(t)
  return Number.isFinite(n) ? n : undefined
}

export function buildCreateLeadBody(
  v: CreateLeadFormValues
): CreateLeadRequestBody {
  const body: CreateLeadRequestBody = {
    name: v.name.trim(),
    status: v.status,
  }

  const email = trimOrUndef(v.email)
  if (email) body.email = email

  const phone = trimOrUndef(v.phone)
  if (phone) body.phone = phone

  const budget = numOrUndef(v.budget)
  if (budget != null && budget >= 0) body.budget = budget

  const source = trimOrUndef(v.source)
  if (source) body.source = source

  const city = trimOrUndef(v.city)
  if (city) body.city = city

  const state = trimOrUndef(v.state)
  if (state) body.state = state

  const website = trimOrUndef(v.website)
  if (website) body.website = website

  const categoryName = trimOrUndef(v.categoryName)
  if (categoryName) body.categoryName = categoryName

  return body
}
