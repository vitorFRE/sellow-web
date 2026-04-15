import { IconFilter, IconPlus } from "@tabler/icons-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Props = {
  onOpenCreateLead: () => void
}

export function PipelineToolbar({ onOpenCreateLead }: Props) {
  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-background/95 px-1 pb-3">
      <h1 className="text-base font-semibold tracking-tight md:text-lg">
        Pipeline
      </h1>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            type="button"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon-sm" }),
              "rounded-2xl"
            )}
            aria-label="Filtros do pipeline"
          >
            <IconFilter className="size-4" aria-hidden />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Filtros</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>Por status (em breve)</DropdownMenuItem>
              <DropdownMenuItem disabled>Por origem (em breve)</DropdownMenuItem>
              <DropdownMenuItem disabled>Por cidade (em breve)</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          type="button"
          size="sm"
          className="gap-2 rounded-2xl"
          onClick={onOpenCreateLead}
        >
          <IconPlus className="size-4" aria-hidden />
          Novo lead
        </Button>
      </div>
    </header>
  )
}
