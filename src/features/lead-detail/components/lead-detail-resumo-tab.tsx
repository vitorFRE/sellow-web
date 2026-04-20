"use client"

import type { Lead } from "@/features/leads/types/lead"
import { LeadDetailLeadInfoPanel } from "@/features/lead-detail/components/lead-detail-lead-info-panel"

type Props = {
  lead: Lead
}

export function LeadDetailResumoTab({ lead }: Props) {
  return <LeadDetailLeadInfoPanel lead={lead} />
}
