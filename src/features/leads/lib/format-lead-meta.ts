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

export function formatLeadLocation(lead: Lead): string | null {
  const parts = [lead.city, lead.state].filter(Boolean)
  return parts.length ? parts.join(" · ") : null
}
