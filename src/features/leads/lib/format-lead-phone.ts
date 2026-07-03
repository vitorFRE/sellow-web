export function formatLeadPhoneCompact(phone: string | null | undefined): string | null {
  const raw = phone?.trim()
  if (!raw) return null

  const digits = raw.replace(/\D/g, "")
  if (digits.startsWith("55") && digits.length >= 12) {
    const ddd = digits.slice(2, 4)
    const rest = digits.slice(4)
    if (rest.length === 9) {
      return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`
    }
    if (rest.length === 8) {
      return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`
    }
  }

  return raw
}
