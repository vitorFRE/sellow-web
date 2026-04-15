import type { Lead } from "@/features/leads/types/lead"

export function formatLeadBudget(budget: Lead["budget"]): string | null {
  if (budget == null || budget === "") return null
  if (typeof budget === "number") {
    return budget.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    })
  }
  return String(budget)
}

export function formatLeadUpdatedAt(iso: string): string | null {
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

export function formatLeadLocation(lead: Lead): string | null {
  const parts = [lead.city, lead.state].filter(Boolean)
  return parts.length ? parts.join(" · ") : null
}
