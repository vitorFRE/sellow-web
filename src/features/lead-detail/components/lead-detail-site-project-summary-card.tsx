import { IconBrowser, IconCode, IconDotsVertical, IconLayout } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { LeadSiteProjectView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  project: LeadSiteProjectView
  onEdit: () => void
  onClear: () => void
  className?: string
}

export function LeadDetailSiteProjectSummaryCard({
  project,
  onEdit,
  onClear,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-border/80 bg-gradient-to-b from-muted/30 to-card/40 p-4 pr-12",
        className
      )}
    >
      <div className="absolute top-3 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="h-8 w-8"
                aria-label="Menu do projeto"
              />
            }
          >
            <IconDotsVertical className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-44">
            <DropdownMenuItem onClick={onEdit}>Editar projeto</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={onClear}>
              Limpar projeto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background/80 text-primary">
          <IconBrowser className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Projeto</p>
          <p className="mt-0.5 font-medium text-foreground">
            {project.sitePackageLabel.trim() || "Sem título"}
          </p>
          {project.sitePitchLine.trim() ? (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{project.sitePitchLine}</p>
          ) : null}
        </div>
      </div>

      {project.siteScopeBullets.length > 0 ? (
        <ul className="mt-4 space-y-2 border-t border-border/60 pt-3">
          {project.siteScopeBullets.map((line, i) => (
            <li key={i} className="flex gap-2 text-sm leading-snug text-foreground">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/80" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {project.siteDeliverablesNote.trim() ? (
        <p className="mt-3 flex items-start gap-2 rounded-lg border border-dashed border-border/80 bg-muted/20 p-2.5 text-xs text-muted-foreground">
          <IconLayout className="mt-0.5 size-3.5 shrink-0 text-foreground/70" aria-hidden />
          <span>{project.siteDeliverablesNote}</span>
        </p>
      ) : null}

      {project.siteStackNote.trim() ? (
        <p className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
          <IconCode className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          <span>{project.siteStackNote}</span>
        </p>
      ) : null}
    </div>
  )
}
