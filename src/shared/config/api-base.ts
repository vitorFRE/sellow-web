export function getApiBaseUrl(): string {
  const url = import.meta.env.VITE_API_URL
  if (!url && import.meta.env.DEV) {
    console.warn("[sellow] VITE_API_URL não definida. Defina no .env.local")
  }
  return url ?? ""
}
