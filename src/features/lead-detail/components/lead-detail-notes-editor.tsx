import { IconLoader2, IconNotes } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  value: string
  onChange: (value: string) => void
  onSave: () => void
  onCancel: () => void
  dirty: boolean
  isLoading?: boolean
  isSaving?: boolean
  readOnly?: boolean
  className?: string
}

export function LeadDetailNotesEditor({
  value,
  onChange,
  onSave,
  onCancel,
  dirty,
  isLoading = false,
  isSaving = false,
  readOnly = false,
  className,
}: Props) {
  const disabled = isLoading || isSaving || readOnly

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
          disabled={disabled}
          placeholder={
            isLoading
              ? "Carregando anotações…"
              : "Briefing do site, objeções, próximos passos com o cliente…"
          }
          className={cn(
            "min-h-40 w-full resize-y rounded-4xl border border-input bg-input/30 px-3 py-2 text-sm outline-none transition-colors",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
        />
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {!readOnly ? (
          <>
            <Button
              type="button"
              size="sm"
              onClick={onSave}
              disabled={!dirty || disabled}
            >
              {isSaving ? (
                <>
                  <IconLoader2 className="size-3.5 animate-spin" aria-hidden />
                  Salvando…
                </>
              ) : (
                "Salvar anotações"
              )}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onCancel}
              disabled={!dirty || disabled}
            >
              Cancelar
            </Button>
            {dirty ? (
              <span className="text-[11px] text-muted-foreground">
                Alterações não salvas
              </span>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  )
}
