import type { LeadDetailView, LeadSiteProjectView } from "@/features/lead-detail/types/lead-detail-view"

/** Valor do `<select>` quando a stack não bate com nenhuma opção fixa. */
export const STACK_SELECT_OTHER = "__stack_outro__"

export const STACK_PRESETS: ReadonlyArray<{ label: string; note: string }> = [
  { label: "React + Vite", note: "React + Vite — SPA ou site estático" },
  { label: "Next.js", note: "Next.js — App Router, SSR/ISR" },
  { label: "WordPress", note: "WordPress — tema, plugins, WooCommerce" },
  { label: "Webflow / no-code", note: "Webflow ou construtor visual (low-code)" },
  { label: "HTML + CSS + JS", note: "HTML, CSS e JavaScript (site leve)" },
  { label: "Laravel + Blade", note: "Laravel + Blade ou Inertia + Vue/React" },
]

export function stackSelectFormValue(note: string): string {
  const t = note.trim()
  if (!t) return ""
  const hit = STACK_PRESETS.find((p) => p.note === t)
  if (hit) return hit.note
  return STACK_SELECT_OTHER
}

export const EMPTY_SITE_PROJECT: LeadSiteProjectView = {
  sitePackageLabel: "",
  sitePitchLine: "",
  siteScopeBullets: [],
  siteDeliverablesNote: "",
  siteStackNote: "",
}

export function extractSiteProject(detail: LeadDetailView): LeadSiteProjectView {
  return {
    sitePackageLabel: detail.sitePackageLabel,
    sitePitchLine: detail.sitePitchLine,
    siteScopeBullets: [...detail.siteScopeBullets],
    siteDeliverablesNote: detail.siteDeliverablesNote,
    siteStackNote: detail.siteStackNote,
  }
}

export function hasSiteProjectContent(p: LeadSiteProjectView): boolean {
  return Boolean(
    p.sitePackageLabel.trim() ||
      p.sitePitchLine.trim() ||
      p.siteScopeBullets.some((b) => b.trim()) ||
      p.siteDeliverablesNote.trim() ||
      p.siteStackNote.trim()
  )
}

export function isSiteProjectDirty(a: LeadSiteProjectView, b: LeadSiteProjectView): boolean {
  if (a.sitePackageLabel !== b.sitePackageLabel) return true
  if (a.sitePitchLine !== b.sitePitchLine) return true
  if (a.siteDeliverablesNote !== b.siteDeliverablesNote) return true
  if (a.siteStackNote !== b.siteStackNote) return true
  if (a.siteScopeBullets.length !== b.siteScopeBullets.length) return true
  return a.siteScopeBullets.some((line, i) => line !== b.siteScopeBullets[i])
}
