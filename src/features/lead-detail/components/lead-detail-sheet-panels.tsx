import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Lead } from "@/features/leads/types/lead"
import { LeadDetailActivityLog } from "@/features/lead-detail/components/lead-detail-activity-log"
import { LeadDetailResumoTab } from "@/features/lead-detail/components/lead-detail-resumo-tab"
import { LeadDetailTrackingTab } from "@/features/lead-detail/components/lead-detail-tracking-tab"
import type { LeadDetailView } from "@/features/lead-detail/types/lead-detail-view"

type Props = {
  lead: Lead
  detail: LeadDetailView
}

export function LeadDetailSheetPanels({ lead, detail }: Props) {
  return (
    <Tabs defaultValue="resumo" className="gap-0">
      <div className="sticky top-0 z-10 border-b border-border/80 bg-popover/95 px-6 py-3 backdrop-blur-sm">
        <TabsList variant="line" className="h-auto w-full min-w-0 justify-stretch gap-0 p-0">
          <TabsTrigger value="resumo" className="min-w-0 flex-1 rounded-none py-2.5 text-xs sm:text-sm">
            Resumo
          </TabsTrigger>
          <TabsTrigger value="acompanhamento" className="min-w-0 flex-1 rounded-none py-2.5 text-xs sm:text-sm">
            Acompanhamento
          </TabsTrigger>
          <TabsTrigger value="historico" className="min-w-0 flex-1 rounded-none py-2.5 text-xs sm:text-sm">
            Histórico
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="resumo" className="mt-0 min-h-[40vh] p-6 pt-5">
        <LeadDetailResumoTab key={lead.id} lead={lead} detail={detail} />
      </TabsContent>

      <TabsContent value="acompanhamento" className="mt-0 min-h-[40vh] p-6 pt-5">
        <LeadDetailTrackingTab key={lead.id} detail={detail} />
      </TabsContent>

      <TabsContent value="historico" className="mt-0 min-h-[40vh] p-6 pt-5">
        <LeadDetailActivityLog items={detail.activity} />
      </TabsContent>
    </Tabs>
  )
}
