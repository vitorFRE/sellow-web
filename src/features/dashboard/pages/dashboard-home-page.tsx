import { useQuery } from "@tanstack/react-query"

import { HttpError } from "@/features/auth/api/auth-api"
import { getDashboardOverview } from "@/features/dashboard/api/dashboard-api"
import { DashboardOverviewStats } from "@/features/dashboard/components/dashboard-overview-stats"
import { DashboardRecentLeads } from "@/features/dashboard/components/dashboard-recent-leads"
import { DashboardUpcomingFollowUps } from "@/features/dashboard/components/dashboard-upcoming-follow-ups"
import { dashboardOverviewQueryKey } from "@/features/dashboard/queries/dashboard-query-keys"
import type { LeadStatus } from "@/features/leads/types/lead"
import { PIPELINE_STATUSES } from "@/features/pipeline/config/pipeline-columns"
import { Skeleton } from "@/components/ui/skeleton"

function normalizeCounts(
  raw: Partial<Record<LeadStatus, number>> | Record<LeadStatus, number> | undefined
): Record<LeadStatus, number> {
  return PIPELINE_STATUSES.reduce(
    (acc, s) => {
      acc[s] = raw?.[s] ?? 0
      return acc
    },
    {} as Record<LeadStatus, number>
  )
}

export function DashboardHomePage() {
  const query = useQuery({
    queryKey: dashboardOverviewQueryKey,
    queryFn: getDashboardOverview,
    staleTime: 60_000,
  })

  if (query.isPending) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-8">
        <div className="space-y-3">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <Skeleton className="h-4 w-full max-w-lg rounded-lg" />
        </div>
        <Skeleton className="h-36 w-full rounded-[1.75rem]" />
        <div className="-mx-1 flex gap-2 overflow-hidden pb-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-[4.5rem] min-w-[7.25rem] rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Skeleton className="min-h-[22rem] rounded-[1.75rem]" />
          <Skeleton className="min-h-[22rem] rounded-[1.75rem]" />
        </div>
      </div>
    )
  }

  if (query.isError) {
    const msg =
      query.error instanceof HttpError && query.error.status === 403
        ? "Acesso negado. Esta área é restrita a administradores."
        : query.error instanceof Error
          ? query.error.message
          : "Não foi possível carregar o resumo."
    return (
      <div className="rounded-[1.75rem] border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm text-destructive">
        {msg}
      </div>
    )
  }

  const data = query.data
  const counts = normalizeCounts(data.countsByStatus)

  return (
    <div className="flex w-full min-w-0 flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Início
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          Visão geral do funil e do que precisa de atenção nos próximos dias.
        </p>
      </header>

      <DashboardOverviewStats totalLeads={data.totalLeads} countsByStatus={counts} />

      <div className="relative grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-6">
        <DashboardRecentLeads leads={data.recentLeads} />
        <DashboardUpcomingFollowUps items={data.upcomingFollowUps} />
      </div>
    </div>
  )
}
