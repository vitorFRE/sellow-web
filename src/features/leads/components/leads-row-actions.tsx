import * as React from "react"
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteLeadDialog } from "@/features/leads/components/delete-lead-dialog"
import { EditLeadModal } from "@/features/leads/components/edit-lead-form"
import type { Lead } from "@/features/leads/types/lead"

type Props = {
  lead: Lead
  onDelete: (id: string) => void
  disabled?: boolean
  canWriteLeads?: boolean
  canDeleteLeads?: boolean
}

export function LeadsRowActions({
  lead,
  onDelete,
  disabled,
  canWriteLeads = true,
  canDeleteLeads = true,
}: Props) {
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)

  const hasActions = canWriteLeads || canDeleteLeads
  if (!hasActions) return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={disabled}
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-8 w-8"
              aria-label="Ações do lead"
            />
          }
        >
          <IconDotsVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-36">
          {canWriteLeads ? (
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              <IconPencil />
              Editar
            </DropdownMenuItem>
          ) : null}
          {canDeleteLeads ? (
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setDeleteOpen(true)}
            >
              <IconTrash />
              Excluir
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      <EditLeadModal lead={lead} open={editOpen} onOpenChange={setEditOpen} />

      <DeleteLeadDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        leadName={lead.name}
        onConfirm={() => onDelete(lead.id)}
      />
    </>
  )
}
