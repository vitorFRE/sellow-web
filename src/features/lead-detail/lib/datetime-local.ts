/** Valor para `input type="datetime-local"` a partir de ISO UTC. */
export function toDatetimeLocalInputValue(iso: string): string {
  if (!iso.trim()) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const h = String(d.getHours()).padStart(2, "0")
  const min = String(d.getMinutes()).padStart(2, "0")
  return `${y}-${m}-${day}T${h}:${min}`
}

/** ISO a partir do valor do `datetime-local` (interpretado no fuso local). */
export function fromDatetimeLocalInputValue(local: string): string {
  const t = local.trim()
  if (!t) return ""
  const d = new Date(t)
  if (Number.isNaN(d.getTime())) return ""
  return d.toISOString()
}
