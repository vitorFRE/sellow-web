import { Link } from "@tanstack/react-router"
import { IconFileImport } from "@tabler/icons-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

export function ImportedLeadsHeader({ className }: Props) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
            Importação
          </p>
          <span className="rounded-full border border-stat-card-border bg-muted px-2.5 py-0.5 text-[10px] font-medium tracking-[0.12em] text-stat-muted uppercase">
            Só importados
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-stat-value md:text-3xl">
          Leads importados
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-stat-muted">
          Leads vindos do Google Maps com status{" "}
          <span className="font-medium text-stat-value">Importado</span>. Envie
          ao pipeline para entrar como{" "}
          <span className="font-medium text-stat-value">Novo</span> e iniciar o
          fluxo comercial.
        </p>
      </div>

      <Link
        to="/dashboard/importar"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <IconFileImport className="size-4" aria-hidden />
        Importar JSON
      </Link>
    </header>
  )
}
