const BR_STATE_TO_UF: Record<string, string> = {
  acre: "AC",
  alagoas: "AL",
  amapá: "AP",
  amapa: "AP",
  amazonas: "AM",
  bahia: "BA",
  ceará: "CE",
  ceara: "CE",
  "distrito federal": "DF",
  "espírito santo": "ES",
  "espirito santo": "ES",
  goiás: "GO",
  goias: "GO",
  maranhão: "MA",
  maranhao: "MA",
  "mato grosso": "MT",
  "mato grosso do sul": "MS",
  "minas gerais": "MG",
  pará: "PA",
  para: "PA",
  paraíba: "PB",
  paraiba: "PB",
  paraná: "PR",
  parana: "PR",
  pernambuco: "PE",
  piauí: "PI",
  piaui: "PI",
  "rio de janeiro": "RJ",
  "rio grande do norte": "RN",
  "rio grande do sul": "RS",
  rondônia: "RO",
  rondonia: "RO",
  roraima: "RR",
  "santa catarina": "SC",
  "são paulo": "SP",
  "sao paulo": "SP",
  sergipe: "SE",
  tocantins: "TO",
}

export function abbreviateBrazilianState(state: string): string {
  const trimmed = state.trim()
  if (!trimmed) return trimmed
  if (/^[A-Za-z]{2}$/.test(trimmed)) return trimmed.toUpperCase()
  return BR_STATE_TO_UF[trimmed.toLowerCase()] ?? trimmed
}

export function formatLeadLocation(
  city?: string | null,
  state?: string | null
): string | null {
  const cityValue = city?.trim()
  const stateValue = state?.trim()
  if (!cityValue && !stateValue) return null

  const uf = stateValue ? abbreviateBrazilianState(stateValue) : null
  if (cityValue && uf) return `${cityValue}, ${uf}`
  return cityValue ?? uf ?? null
}
