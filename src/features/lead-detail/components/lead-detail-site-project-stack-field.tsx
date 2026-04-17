import { IconCode } from "@tabler/icons-react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  STACK_PRESETS,
  STACK_SELECT_OTHER,
  stackSelectFormValue,
} from "@/features/lead-detail/lib/site-project-utils"
import type { LeadSiteProjectView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  value: LeadSiteProjectView
  onChange: (next: LeadSiteProjectView) => void
}

export function LeadDetailSiteProjectStackField({ value, onChange }: Props) {
  const selected = stackSelectFormValue(value.siteStackNote)
  const showCustom = selected === STACK_SELECT_OTHER

  return (
    <div className="grid gap-2">
      <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <IconCode className="size-3.5" aria-hidden />
        Stack / tecnologia
      </span>
      <select
        value={selected}
        onChange={(e) => {
          const v = e.target.value
          if (v === STACK_SELECT_OTHER) {
            onChange({ ...value, siteStackNote: "" })
          } else {
            onChange({ ...value, siteStackNote: v })
          }
        }}
        className={cn(
          "h-9 w-full rounded-4xl border border-input bg-input/30 px-3 text-sm outline-none",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        )}
      >
        <option value="">Escolha uma opção…</option>
        {STACK_PRESETS.map((p) => (
          <option key={p.note} value={p.note}>
            {p.label}
          </option>
        ))}
        <option value={STACK_SELECT_OTHER}>Outra (digitar)</option>
      </select>

      {showCustom ? (
        <Input
          value={value.siteStackNote}
          onChange={(e) => onChange({ ...value, siteStackNote: e.target.value })}
          placeholder="Descreva a stack (ex.: SvelteKit + Supabase)"
        />
      ) : null}
    </div>
  )
}
