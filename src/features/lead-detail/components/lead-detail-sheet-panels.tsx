import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Lead } from "@/features/leads/types/lead"
import { LeadDetailResumoTab } from "@/features/lead-detail/components/lead-detail-resumo-tab"
import { LeadDetailTrackingTab } from "@/features/lead-detail/components/lead-detail-tracking-tab"

type Props = {
  lead: Lead
}

export function LeadDetailSheetPanels({ lead }: Props) {
  return (
    <Tabs defaultValue="acompanhamento" className="min-w-0 gap-0">
      <div className="sticky top-0 z-10 border-b border-border/80 bg-popover/95 px-6 py-3 backdrop-blur-sm">
        <TabsList variant="line" className="h-auto w-full min-w-0 justify-stretch gap-0 p-0">
          <TabsTrigger value="resumo" className="min-w-0 flex-1 rounded-none py-2.5 text-xs sm:text-sm">
            Resumo
          </TabsTrigger>
          <TabsTrigger value="acompanhamento" className="min-w-0 flex-1 rounded-none py-2.5 text-xs sm:text-sm">
            Acompanhamento
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="resumo" className="mt-0 min-h-[40vh] min-w-0 max-w-full p-6 pt-5">
        <LeadDetailResumoTab key={lead.id} lead={lead} />
      </TabsContent>

      <TabsContent value="acompanhamento" className="mt-0 min-h-[40vh] min-w-0 max-w-full p-6 pt-5">
        <LeadDetailTrackingTab key={lead.id} leadId={lead.id} />
      </TabsContent>
    </Tabs>
  )
}
