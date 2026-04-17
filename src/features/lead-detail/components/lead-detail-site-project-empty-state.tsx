import { IconBrowser } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  onCreate: () => void
  className?: string
}

export function LeadDetailSiteProjectEmptyState({ onCreate, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/80 bg-muted/10 px-6 py-10 text-center",
        className
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full border border-border/70 bg-muted/30 text-muted-foreground">
        <IconBrowser className="size-6" aria-hidden />
      </span>
      <div className="max-w-xs space-y-1">
        <p className="text-sm font-medium text-foreground">Nenhum projeto cadastrado</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Registre pacote, escopo e stack do site que você está vendendo para este lead.
        </p>
      </div>
      <Button type="button" size="sm" onClick={onCreate}>
        Criar projeto
      </Button>
    </div>
  )
}
