import { IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  onOpenCreateLead?: () => void
  className?: string
  canWriteLeads?: boolean
}

export function PipelineHeader({
  onOpenCreateLead,
  className,
  canWriteLeads = true,
}: Props) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 border-b border-border py-5 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="min-w-0 space-y-1">
        <p className="text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
          Comercial
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-stat-value md:text-3xl">
          Pipeline
        </h1>
      </div>

      {canWriteLeads && onOpenCreateLead ? (
        <Button
          type="button"
          size="sm"
          className="shrink-0 gap-2"
          onClick={onOpenCreateLead}
        >
          <IconPlus className="size-4" aria-hidden />
          Novo lead
        </Button>
      ) : null}
    </header>
  )
}
