import type { Lead, LeadStatus } from "@/features/leads/types/lead"
import type { LeadDetailView } from "@/features/lead-detail/types/lead-detail-view"
import { PIPELINE_COLUMN_LABELS } from "@/features/pipeline/config/pipeline-columns"

function pickTemperature(score: number | null): LeadDetailView["temperatureLabel"] {
  if (score == null) return "Morno"
  if (score >= 4.2) return "Quente"
  if (score >= 3) return "Morno"
  return "Frio"
}

export function buildMockLeadDetail(lead: Lead, columnStatus: LeadStatus): LeadDetailView {
  const stage = PIPELINE_COLUMN_LABELS[columnStatus]
  const scoreN =
    lead.totalScore != null && Number.isFinite(Number(lead.totalScore))
      ? Number(lead.totalScore)
      : null

  const budgetHint = lead.budget
    ? `Investimento alvo mencionado: ${lead.budget} (site + implantação).`
    : "Ainda sem faixa de investimento — qualificar pacote (Essencial vs. Growth)."

  return {
    headline: lead.name,
    pipelineStageLabel: stage,
    temperatureLabel: pickTemperature(scoreN),
    sitePackageLabel: "Site institucional + blog + formulário com CRM",
    sitePitchLine:
      "Negócio focado em vender presença digital: site rápido, responsivo e preparado para captar orçamentos pelo WhatsApp.",
    siteScopeBullets: [
      "Home com proposta de valor, prova social (Google) e CTA para orçamento.",
      "Páginas de serviços com SEO on-page básico e URLs amigáveis.",
      "Blog para conteúdo orgânico + integração de formulários com disparo para a equipe comercial.",
      "Painel simples para editar textos/imagens sem depender de dev a cada ajuste (mock).",
    ],
    siteDeliverablesNote:
      "Wireframe + UI kit, até 2 rodadas de revisão de layout, publicação e treinamento rápido de uso.",
    siteStackNote:
      "Stack sugerida (mock): React/Vite ou WordPress headless, hospedagem com SSL e analytics configurado.",
    activity: [
      {
        id: `${lead.id}-a1`,
        at: lead.updatedAt,
        title: "Pipeline atualizado",
        detail: `Etapa comercial: ${stage}. Próximo foco: fechar escopo do site.`,
        kind: "status",
      },
      {
        id: `${lead.id}-a2`,
        at: lead.updatedAt,
        title: "Proposta comercial enviada (PDF)",
        detail: "Pacote institucional 5 páginas + formulário + 30 dias de ajustes finos (mock).",
        kind: "email",
      },
      {
        id: `${lead.id}-a3`,
        at: lead.createdAt,
        title: "Ligação de qualificação — venda de site",
        detail:
          "Decisor quer site novo em 45 dias; preocupação principal: aparecer no Google e receber leads qualificados.",
        kind: "call",
      },
      {
        id: `${lead.id}-a4`,
        at: lead.createdAt,
        title: "Lead importado para o funil",
        detail: lead.source
          ? `Origem: ${lead.source}. Contexto: prospecção para projeto web.`
          : "Origem não informada — tratar como inbound frio para oferta de site.",
        kind: "system",
      },
    ],
    notes: [
      "Cliente com site antigo em Flash/HTML estático; quer redesign com Core Web Vitals ok no mobile.",
      budgetHint,
      "Conteúdo: eles enviam textos em 1 semana; nossa equipe propõe estrutura de sitemap e CTAs.",
    ],
    followUp: {
      nextContactAt: new Date(Date.now() + 3 * 86400000).toISOString(),
      channel: "Ligação",
      ownerLabel: "SDR — fila de demos de site (mock)",
      reminder: "Demonstrar protótipo da home + fluxo do formulário → WhatsApp da equipe.",
    },
  }
}
