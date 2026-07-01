import { useQuery } from "@tanstack/react-query"

import { getDashboardOverview } from "@/features/dashboard/api/dashboard-api"
import { DashboardHomeCharts } from "@/features/dashboard/components/dashboard-home-charts"
import { DashboardHomeHero } from "@/features/dashboard/components/dashboard-home-hero"
import { DashboardReveal } from "@/features/dashboard/components/dashboard-reveal"
import { dashboardOverviewQueryKey } from "@/features/dashboard/queries/dashboard-query-keys"
import type { LeadStatus } from "@/features/leads/types/lead"
import { KANBAN_LEAD_STATUSES } from "@/features/leads/config/lead-status"
import { getAdminForbiddenMessage } from "@/shared/lib/api-errors"
import { Skeleton } from "@/components/ui/skeleton"

function normalizeCounts(
  raw: Partial<Record<LeadStatus, number>> | Record<LeadStatus, number> | undefined
): Record<LeadStatus, number> {
  return KANBAN_LEAD_STATUSES.reduce(
    (acc, s) => {
      acc[s] = raw?.[s] ?? 0
      return acc
    },
    {} as Record<LeadStatus, number>
  )
}

function HomeSkeleton() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-10">
      <div className="space-y-4 border-b border-border pb-8">
        <Skeleton className="h-3 w-44 rounded-md bg-stat-card" />
        <Skeleton className="h-10 w-36 rounded-md bg-stat-card" />
        <Skeleton className="h-4 w-full max-w-md rounded-md bg-stat-card" />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <Skeleton className="h-72 rounded-lg bg-stat-board" />
        <Skeleton className="h-72 rounded-lg bg-stat-board" />
      </div>
    </div>
  )
}

export function DashboardHomePage() {
  const query = useQuery({
    queryKey: dashboardOverviewQueryKey,
    queryFn: getDashboardOverview,
    staleTime: 60_000,
  })

  if (query.isPending) {
    return <HomeSkeleton />
  }

  if (query.isError) {
    const msg = getAdminForbiddenMessage(
      query.error,
      query.error instanceof Error
        ? query.error.message
        : "Não foi possível carregar o resumo."
    )
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm text-destructive">
        {msg}
      </div>
    )
  }

  const data = query.data
  const counts = normalizeCounts(data.countsByStatus)
  const formattedDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  })

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-10 pb-4 md:gap-12">
      <DashboardReveal>
        <DashboardHomeHero dateLabel={formattedDate} />
      </DashboardReveal>

      <DashboardReveal delay={80}>
        <DashboardHomeCharts
          countsByStatus={counts}
          funnelChart={data.funnelChart ?? []}
        />
      </DashboardReveal>
    </div>
  )
}
