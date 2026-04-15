import type { LeadsListMeta } from "@/features/leads/types/lead"

export function bumpLeadsListMeta(
  meta: LeadsListMeta,
  deltaTotal: number
): LeadsListMeta {
  const total = Math.max(0, meta.total + deltaTotal)
  return {
    ...meta,
    total,
    totalPages: Math.max(1, Math.ceil(total / meta.limit)),
  }
}
