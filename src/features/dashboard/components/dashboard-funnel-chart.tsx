"use client"

import { useMemo } from "react"
import { EvilComposedChart } from "@/components/evilcharts/charts/composed-chart"
import type { ChartConfig } from "@/components/evilcharts/ui/chart"
import type { DashboardFunnelChartPoint } from "@/features/dashboard/types/dashboard-overview"
import { cn } from "@/lib/utils"

const barConfig = {
  leadsCreated: {
    label: "Leads novos",
    colors: {
      light: ["#3b82f6"],
      dark: ["#6A5ACD"],
    },
  },
} satisfies ChartConfig

const lineConfig = {
  salesWon: {
    label: "Vendas realizadas",
    colors: {
      light: ["#10b981"],
      dark: ["#34d399"],
    },
  },
} satisfies ChartConfig

type Props = {
  points: DashboardFunnelChartPoint[]
  className?: string
}

function monthLabel(isoMonth: string): string {
  const d = new Date(`${isoMonth}-15T12:00:00.000Z`)
  if (Number.isNaN(d.getTime())) return isoMonth
  return d.toLocaleDateString("pt-BR", { month: "short" }).replace(/\./g, "")
}

export function DashboardFunnelChart({ points, className }: Props) {
  const data = useMemo(
    () =>
      points.map((p) => ({
        ...p,
        label: monthLabel(p.month),
      })),
    [points]
  )

  if (data.length === 0 || data.every((d) => d.leadsCreated === 0 && d.salesWon === 0)) {
    return (
      <div
        className={cn(
          "flex min-h-44 items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/15 px-4 text-center text-xs text-muted-foreground",
          className
        )}
      >
        Ainda não há leads novos ou vendas registradas no período exibido.
      </div>
    )
  }

  return (
    <div className={cn("min-h-48 min-w-0", className)}>
      <EvilComposedChart
        isClickable
        className="h-full w-full p-1 sm:p-2"
        xDataKey="label"
        data={data}
        dotVariant="colored-border"
        barConfig={barConfig}
        lineConfig={lineConfig}
        xAxisProps={{
          tickFormatter: (v) => String(v),
        }}
        enableHoverHighlight
      />
    </div>
  )
}
