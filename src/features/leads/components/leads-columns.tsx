import type { ColumnDef } from "@tanstack/react-table"
import { IconArrowRight, IconLoader2 } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { LeadNameCell } from "@/features/leads/components/lead-name-cell"
import { LeadsRowActions } from "@/features/leads/components/leads-row-actions"
import { LeadMapsCell } from "@/features/leads/components/lead-maps-cell"
import { LeadWebsiteCell } from "@/features/leads/components/lead-website-cell"
import type { Lead } from "@/features/leads/types/lead"

import { formatDateShortPt } from "@/shared/lib/format-datetime"

export type LeadsColumnsOptions = {
  onDeleteLead: (id: string) => void
  deletingLeadId: string | null
  variant?: "default" | "imported"
  onPromoteToPipeline?: (id: string) => void
  promotingLeadId?: string | null
}

export function createLeadsColumns(
  options: LeadsColumnsOptions
): ColumnDef<Lead>[] {
  const {
    onDeleteLead,
    deletingLeadId,
    variant = "default",
    onPromoteToPipeline,
    promotingLeadId,
  } = options

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "name",
      header: () => (
        <span className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
          Nome
        </span>
      ),
      cell: ({ row }) => <LeadNameCell lead={row.original} />,
    },
    {
      accessorKey: "phone",
      header: () => (
        <span className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
          Telefone
        </span>
      ),
      cell: ({ row }) => {
        const v = row.getValue("phone") as string | null
        return (
          <span className="font-mono text-xs tabular-nums text-stat-value">
            {v?.trim() ? v : "—"}
          </span>
        )
      },
    },
    {
      id: "local",
      header: () => (
        <span className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
          Cidade / UF
        </span>
      ),
      cell: ({ row }) => {
        const city = row.original.city?.trim()
        const state = row.original.state?.trim()
        if (!city && !state) {
          return <span className="text-stat-muted">—</span>
        }
        return (
          <span className="text-sm text-stat-muted">
            {[city, state].filter(Boolean).join(" · ")}
          </span>
        )
      },
    },
    {
      accessorKey: "source",
      header: () => (
        <span className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
          Origem
        </span>
      ),
      cell: ({ row }) => {
        const v = row.getValue("source") as string | null
        return (
          <span className="font-mono text-xs text-stat-muted">
            {v?.trim() ? v : "—"}
          </span>
        )
      },
    },
    {
      id: "website",
      header: () => (
        <span className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
          Site
        </span>
      ),
      cell: ({ row }) => <LeadWebsiteCell lead={row.original} />,
    },
    {
      id: "mapsUrl",
      header: () => (
        <span className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
          Maps
        </span>
      ),
      cell: ({ row }) => <LeadMapsCell lead={row.original} />,
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <span className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
          Criado em
        </span>
      ),
      cell: ({ row }) => (
        <span className="text-sm tabular-nums text-stat-muted">
          {formatDateShortPt(row.getValue("createdAt"))}
        </span>
      ),
    },
  ]

  if (variant === "imported" && onPromoteToPipeline) {
    columns.push({
      id: "promote",
      header: () => (
        <span className="text-[11px] tracking-[0.08em] text-stat-label uppercase">
          Pipeline
        </span>
      ),
      cell: ({ row }) => {
        const busy = promotingLeadId === row.original.id
        return (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 gap-1.5 whitespace-nowrap"
            disabled={busy || deletingLeadId === row.original.id}
            onClick={() => onPromoteToPipeline(row.original.id)}
          >
            {busy ? (
              <IconLoader2 className="size-3.5 animate-spin" aria-hidden />
            ) : (
              <IconArrowRight className="size-3.5" aria-hidden />
            )}
            Enviar
          </Button>
        )
      },
      enableSorting: false,
    })
  }

  columns.push({
    id: "actions",
    header: () => <span className="sr-only">Ações</span>,
    cell: ({ row }) => (
      <LeadsRowActions
        lead={row.original}
        onDelete={onDeleteLead}
        disabled={deletingLeadId === row.original.id || promotingLeadId === row.original.id}
      />
    ),
    enableSorting: false,
    size: 48,
  })

  return columns
}
