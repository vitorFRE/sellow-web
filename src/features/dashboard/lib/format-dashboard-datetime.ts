/** Data/hora curta para listas do resumo (pt-BR). */
export function formatDashboardDateTime(iso: string): string {
  if (!iso.trim()) return "—"
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}
