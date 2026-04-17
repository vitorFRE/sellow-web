import { IconPlus, IconTrash } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { LeadSiteProjectView } from "@/features/lead-detail/types/lead-detail-view"

const MAX_SCOPE_ITEMS = 16

type Props = {
  value: LeadSiteProjectView
  onChange: (next: LeadSiteProjectView) => void
}

export function LeadDetailSiteProjectScopeList({ value, onChange }: Props) {
  const bullets = value.siteScopeBullets

  const updateAt = (index: number, text: string) => {
    const next = [...bullets]
    next[index] = text
    onChange({ ...value, siteScopeBullets: next })
  }

  const removeAt = (index: number) => {
    onChange({
      ...value,
      siteScopeBullets: bullets.filter((_, i) => i !== index),
    })
  }

  const addRow = () => {
    if (bullets.length >= MAX_SCOPE_ITEMS) return
    onChange({ ...value, siteScopeBullets: [...bullets, ""] })
  }

  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium text-muted-foreground">Escopo (cada linha é um item)</span>

      {bullets.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border/80 bg-muted/10 px-3 py-4 text-xs text-muted-foreground">
          Nenhum item ainda. Use o botão abaixo para adicionar o primeiro ponto do escopo.
        </p>
      ) : (
        <ul className="grid gap-2">
          {bullets.map((line, i) => (
            <li key={i} className="flex min-w-0 items-center gap-2">
              <span className="w-6 shrink-0 text-center text-xs tabular-nums text-muted-foreground">
                {i + 1}.
              </span>
              <Input
                value={line}
                onChange={(e) => updateAt(i, e.target.value)}
                placeholder={`Ex.: página ${i + 1} ou funcionalidade`}
                className="min-w-0 flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="shrink-0 text-muted-foreground hover:text-destructive"
                aria-label={`Remover item ${i + 1}`}
                onClick={() => removeAt(i)}
              >
                <IconTrash className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit gap-1.5"
        onClick={addRow}
        disabled={bullets.length >= MAX_SCOPE_ITEMS}
      >
        <IconPlus className="size-4" aria-hidden />
        Adicionar item
      </Button>
    </div>
  )
}
