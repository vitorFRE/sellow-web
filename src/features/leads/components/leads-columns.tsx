import type { ReactNode } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import {
  IconArrowRight,
  IconBrandGoogle,
  IconLink,
  IconLoader2,
  IconMapPin,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { LeadImportReviewCell } from "@/features/leads/components/lead-import-review-cell"
import { LeadLocationCell } from "@/features/leads/components/lead-location-cell"
import { LeadMapsCell } from "@/features/leads/components/lead-maps-cell"
import { LeadNameCell } from "@/features/leads/components/lead-name-cell"
import { LeadPhoneCell } from "@/features/leads/components/lead-phone-cell"
import { LeadSourceCell } from "@/features/leads/components/lead-source-cell"
import { LeadsRowActions } from "@/features/leads/components/leads-row-actions"
import { LeadWebsiteCell } from "@/features/leads/components/lead-website-cell"
import type { ImportReview, Lead } from "@/features/leads/types/lead"

import { formatDateNumericPt } from "@/shared/lib/format-datetime"

const colHeaderClass =
  "text-[11px] tracking-[0.08em] text-stat-label uppercase"

function ColHeader({ children }: { children: ReactNode }) {
  return <span className={colHeaderClass}>{children}</span>
}

function IconColHeader({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <span className="inline-flex items-center justify-center" title={label}>
      <span className="sr-only">{label}</span>
      {children}
    </span>
  )
}

export type LeadsColumnsOptions = {
  onDeleteLead: (id: string) => void
  deletingLeadId: string | null
  variant?: "default" | "imported"
  onPromoteToPipeline?: (id: string) => void
  promotingLeadId?: string | null
  onImportReviewChange?: (id: string, importReview: ImportReview | null) => void
  reviewingLeadId?: string | null
  canWriteLeads?: boolean
  canDeleteLeads?: boolean
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
    onImportReviewChange,
    reviewingLeadId,
    canWriteLeads = true,
    canDeleteLeads = true,
  } = options

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "name",
      header: () => <ColHeader>Nome</ColHeader>,
      cell: ({ row }) => <LeadNameCell lead={row.original} />,
    },
    {
      accessorKey: "phone",
      header: () => <ColHeader>Telefone</ColHeader>,
      cell: ({ row }) => <LeadPhoneCell lead={row.original} />,
      size: 128,
    },
    {
      id: "local",
      header: () => <ColHeader>Local</ColHeader>,
      cell: ({ row }) => <LeadLocationCell lead={row.original} />,
      size: 120,
    },
    {
      accessorKey: "source",
      header: () => (
        <IconColHeader label="Origem">
          <IconBrandGoogle className="size-3.5 text-stat-muted" aria-hidden />
        </IconColHeader>
      ),
      cell: ({ row }) => <LeadSourceCell lead={row.original} />,
      size: 40,
    },
    {
      id: "website",
      header: () => (
        <IconColHeader label="Site">
          <IconLink className="size-3.5 text-stat-muted" aria-hidden />
        </IconColHeader>
      ),
      cell: ({ row }) => <LeadWebsiteCell lead={row.original} />,
      size: 40,
    },
    {
      id: "mapsUrl",
      header: () => (
        <IconColHeader label="Maps">
          <IconMapPin className="size-3.5 text-stat-muted" aria-hidden />
        </IconColHeader>
      ),
      cell: ({ row }) => <LeadMapsCell lead={row.original} />,
      size: 40,
    },
    {
      accessorKey: "createdAt",
      header: () => <ColHeader>Data</ColHeader>,
      cell: ({ row }) => (
        <span className="whitespace-nowrap font-mono text-xs tabular-nums text-stat-muted">
          {formatDateNumericPt(row.getValue("createdAt"))}
        </span>
      ),
      size: 88,
    },
  ]

  if (variant === "imported" && onImportReviewChange) {
    columns.splice(1, 0, {
      id: "importReview",
      header: () => <ColHeader>Triagem</ColHeader>,
      cell: ({ row }) => {
        const busy = reviewingLeadId === row.original.id
        const rowBusy =
          busy ||
          deletingLeadId === row.original.id ||
          promotingLeadId === row.original.id
        return (
          <LeadImportReviewCell
            value={row.original.importReview}
            disabled={rowBusy || !canWriteLeads}
            isPending={busy}
            onChange={(next) => onImportReviewChange(row.original.id, next)}
          />
        )
      },
      enableSorting: false,
      size: 72,
    })
  }

  if (variant === "imported" && onPromoteToPipeline && canWriteLeads) {
    columns.push({
      id: "promote",
      header: () => <ColHeader>Pipeline</ColHeader>,
      cell: ({ row }) => {
        const busy = promotingLeadId === row.original.id
        return (
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            className="size-8"
            disabled={busy || deletingLeadId === row.original.id}
            title="Enviar ao pipeline"
            aria-label="Enviar ao pipeline"
            onClick={() => onPromoteToPipeline(row.original.id)}
          >
            {busy ? (
              <IconLoader2 className="size-3.5 animate-spin" aria-hidden />
            ) : (
              <IconArrowRight className="size-3.5" aria-hidden />
            )}
          </Button>
        )
      },
      enableSorting: false,
      size: 48,
    })
  }

  if (canDeleteLeads) {
    columns.push({
      id: "actions",
      header: () => <span className="sr-only">Ações</span>,
      cell: ({ row }) => (
        <LeadsRowActions
          lead={row.original}
          onDelete={onDeleteLead}
          disabled={
            deletingLeadId === row.original.id ||
            promotingLeadId === row.original.id
          }
        />
      ),
      enableSorting: false,
      size: 40,
    })
  }

  return columns
}
