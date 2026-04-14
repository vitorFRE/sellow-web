import * as React from "react"
import { IconDotsVertical, IconTrash } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteLeadDialog } from "@/features/leads/components/delete-lead-dialog"
import type { Lead } from "@/features/leads/types/lead"

type Props = {
  lead: Lead
  onDelete: (id: string) => void
  disabled?: boolean
}

export function LeadsRowActions({ lead, onDelete, disabled }: Props) {
  const [dialogOpen, setDialogOpen] = React.useState(false)

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
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setDialogOpen(true)}
          >
            <IconTrash />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteLeadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        leadName={lead.name}
        onConfirm={() => onDelete(lead.id)}
      />
    </>
  )
}
