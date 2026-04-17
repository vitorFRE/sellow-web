"use client"

import * as React from "react"

import type { Lead } from "@/features/leads/types/lead"
import { LeadDetailSiteProjectPanel } from "@/features/lead-detail/components/lead-detail-site-project-panel"
import { LeadDetailSummary } from "@/features/lead-detail/components/lead-detail-summary"
import { extractSiteProject } from "@/features/lead-detail/lib/site-project-utils"
import type { LeadDetailView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  lead: Lead
  detail: LeadDetailView
}

export function LeadDetailResumoTab({ lead, detail }: Props) {
  const [project, setProject] = React.useState(() => extractSiteProject(detail))

  return (
    <div className="space-y-5">
      <LeadDetailSummary lead={lead} detail={detail} />
      <LeadDetailSiteProjectPanel saved={project} onSavedChange={setProject} />
    </div>
  )
}
