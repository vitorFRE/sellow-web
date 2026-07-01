import type { KeyboardEvent } from "react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { LeadListFilterState } from "@/features/leads/types/lead-list-query"

const sortByLabels: Record<LeadListFilterState["sortBy"], string> = {
  updatedAt: "Atualizado em",
  totalScore: "Nota (Google)",
  reviewsCount: "Qtd. avaliações",
}

const hasWebsiteLabels: Record<LeadListFilterState["hasWebsite"], string> = {
  all: "Todos",
  yes: "Com website",
  no: "Sem website",
}

const sortDirLabels: Record<LeadListFilterState["sortDir"], string> = {
  asc: "Crescente",
  desc: "Decrescente",
}

const fieldInputClass =
  "border-stat-card-border bg-stat-card text-stat-value placeholder:text-stat-muted"

const fieldSelectTriggerClass =
  "w-full min-w-0 border-stat-card-border bg-stat-card text-stat-value"

const fieldLabelClass =
  "text-[11px] font-medium tracking-[0.08em] text-stat-label uppercase"

function stopMenuKeyFromStealingInput(e: KeyboardEvent) {
  e.stopPropagation()
}

type Props = {
  value: LeadListFilterState
  onChange: (next: LeadListFilterState) => void
  hideSearch?: boolean
  className?: string
}

export function LeadListFilterFields({
  value,
  onChange,
  hideSearch = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {!hideSearch ? (
        <label className="grid min-w-0 gap-2 sm:col-span-2 lg:col-span-3">
          <span className={fieldLabelClass}>Busca</span>
          <Input
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
            onKeyDown={stopMenuKeyFromStealingInput}
            placeholder="Nome ou telefone"
            maxLength={200}
            className={fieldInputClass}
          />
        </label>
      ) : null}

      <label className="grid min-w-0 gap-2">
        <span className={fieldLabelClass}>Nota mínima</span>
        <Input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value.minTotalScore}
          onChange={(e) =>
            onChange({ ...value, minTotalScore: e.target.value })
          }
          onKeyDown={stopMenuKeyFromStealingInput}
          placeholder="Ex.: 4.0"
          className={fieldInputClass}
        />
      </label>

      <label className="grid min-w-0 gap-2">
        <span className={fieldLabelClass}>Avaliações mínimas</span>
        <Input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value.minReviewsCount}
          onChange={(e) =>
            onChange({ ...value, minReviewsCount: e.target.value })
          }
          onKeyDown={stopMenuKeyFromStealingInput}
          placeholder="Ex.: 10"
          className={fieldInputClass}
        />
      </label>

      <div className="grid min-w-0 gap-2">
        <span className={fieldLabelClass}>Website</span>
        <Select
          value={value.hasWebsite}
          onValueChange={(v) =>
            onChange({
              ...value,
              hasWebsite: v as LeadListFilterState["hasWebsite"],
            })
          }
        >
          <SelectTrigger className={fieldSelectTriggerClass} size="sm">
            <SelectValue>{hasWebsiteLabels[value.hasWebsite]}</SelectValue>
          </SelectTrigger>
          <SelectContent className="border-stat-card-border bg-stat-board text-stat-value">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="yes">Com website</SelectItem>
            <SelectItem value="no">Sem website</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid min-w-0 gap-2">
        <span className={fieldLabelClass}>Ordenar por</span>
        <Select
          value={value.sortBy}
          onValueChange={(v) =>
            onChange({
              ...value,
              sortBy: v as LeadListFilterState["sortBy"],
            })
          }
        >
          <SelectTrigger className={fieldSelectTriggerClass} size="sm">
            <SelectValue>{sortByLabels[value.sortBy]}</SelectValue>
          </SelectTrigger>
          <SelectContent className="border-stat-card-border bg-stat-board text-stat-value">
            {(Object.keys(sortByLabels) as LeadListFilterState["sortBy"][]).map(
              (k) => (
                <SelectItem key={k} value={k}>
                  {sortByLabels[k]}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="grid min-w-0 gap-2">
        <span className={fieldLabelClass}>Ordem</span>
        <Select
          value={value.sortDir}
          onValueChange={(v) =>
            onChange({
              ...value,
              sortDir: v as LeadListFilterState["sortDir"],
            })
          }
        >
          <SelectTrigger className={fieldSelectTriggerClass} size="sm">
            <SelectValue>{sortDirLabels[value.sortDir]}</SelectValue>
          </SelectTrigger>
          <SelectContent className="border-stat-card-border bg-stat-board text-stat-value">
            <SelectItem value="desc">Decrescente</SelectItem>
            <SelectItem value="asc">Crescente</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
