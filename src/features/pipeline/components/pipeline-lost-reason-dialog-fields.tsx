import type { UseQueryResult } from "@tanstack/react-query"

import { HttpError } from "@/features/auth/api/auth-api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { LossReason } from "@/features/settings/types/loss-reason"
import { cn } from "@/lib/utils"

const NO_REASON = "__none__"

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
  const is403 =
    reasonsQuery.error instanceof HttpError &&
    reasonsQuery.error.status === 403

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
        {reasonsQuery.error instanceof HttpError
          ? reasonsQuery.error.message
          : "Não foi possível carregar os motivos."}
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

  const selectValue = reasonId === "" ? NO_REASON : reasonId

  return (
    <>
      <div className="grid gap-1.5 text-sm font-medium">
        Motivo de perda
        <Select
          value={selectValue}
          disabled={isPending}
          required
          onValueChange={(v) =>
            onReasonChange(v === NO_REASON ? "" : v)
          }
        >
          <SelectTrigger
            className="w-full"
            aria-required
          >
            <SelectValue placeholder="Selecione…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={NO_REASON}>Selecione…</SelectItem>
            {reasonsQuery.data.map((r) => (
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
