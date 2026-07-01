import { Link } from "@tanstack/react-router"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  dateLabel: string
  className?: string
}

export function DashboardHomeHero({ dateLabel, className }: Props) {
  return (
    <header className={cn("space-y-6 border-b border-border pb-8", className)}>
      <p className="font-mono text-xs tracking-wide text-stat-muted capitalize">
        {dateLabel}
      </p>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
            Painel
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-stat-value md:text-4xl">
            Início
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-stat-muted">
            Funil comercial, desempenho mensal e indicadores do time em um só
            lugar.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/dashboard/pipeline"
            className={buttonVariants({ size: "sm" })}
          >
            Abrir pipeline
          </Link>
          <Link
            to="/dashboard/leads"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Ver leads
          </Link>
        </div>
      </div>
    </header>
  )
}
