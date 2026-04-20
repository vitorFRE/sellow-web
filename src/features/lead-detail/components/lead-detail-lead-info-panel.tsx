import type { ReactNode } from "react"

import type { Lead } from "@/features/leads/types/lead"
import { normalizeLeadHref } from "@/features/leads/lib/lead-link-utils"
import {
  formatLeadBudget,
  formatLeadLocation,
} from "@/features/pipeline/lib/format-lead-card-meta"
import { PIPELINE_COLUMN_LABELS } from "@/features/pipeline/config/pipeline-columns"
import { cn } from "@/lib/utils"

function formatDateTimePt(iso: string): string {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(iso))
  } catch {
    return "—"
  }
}

function formatScore(value: number) {
  if (Number.isInteger(value)) return String(value)
  return value.toFixed(1)
}

function displayText(value: string | null | undefined): string {
  const t = value?.trim()
  return t ? t : "—"
}

/** Texto “colado” (ex.: URL) muito longo: mostra só o início; frases com espaço deixam o CSS quebrar. */
function linkVisibleLabel(raw: string, maxUnbroken = 88): { visible: string; title: string } {
  const full = raw.trim()
  if (full.length <= maxUnbroken) return { visible: full, title: full }
  if (/\s/.test(full)) return { visible: full, title: full }
  return {
    visible: `${full.slice(0, Math.max(12, maxUnbroken - 1))}…`,
    title: full,
  }
}

function LeadDetailExternalLink({ href, label }: { href: string; label: string }) {
  const { visible, title } = linkVisibleLabel(label)
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
      className="block min-w-0 max-w-full wrap-anywhere text-primary underline-offset-4 hover:underline"
    >
      {visible}
    </a>
  )
}

function DetailSection({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <section className={cn("space-y-2", className)}>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <dl className="grid min-w-0 gap-x-4 gap-y-2 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-y-2.5">
        {children}
      </dl>
    </section>
  )
}

function Row({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <>
      <dt className={cn("text-xs text-muted-foreground sm:pt-0.5", className)}>{label}</dt>
      <dd className="min-w-0 max-w-full text-sm wrap-anywhere text-foreground">
        {children}
      </dd>
    </>
  )
}

type Props = {
  lead: Lead
  className?: string
}

export function LeadDetailLeadInfoPanel({ lead, className }: Props) {
  const statusLabel = PIPELINE_COLUMN_LABELS[lead.status]
  const budget = formatLeadBudget(lead.budget)
  const location = formatLeadLocation(lead)
  const mapsHref = normalizeLeadHref(lead.url)
  const websiteHref = normalizeLeadHref(lead.website)
  const scoreN =
    lead.totalScore != null && !Number.isNaN(Number(lead.totalScore))
      ? Number(lead.totalScore)
      : null
  const reviewsN =
    lead.reviewsCount != null && !Number.isNaN(Number(lead.reviewsCount))
      ? Number(lead.reviewsCount)
      : null

  const showLossBlock =
    lead.status === "LOST" &&
    (lead.lossReasonId ||
      (lead.lossReason?.trim() ?? "") ||
      (lead.lossReasonNote?.trim() ?? ""))

  return (
    <div className={cn("min-w-0 max-w-full space-y-6", className)}>
      <DetailSection title="Identificação">
        <Row label="Nome">{displayText(lead.name)}</Row>
        <Row label="Categoria">{displayText(lead.categoryName)}</Row>
        <Row label="ID">
          <span className="font-mono text-xs break-all text-muted-foreground">{lead.id}</span>
        </Row>
      </DetailSection>

      <DetailSection title="Contato">
        <Row label="E-mail">{displayText(lead.email)}</Row>
        <Row label="Telefone">{displayText(lead.phone)}</Row>
      </DetailSection>

      <DetailSection title="Funil e origem">
        <Row label="Status">{statusLabel}</Row>
        <Row label="Origem">{displayText(lead.source)}</Row>
      </DetailSection>

      <DetailSection title="Comercial">
        <Row label="Orçamento">{budget ?? "—"}</Row>
        <Row label="Nota (Google)">{scoreN != null ? formatScore(scoreN) : "—"}</Row>
        <Row label="Avaliações">{reviewsN != null ? String(reviewsN) : "—"}</Row>
      </DetailSection>

      <DetailSection title="Localização e presença online">
        <Row label="Cidade / UF">{location ?? "—"}</Row>
        <Row label="Google Place ID">
          {lead.googlePlaceId?.trim() ? (
            <span className="font-mono text-xs break-all">{lead.googlePlaceId}</span>
          ) : (
            "—"
          )}
        </Row>
        <Row label="Link (Maps / origem)">
          {mapsHref ? (
            <LeadDetailExternalLink href={mapsHref} label={lead.url?.trim() || mapsHref} />
          ) : (
            "—"
          )}
        </Row>
        <Row label="Site">
          {websiteHref ? (
            <LeadDetailExternalLink href={websiteHref} label={lead.website?.trim() || websiteHref} />
          ) : (
            "—"
          )}
        </Row>
      </DetailSection>

      <DetailSection title="Registro">
        <Row label="Criado em">{formatDateTimePt(lead.createdAt)}</Row>
        <Row label="Atualizado em">{formatDateTimePt(lead.updatedAt)}</Row>
      </DetailSection>

      {showLossBlock ? (
        <DetailSection title="Motivo da perda">
          <Row label="ID do motivo">
            {lead.lossReasonId?.trim() ? (
              <span className="font-mono text-xs break-all">{lead.lossReasonId}</span>
            ) : (
              "—"
            )}
          </Row>
          <Row label="Motivo">{displayText(lead.lossReason)}</Row>
          <Row label="Observação">
            {lead.lossReasonNote?.trim() ? (
              <span className="min-w-0 max-w-full whitespace-pre-wrap wrap-anywhere">
                {lead.lossReasonNote}
              </span>
            ) : (
              "—"
            )}
          </Row>
        </DetailSection>
      ) : null}
    </div>
  )
}
