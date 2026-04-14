import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  type OnChangeFn,
  type PaginationState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createLeadsColumns } from "@/features/leads/components/leads-columns"
import { LeadsTablePagination } from "@/features/leads/components/leads-table-pagination"
import type { Lead } from "@/features/leads/types/lead"

type Props = {
  data: Lead[]
  isLoading: boolean
  total: number
  pageCount: number
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
  onDeleteLead: (id: string) => void
  deletingLeadId: string | null
}

export function LeadsDataTable({
  data,
  isLoading,
  total,
  pageCount,
  pagination,
  onPaginationChange,
  onDeleteLead,
  deletingLeadId,
}: Props) {
  const columns = React.useMemo(
    () => createLeadsColumns({ onDeleteLead, deletingLeadId }),
    [onDeleteLead, deletingLeadId]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: total,
    pageCount: Math.max(pageCount, 1),
    onPaginationChange,
    state: {
      pagination,
    },
  })

  const colCount = columns.length

  return (
    <div className="min-w-0 overflow-x-auto rounded-4xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={colCount}
                className="h-32 text-center text-muted-foreground"
              >
                Carregando leads...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={colCount}
                className="h-24 text-center text-muted-foreground"
              >
                Nenhum lead encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <LeadsTablePagination table={table} total={total} />
    </div>
  )
}
