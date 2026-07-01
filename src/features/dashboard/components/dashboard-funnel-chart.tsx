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
      light: ["oklch(0.627 0.194 149.214)"],
      dark: ["oklch(0.723 0.219 149.579)"],
    },
  },
} satisfies ChartConfig

const lineConfig = {
  salesWon: {
    label: "Vendas realizadas",
    colors: {
      light: ["oklch(0.527 0.154 150.069)"],
      dark: ["oklch(0.871 0.15 154.449)"],
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
          "flex min-h-44 items-center justify-center rounded-lg border border-dashed border-border px-4 text-center text-xs text-stat-muted",
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
