"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Lead, LeadStatus } from "@/features/leads/types/lead"
import { LeadDetailSheetPanels } from "@/features/lead-detail/components/lead-detail-sheet-panels"

type Props = {
  lead: Lead | null
  columnStatus: LeadStatus | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadDetailSheet({ lead, columnStatus, open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex h-full max-w-full flex-col gap-0 overflow-hidden p-0 data-[side=right]:w-full data-[side=right]:max-w-full md:data-[side=right]:w-[40vw] md:data-[side=right]:max-w-none"
        aria-describedby={lead ? "lead-detail-desc" : undefined}
      >
        {lead && columnStatus ? (
          <>
            <SheetHeader className="shrink-0 space-y-1 border-b border-border/80 p-6 pb-4 text-left min-w-0">
              <SheetTitle>Detalhe do lead</SheetTitle>
              <SheetDescription
                id="lead-detail-desc"
                className="min-w-0 max-w-full wrap-anywhere"
              >
                Dados do lead e acompanhamento para {lead.name}.
              </SheetDescription>
            </SheetHeader>

            <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
              <LeadDetailSheetPanels lead={lead} />
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
