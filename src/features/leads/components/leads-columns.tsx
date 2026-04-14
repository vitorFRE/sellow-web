import type { ColumnDef } from "@tanstack/react-table"

import { LeadNameCell } from "@/features/leads/components/lead-name-cell"
import { LeadStatusBadge } from "@/features/leads/components/lead-status-badge"
import { LeadsRowActions } from "@/features/leads/components/leads-row-actions"
import { LeadMapsCell } from "@/features/leads/components/lead-maps-cell"
import { LeadWebsiteCell } from "@/features/leads/components/lead-website-cell"
import type { Lead, LeadStatus } from "@/features/leads/types/lead"

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

export type LeadsColumnsOptions = {
  onDeleteLead: (id: string) => void
  deletingLeadId: string | null
}

export function createLeadsColumns(
  options: LeadsColumnsOptions
): ColumnDef<Lead>[] {
  const { onDeleteLead, deletingLeadId } = options

  return [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => <LeadNameCell lead={row.original} />,
    },
    {
      accessorKey: "phone",
      header: "Telefone",
      cell: ({ row }) => {
        const v = row.getValue("phone") as string | null
        return <span>{v?.trim() ? v : "—"}</span>
      },
    },
    {
      id: "local",
      header: "Cidade / UF",
      cell: ({ row }) => {
        const city = row.original.city?.trim()
        const state = row.original.state?.trim()
        if (!city && !state) {
          return <span className="text-muted-foreground">—</span>
        }
        return (
          <span className="text-muted-foreground">
            {[city, state].filter(Boolean).join(" · ")}
          </span>
        )
      },
    },
    {
      accessorKey: "source",
      header: "Origem",
      cell: ({ row }) => {
        const v = row.getValue("source") as string | null
        return (
          <span className="text-muted-foreground">{v?.trim() ? v : "—"}</span>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <LeadStatusBadge status={row.getValue("status") as LeadStatus} />
      ),
    },
    {
      id: "website",
      header: "Site",
      cell: ({ row }) => <LeadWebsiteCell lead={row.original} />,
    },
    {
      id: "mapsUrl",
      header: "Maps",
      cell: ({ row }) => <LeadMapsCell lead={row.original} />,
    },
    {
      accessorKey: "createdAt",
      header: "Criado em",
      cell: ({ row }) => formatDate(row.getValue("createdAt")),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Ações</span>,
      cell: ({ row }) => (
        <LeadsRowActions
          lead={row.original}
          onDelete={onDeleteLead}
          disabled={deletingLeadId === row.original.id}
        />
      ),
      enableSorting: false,
      size: 48,
    },
  ]
}
