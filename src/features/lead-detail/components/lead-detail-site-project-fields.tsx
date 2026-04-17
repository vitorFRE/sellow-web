import { IconBrowser, IconLayout } from "@tabler/icons-react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { LeadDetailSiteProjectScopeList } from "@/features/lead-detail/components/lead-detail-site-project-scope-list"
import { LeadDetailSiteProjectStackField } from "@/features/lead-detail/components/lead-detail-site-project-stack-field"
import type { LeadSiteProjectView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  value: LeadSiteProjectView
  onChange: (next: LeadSiteProjectView) => void
  className?: string
}

export function LeadDetailSiteProjectFields({ value, onChange, className }: Props) {
  return (
    <div className={cn("space-y-4", className)}>
      <label className="grid gap-1.5 text-sm font-medium">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <IconBrowser className="size-3.5" aria-hidden />
          Nome do pacote / projeto
        </span>
        <Input
          value={value.sitePackageLabel}
          onChange={(e) => onChange({ ...value, sitePackageLabel: e.target.value })}
          placeholder="Ex.: Site institucional + blog"
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        <span className="text-muted-foreground">Resumo da proposta</span>
        <textarea
          value={value.sitePitchLine}
          onChange={(e) => onChange({ ...value, sitePitchLine: e.target.value })}
          rows={3}
          maxLength={2000}
          placeholder="Em uma frase, o que está sendo vendido…"
          className={cn(
            "min-h-18 w-full resize-y rounded-4xl border border-input bg-input/30 px-3 py-2 text-sm outline-none",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          )}
        />
      </label>

      <LeadDetailSiteProjectScopeList value={value} onChange={onChange} />

      <label className="grid gap-1.5 text-sm font-medium">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <IconLayout className="size-3.5" aria-hidden />
          Entregas / revisões
        </span>
        <textarea
          value={value.siteDeliverablesNote}
          onChange={(e) => onChange({ ...value, siteDeliverablesNote: e.target.value })}
          rows={2}
          maxLength={2000}
          placeholder="Ex.: wireframe, 2 rodadas de layout, publicação…"
          className={cn(
            "min-h-18 w-full resize-y rounded-4xl border border-input bg-input/30 px-3 py-2 text-sm outline-none",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          )}
        />
      </label>

      <LeadDetailSiteProjectStackField value={value} onChange={onChange} />
    </div>
  )
}
