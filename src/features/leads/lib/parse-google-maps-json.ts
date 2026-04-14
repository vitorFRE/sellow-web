import type {
  GoogleMapsImportItem,
  GoogleMapsImportPayload,
} from "@/features/leads/types/google-maps-import"

const MAX_ITEMS = 500

export type ParseImportJsonResult =
  | { ok: true; data: GoogleMapsImportPayload }
  | { ok: false; error: string }

export function parseGoogleMapsImportJson(text: string): ParseImportJsonResult {
  const trimmed = text.trim()
  if (!trimmed) {
    return { ok: false, error: "Cole ou carregue um JSON." }
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(trimmed) as unknown
  } catch {
    return { ok: false, error: "JSON inválido: sintaxe incorreta." }
  }

  let items: unknown[]

  if (Array.isArray(parsed)) {
    items = parsed
  } else if (parsed !== null && typeof parsed === "object" && "items" in parsed) {
    const raw = (parsed as { items: unknown }).items
    if (!Array.isArray(raw)) {
      return {
        ok: false,
        error: 'O objeto precisa da propriedade "items" com um array.',
      }
    }
    items = raw
  } else {
    return {
      ok: false,
      error: 'Use um array de itens ou um objeto { "items": [...] }.',
    }
  }

  if (items.length === 0) {
    return { ok: false, error: "A lista de itens está vazia." }
  }

  if (items.length > MAX_ITEMS) {
    return {
      ok: false,
      error: `No máximo ${MAX_ITEMS} itens por importação (recebido: ${items.length}).`,
    }
  }

  return {
    ok: true,
    data: { items: items as GoogleMapsImportItem[] },
  }
}
