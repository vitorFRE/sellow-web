import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"

import { HttpError } from "@/features/auth/api/auth-api"
import { getDashboardOverview } from "@/features/dashboard/api/dashboard-api"
import { DashboardOverviewStats } from "@/features/dashboard/components/dashboard-overview-stats"
import { DashboardRecentLeads } from "@/features/dashboard/components/dashboard-recent-leads"
import { DashboardUpcomingFollowUps } from "@/features/dashboard/components/dashboard-upcoming-follow-ups"
import { dashboardOverviewQueryKey } from "@/features/dashboard/queries/dashboard-query-keys"
import type { LeadStatus } from "@/features/leads/types/lead"
import { PIPELINE_STATUSES } from "@/features/pipeline/config/pipeline-columns"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

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
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-5">
          <Skeleton className="h-64 min-w-0 rounded-[1.75rem] lg:h-72" />
          <Skeleton className="min-h-64 min-w-0 rounded-[1.75rem] lg:min-h-0" />
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          <Skeleton className="min-h-88 rounded-[1.75rem]" />
          <Skeleton className="min-h-88 rounded-[1.75rem]" />
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
  const now = new Date()
  const formattedDate = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  })

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-7xl flex-col gap-6 md:gap-8">
      <section className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-6 p-5 md:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {formattedDate}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Início
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Visão geral do funil e das atividades com maior prioridade para hoje.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/dashboard/pipeline"
              className={buttonVariants({ size: "sm", className: "rounded-xl" })}
            >
              Abrir pipeline
            </Link>
            <Link
              to="/dashboard/leads"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "rounded-xl"
              )}
            >
              Ver leads
            </Link>
          </div>
        </div>
      </section>

      <DashboardOverviewStats
        countsByStatus={counts}
        funnelChart={data.funnelChart ?? []}
      />

      <div className="relative grid gap-5 xl:grid-cols-2 xl:items-start xl:gap-6">
        <DashboardRecentLeads leads={data.recentLeads} />
        <DashboardUpcomingFollowUps items={data.upcomingFollowUps} />
      </div>
    </div>
  )
}
