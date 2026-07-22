/** Item aceito em POST /leads/import/google-maps → `items`. */
export type GoogleMapsImportItem = {
  title: string
  totalScore?: number | null
  reviewsCount?: number | null
  street?: string | null
  city?: string | null
  state?: string | null
  countryCode?: string | null
  website?: string | null
  phone?: string | null
  categories?: string[]
  categoryName?: string | null
  url?: string | null
  latitude?: number | null
  longitude?: number | null
}

export type GoogleMapsImportPayload = {
  items: GoogleMapsImportItem[]
}

export type GoogleMapsImportResult = {
  created: number
  updated: number
  skipped: number
  errors: { item: string; reason: string }[]
}
