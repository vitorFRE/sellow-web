export function formatDateTimeShortPt(iso: string): string | null {
  if (!iso.trim()) return null
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso))
  } catch {
    return null
  }
}

/** Variante para listas que exibem traço quando a data é inválida ou vazia. */
export function formatDateTimeShortPtOrDash(iso: string): string {
  return formatDateTimeShortPt(iso) ?? "—"
}

export function formatDateTimeFullPt(iso: string): string {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(iso))
  } catch {
    return "—"
  }
}

export function formatDateShortPt(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

/** Data numérica compacta para tabelas (ex.: 02/07/2026). */
export function formatDateNumericPt(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(iso))
}
