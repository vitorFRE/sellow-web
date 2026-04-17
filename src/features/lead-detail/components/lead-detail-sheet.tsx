"use client"

import * as React from "react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Lead, LeadStatus } from "@/features/leads/types/lead"
import { LeadDetailSheetPanels } from "@/features/lead-detail/components/lead-detail-sheet-panels"
import { buildMockLeadDetail } from "@/features/lead-detail/lib/build-mock-lead-detail"

type Props = {
  lead: Lead | null
  columnStatus: LeadStatus | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadDetailSheet({ lead, columnStatus, open, onOpenChange }: Props) {
  const detail = React.useMemo(() => {
    if (!lead || !columnStatus) return null
    return buildMockLeadDetail(lead, columnStatus)
  }, [lead, columnStatus])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex h-full max-w-full flex-col gap-0 overflow-hidden p-0 data-[side=right]:w-full data-[side=right]:max-w-full md:data-[side=right]:w-[40vw] md:data-[side=right]:max-w-none"
        aria-describedby={lead ? "lead-detail-desc" : undefined}
      >
        {lead && detail ? (
          <>
            <SheetHeader className="shrink-0 space-y-1 border-b border-border/80 p-6 pb-4 text-left">
              <SheetTitle>Detalhe do lead</SheetTitle>
              <SheetDescription id="lead-detail-desc">
                Funil de venda de site: resumo do projeto, acompanhamento e histórico para {lead.name}.
              </SheetDescription>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <LeadDetailSheetPanels lead={lead} detail={detail} />
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
