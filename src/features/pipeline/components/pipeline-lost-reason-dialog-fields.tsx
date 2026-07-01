import type { UseQueryResult } from "@tanstack/react-query"

import { isAdminForbidden, getApiErrorMessage } from "@/shared/lib/api-errors"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { LossReason } from "@/features/settings/types/loss-reason"
import { cn } from "@/lib/utils"

type Query = UseQueryResult<LossReason[], Error>

type Props = {
  reasonsQuery: Query
  reasonId: string
  note: string
  isPending: boolean
  onReasonChange: (id: string) => void
  onNoteChange: (v: string) => void
}

export function PipelineLostReasonDialogFields({
  reasonsQuery,
  reasonId,
  note,
  isPending,
  onReasonChange,
  onNoteChange,
}: Props) {
  const is403 = isAdminForbidden(reasonsQuery.error)

  if (is403) {
    return (
      <p className="text-sm text-muted-foreground">
        Apenas administradores podem carregar motivos de perda. Peça acesso ou
        use outro fluxo.
      </p>
    )
  }
  if (reasonsQuery.isError) {
    return (
      <p className="text-sm text-destructive">
        {getApiErrorMessage(
          reasonsQuery.error,
          "Não foi possível carregar os motivos."
        )}
      </p>
    )
  }
  if (reasonsQuery.isLoading) {
    return (
      <p className="text-sm text-muted-foreground">Carregando motivos…</p>
    )
  }
  if (!reasonsQuery.data?.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhum motivo de perda cadastrado. Cadastre em Configurações antes de
        mover leads para Perdido.
      </p>
    )
  }

  const reasons = reasonsQuery.data
  const selectedReason = reasons.find((r) => r.id === reasonId)

  return (
    <>
      <div className="grid gap-1.5 text-sm font-medium">
        Motivo de perda
        <Select
          value={reasonId || undefined}
          disabled={isPending}
          required
          onValueChange={(v) => {
            if (v) onReasonChange(v)
          }}
        >
          <SelectTrigger
            className="w-full"
            aria-required
          >
            <SelectValue placeholder="Selecione…">
              {selectedReason?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {reasons.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <label className="grid gap-1.5 text-sm font-medium">
        <span className="text-muted-foreground">Nota (opcional)</span>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          rows={2}
          maxLength={2000}
          disabled={isPending}
          placeholder="Detalhes adicionais sobre a perda"
          className={cn(
            "min-h-16 w-full resize-y rounded-4xl border border-input bg-input/30 px-3 py-2 text-sm outline-none transition-colors",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          )}
        />
      </label>
    </>
  )
}
