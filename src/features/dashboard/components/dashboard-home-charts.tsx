import { cn } from "@/lib/utils"
import type { LeadStatus } from "@/features/leads/types/lead"
import { DashboardFunnelChart } from "@/features/dashboard/components/dashboard-funnel-chart"
import { DashboardPipelineStatusList } from "@/features/dashboard/components/dashboard-pipeline-status-list"
import { DashboardSectionHeader } from "@/features/dashboard/components/dashboard-section-header"
import type { DashboardFunnelChartPoint } from "@/features/dashboard/types/dashboard-overview"

type Props = {
  countsByStatus: Partial<Record<LeadStatus, number>> | Record<LeadStatus, number>
  funnelChart: DashboardFunnelChartPoint[]
  className?: string
}

export function DashboardHomeCharts({
  countsByStatus,
  funnelChart,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]",
        className
      )}
    >
      <div className="dashboard-stat-board flex flex-col gap-6 p-6">
        <DashboardSectionHeader
          eyebrow="Gráfico"
          title="Desempenho mensal"
          description="Leads novos e vendas fechadas por mês."
        />
        <DashboardFunnelChart
          className="min-h-48 w-full lg:min-h-56"
          points={funnelChart}
        />
      </div>

      <div className="dashboard-stat-board flex flex-col gap-6 p-6">
        <DashboardSectionHeader
          eyebrow="Funil"
          title="Por etapa"
          description="Distribuição atual de leads no pipeline."
        />
        <DashboardPipelineStatusList countsByStatus={countsByStatus} />
      </div>
    </section>
  )
}
