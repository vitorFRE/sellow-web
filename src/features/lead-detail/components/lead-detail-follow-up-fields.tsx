import { IconBell, IconCalendarClock, IconUser } from "@tabler/icons-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  fromDatetimeLocalInputValue,
  toDatetimeLocalInputValue,
} from "@/features/lead-detail/lib/datetime-local"
import { FOLLOW_UP_CHANNELS } from "@/features/lead-detail/lib/follow-up-form-utils"
import type { LeadFollowUpView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  value: LeadFollowUpView
  onChange: (next: LeadFollowUpView) => void
  className?: string
}

export function LeadDetailFollowUpFields({ value, onChange, className }: Props) {
  const hasSchedule = Boolean(value.nextContactAt.trim())

  return (
    <div className={cn("space-y-4", className)}>
      <label className="grid gap-1.5 text-sm font-medium">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <IconCalendarClock className="size-3.5" aria-hidden />
          Próximo contato
        </span>
        <Input
          type="datetime-local"
          value={hasSchedule ? toDatetimeLocalInputValue(value.nextContactAt) : ""}
          onChange={(e) => {
            const v = e.target.value
            onChange({
              ...value,
              nextContactAt: v ? fromDatetimeLocalInputValue(v) : "",
            })
          }}
        />
        {!hasSchedule ? (
          <span className="text-xs font-normal text-muted-foreground">Sem data e hora definidas.</span>
        ) : null}
      </label>

      <div className="grid gap-1.5 text-sm font-medium">
        <span className="text-muted-foreground">Canal</span>
        <Select
          value={value.channel}
          onValueChange={(v) =>
            onChange({
              ...value,
              channel: v as LeadFollowUpView["channel"],
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FOLLOW_UP_CHANNELS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <label className="grid gap-1.5 text-sm font-medium">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <IconUser className="size-3.5" aria-hidden />
          Responsável
        </span>
        <Input
          value={value.ownerLabel}
          onChange={(e) => onChange({ ...value, ownerLabel: e.target.value })}
          placeholder="Quem fará o contato"
          maxLength={500}
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <IconBell className="size-3.5" aria-hidden />
          Lembrete
        </span>
        <textarea
          value={value.reminder ?? ""}
          onChange={(e) => onChange({ ...value, reminder: e.target.value || undefined })}
          rows={3}
          maxLength={500}
          placeholder="Ex.: demonstrar protótipo da home…"
          className={cn(
            "min-h-18 w-full resize-y rounded-4xl border border-input bg-input/30 px-3 py-2 text-sm outline-none",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          )}
        />
      </label>
    </div>
  )
}
