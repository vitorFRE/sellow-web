import { IconNotes } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  value: string
  onChange: (value: string) => void
  onSave: () => void
  onCancel: () => void
  dirty: boolean
  className?: string
}

export function LeadDetailNotesEditor({
  value,
  onChange,
  onSave,
  onCancel,
  dirty,
  className,
}: Props) {
  return (
    <section className={cn("space-y-3", className)}>
      <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <IconNotes className="size-3.5" aria-hidden />
        Anotações
      </h3>
      <label className="grid gap-1.5 text-sm font-medium">
        <span className="text-muted-foreground">Texto livre</span>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          maxLength={8000}
          placeholder="Briefing do site, objeções, próximos passos com o cliente…"
          className={cn(
            "min-h-40 w-full resize-y rounded-4xl border border-input bg-input/30 px-3 py-2 text-sm outline-none transition-colors",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          )}
        />
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" size="sm" onClick={onSave} disabled={!dirty}>
          Salvar anotações
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onCancel} disabled={!dirty}>
          Cancelar
        </Button>
        {dirty ? (
          <span className="text-[11px] text-muted-foreground">Alterações não salvas</span>
        ) : null}
      </div>
    </section>
  )
}
