import * as React from "react"
import { IconArrowLeft, IconDotsVertical, IconPencil } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditLeadModal } from "@/features/leads/components/edit-lead-form"
import { SendToImportedDialog } from "@/features/pipeline/components/send-to-imported-dialog"
import type { Lead, LeadStatus } from "@/features/leads/types/lead"
import { cn } from "@/lib/utils"
import { leadLinkIconClass } from "@/features/leads/lib/lead-link-utils"

function stopPropagation(e: React.SyntheticEvent) {
  e.stopPropagation()
}

type Props = {
  lead: Lead
  columnStatus: LeadStatus
  onConfirm: (id: string, fromStatus: LeadStatus) => void
  onSuppressCardClick?: () => void
  disabled?: boolean
  isPending?: boolean
}

export function PipelineCardActions({
  lead,
  columnStatus,
  onConfirm,
  onSuppressCardClick,
  disabled,
  isPending,
}: Props) {
  const [editOpen, setEditOpen] = React.useState(false)
  const [devolverOpen, setDevolverOpen] = React.useState(false)

  const openEdit = React.useCallback(() => {
    onSuppressCardClick?.()
    setEditOpen(true)
  }, [onSuppressCardClick])

  const openDevolver = React.useCallback(() => {
    onSuppressCardClick?.()
    setDevolverOpen(true)
  }, [onSuppressCardClick])

  const handleDevolver = React.useCallback(() => {
    onSuppressCardClick?.()
    onConfirm(lead.id, columnStatus)
    setDevolverOpen(false)
  }, [columnStatus, lead.id, onConfirm, onSuppressCardClick])

  return (
    <div data-pipeline-card-interactive onPointerDown={stopPropagation} onClick={stopPropagation}>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={disabled || isPending}
          onPointerDown={stopPropagation}
          onClick={stopPropagation}
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className={cn(leadLinkIconClass, "size-7")}
              aria-label="Ações do lead"
            />
          }
        >
          <IconDotsVertical className="size-3.5" aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-36">
          <DropdownMenuItem
            onClick={(e) => {
              stopPropagation(e)
              openEdit()
            }}
          >
            <IconPencil />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              stopPropagation(e)
              openDevolver()
            }}
          >
            <IconArrowLeft />
            Devolver
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditLeadModal lead={lead} open={editOpen} onOpenChange={setEditOpen} />

      <SendToImportedDialog
        open={devolverOpen}
        onOpenChange={setDevolverOpen}
        leadName={lead.name}
        isPending={isPending}
        onConfirm={handleDevolver}
      />
    </div>
  )
}
