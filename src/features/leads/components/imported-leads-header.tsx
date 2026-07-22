import { Link } from "@tanstack/react-router"
import { IconFileImport } from "@tabler/icons-react"

import { buttonVariants } from "@/components/ui/button"
import {
  LeadsViewToggle,
  type LeadsViewMode,
} from "@/features/leads/components/leads-view-toggle"
import { cn } from "@/lib/utils"

type Props = {
  viewMode: LeadsViewMode
  onViewModeChange: (mode: LeadsViewMode) => void
  className?: string
}

export function ImportedLeadsHeader({
  viewMode,
  onViewModeChange,
  className,
}: Props) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5 border-b border-border pb-5",
        className
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
            Importação
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-stat-value md:text-3xl">
            Leads importados
          </h1>
        </div>

        <Link
          to="/dashboard/importar"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <IconFileImport className="size-4" aria-hidden />
          Importar
        </Link>
      </div>

      <LeadsViewToggle mode={viewMode} onModeChange={onViewModeChange} />
    </header>
  )
}
