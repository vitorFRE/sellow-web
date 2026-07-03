import type { TablerIcon } from "@tabler/icons-react"
import {
  IconBrandGoogle,
  IconForms,
  IconUserPlus,
} from "@tabler/icons-react"

type LeadSourceMeta = {
  label: string
  Icon: TablerIcon
}

const KNOWN_SOURCES: Record<string, LeadSourceMeta> = {
  google_maps: {
    label: "Google Maps",
    Icon: IconBrandGoogle,
  },
  manual: {
    label: "Cadastro manual",
    Icon: IconUserPlus,
  },
  form: {
    label: "Formulário",
    Icon: IconForms,
  },
}

export function getLeadSourceMeta(source: string | null | undefined): LeadSourceMeta {
  const key = source?.trim().toLowerCase()
  if (key && KNOWN_SOURCES[key]) return KNOWN_SOURCES[key]

  const label = source?.trim() || "Sem origem"
  return {
    label,
    Icon: IconUserPlus,
  }
}
