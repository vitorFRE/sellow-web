import * as React from "react"
import type { KeyboardEvent } from "react"
import {
  IconChevronDown,
  IconMinus,
  IconRotateClockwise,
  IconX,
} from "@tabler/icons-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FEEDBACK_STATUSES,
  FEEDBACK_STATUS_LABELS,
  FEEDBACK_TYPES,
  FEEDBACK_TYPE_LABELS,
} from "@/features/feedback/lib/feedback-labels"
import {
  countAdvancedFeedbackAdminFilters,
  type FeedbackAdminFilterState,
} from "@/features/feedback/lib/feedback-admin-filters"
import type { Workspace } from "@/features/workspaces/types"
import { cn } from "@/lib/utils"

const statusFilterLabels: Record<FeedbackAdminFilterState["status"], string> = {
  all: "Todos os status",
  ...FEEDBACK_STATUS_LABELS,
}

const typeFilterLabels: Record<FeedbackAdminFilterState["type"], string> = {
  all: "Todas as categorias",
  ...FEEDBACK_TYPE_LABELS,
}

const fieldLabelClass =
  "text-[11px] font-medium tracking-[0.08em] text-stat-label uppercase"

const fieldInputClass =
  "border-stat-card-border bg-stat-card text-stat-value placeholder:text-stat-muted"

const fieldSelectTriggerClass =
  "w-full min-w-0 border-stat-card-border bg-stat-card text-stat-value"

function stopMenuKeyFromStealingInput(e: KeyboardEvent) {
  e.stopPropagation()
}

type Props = {
  value: FeedbackAdminFilterState
  onChange: (next: FeedbackAdminFilterState) => void
  workspaces: Workspace[]
  total?: number
  onClear: () => void
  hasActiveFilters: boolean
  className?: string
}

export function FeedbackAdminFilters({
  value,
  onChange,
  workspaces,
  total,
  onClear,
  hasActiveFilters,
  className,
}: Props) {
  const [open, setOpen] = React.useState(false)
  const advancedCount = countAdvancedFeedbackAdminFilters(value)

  const workspaceLabels = React.useMemo(() => {
    const labels: Record<string, string> = { all: "Todos os workspaces" }
    for (const workspace of workspaces) {
      labels[workspace.id] = workspace.name
    }
    return labels
  }, [workspaces])

  const clearAdvanced = () => {
    onChange({
      ...value,
      status: "all",
      type: "all",
      workspaceId: "all",
      createdFrom: "",
      createdTo: "",
    })
  }

  return (
    <div className={cn("mt-4 space-y-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-stat-muted">
          {total === undefined
            ? "Carregando resultados…"
            : total === 1
              ? "1 feedback encontrado"
              : `${total} feedbacks encontrados`}
        </p>
        {hasActiveFilters ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-stat-muted hover:text-stat-value"
            onClick={onClear}
          >
            <IconX className="size-3.5" aria-hidden />
            Limpar filtros
          </Button>
        ) : null}
      </div>

      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="grid min-w-0 flex-1 gap-2">
            <span className={fieldLabelClass}>Busca</span>
            <Input
              value={value.search}
              onChange={(e) => onChange({ ...value, search: e.target.value })}
              onKeyDown={stopMenuKeyFromStealingInput}
              placeholder="Mensagem, usuário, e-mail ou workspace"
              maxLength={200}
              className={fieldInputClass}
            />
          </label>

          <CollapsibleTrigger
            type="button"
            className="flex h-(--control-height-sm) w-full items-center justify-between gap-3 rounded-lg border border-stat-card-border bg-stat-card px-3 text-sm font-medium text-stat-value transition-colors sm:w-auto sm:min-w-44"
          >
            <span className="flex items-center gap-2">
              Filtros
              {advancedCount > 0 ? (
                <span className="rounded-full border border-stat-card-border bg-muted px-2 py-px font-mono text-[10px] tabular-nums text-stat-muted">
                  {advancedCount}
                </span>
              ) : null}
            </span>
            {open ? (
              <IconMinus className="size-4 shrink-0 text-stat-muted" aria-hidden />
            ) : (
              <IconChevronDown
                className="size-4 shrink-0 text-stat-muted"
                aria-hidden
              />
            )}
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="overflow-hidden pt-3 data-[state=open]:max-h-[min(50vh,24rem)] data-[state=open]:overflow-y-auto">
          <div className="rounded-lg border border-stat-card-border bg-stat-card p-4">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3">
              <p className="text-sm font-medium text-stat-value">
                Refinar resultados
              </p>
              {advancedCount > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-stat-muted hover:text-stat-value"
                  onClick={clearAdvanced}
                >
                  <IconRotateClockwise className="size-3.5" aria-hidden />
                  Limpar
                </Button>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="grid min-w-0 gap-2">
                <span className={fieldLabelClass}>Status</span>
                <Select
                  value={value.status}
                  onValueChange={(next) =>
                    onChange({
                      ...value,
                      status: next as FeedbackAdminFilterState["status"],
                    })
                  }
                >
                  <SelectTrigger className={fieldSelectTriggerClass} size="sm">
                    <SelectValue>{statusFilterLabels[value.status]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="border-stat-card-border bg-stat-board text-stat-value">
                    <SelectItem value="all">Todos os status</SelectItem>
                    {FEEDBACK_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {FEEDBACK_STATUS_LABELS[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid min-w-0 gap-2">
                <span className={fieldLabelClass}>Categoria</span>
                <Select
                  value={value.type}
                  onValueChange={(next) =>
                    onChange({
                      ...value,
                      type: next as FeedbackAdminFilterState["type"],
                    })
                  }
                >
                  <SelectTrigger className={fieldSelectTriggerClass} size="sm">
                    <SelectValue>{typeFilterLabels[value.type]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent className="border-stat-card-border bg-stat-board text-stat-value">
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {FEEDBACK_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {FEEDBACK_TYPE_LABELS[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid min-w-0 gap-2">
                <span className={fieldLabelClass}>Workspace</span>
                <Select
                  value={value.workspaceId}
                  onValueChange={(next) => {
                    if (next == null) return
                    onChange({ ...value, workspaceId: next })
                  }}
                >
                  <SelectTrigger className={fieldSelectTriggerClass} size="sm">
                    <SelectValue>
                      {workspaceLabels[value.workspaceId] ?? "Todos os workspaces"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="border-stat-card-border bg-stat-board text-stat-value">
                    <SelectItem value="all">Todos os workspaces</SelectItem>
                    {workspaces.map((workspace) => (
                      <SelectItem key={workspace.id} value={workspace.id}>
                        {workspace.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <label className="grid min-w-0 gap-2">
                <span className={fieldLabelClass}>Data inicial</span>
                <Input
                  type="date"
                  value={value.createdFrom}
                  onChange={(e) =>
                    onChange({ ...value, createdFrom: e.target.value })
                  }
                  onKeyDown={stopMenuKeyFromStealingInput}
                  className={fieldInputClass}
                />
              </label>

              <label className="grid min-w-0 gap-2">
                <span className={fieldLabelClass}>Data final</span>
                <Input
                  type="date"
                  value={value.createdTo}
                  onChange={(e) =>
                    onChange({ ...value, createdTo: e.target.value })
                  }
                  onKeyDown={stopMenuKeyFromStealingInput}
                  min={value.createdFrom || undefined}
                  className={fieldInputClass}
                />
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
