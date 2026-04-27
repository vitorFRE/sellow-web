import { cn } from "@/lib/utils"
import type { LeadStatus } from "@/features/leads/types/lead"
import { DashboardFunnelChart } from "@/features/dashboard/components/dashboard-funnel-chart"
import { DashboardPipelineStatusList } from "@/features/dashboard/components/dashboard-pipeline-status-list"
import type { DashboardFunnelChartPoint } from "@/features/dashboard/types/dashboard-overview"

type Props = {
  countsByStatus: Partial<Record<LeadStatus, number>> | Record<LeadStatus, number>
  funnelChart: DashboardFunnelChartPoint[]
  className?: string
}

export function DashboardOverviewStats({
  countsByStatus,
  funnelChart,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-stretch lg:gap-5",
        className
      )}
    >
      <div className="min-w-0 rounded-3xl border border-border bg-card p-2 shadow-sm sm:p-3">
        <DashboardFunnelChart
          className="min-h-44 w-full sm:min-h-48 lg:min-h-66"
          points={funnelChart}
        />
      </div>

      <div className="min-w-0">
        <DashboardPipelineStatusList countsByStatus={countsByStatus} />
      </div>
    </section>
  )
}
