import type { LeadStatus } from "@/features/leads/types/lead"
import {
  getLeadStatusLabel,
  isKanbanLeadStatus,
  KANBAN_LEAD_STATUSES,
  LEAD_STATUS_META,
} from "@/features/leads/config/lead-status"

export const PIPELINE_STATUSES = KANBAN_LEAD_STATUSES

export const PIPELINE_COLUMN_LABELS = Object.fromEntries(
  (Object.keys(LEAD_STATUS_META) as LeadStatus[]).map((status) => [
    status,
    getLeadStatusLabel(status),
  ])
) as Record<LeadStatus, string>

export const PIPELINE_PAGE_SIZE = 100

export const PIPELINE_STATUS_DOT = Object.fromEntries(
  (Object.keys(LEAD_STATUS_META) as LeadStatus[]).map((status) => [
    status,
    LEAD_STATUS_META[status].dotClass,
  ])
) as Record<LeadStatus, string>

export function isPipelineColumnStatus(v: string): v is LeadStatus {
  return isKanbanLeadStatus(v)
}
