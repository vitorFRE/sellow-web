import type { Lead, LeadStatus } from "@/features/leads/types/lead"

export type DashboardUpcomingFollowUp = {
  leadId: string
  leadName: string
  nextContactAt: string
  channel: string
  ownerLabel: string
  reminder: string | null
}

export type DashboardFunnelChartPoint = {
  month: string
  leadsCreated: number
  salesWon: number
}

export type DashboardOverviewResponse = {
  totalLeads: number
  countsByStatus: Record<LeadStatus, number>
  funnelChart: DashboardFunnelChartPoint[]
  recentLeads: Lead[]
  upcomingFollowUps: DashboardUpcomingFollowUp[]
}
