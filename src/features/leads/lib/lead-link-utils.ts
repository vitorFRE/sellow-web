export const leadLinkIconClass =
  "inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"

export function normalizeLeadHref(raw: string | null | undefined): string | null {
  const t = raw?.trim()
  if (!t) return null
  if (/^https?:\/\//i.test(t)) return t
  try {
    return new URL(`https://${t}`).href
  } catch {
    return null
  }
}
