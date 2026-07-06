import type { ReactNode } from "react"

import type { LeadStatus } from "@/features/leads/types/lead"

/** Campos compartilhados entre criar e editar lead no formulário de perfil. */
export type LeadProfileFormValues = {
  name: string
  email: string
  phone: string
  budget: string
  source: string
  city: string
  state: string
  url: string
  website: string
  instagram: string
  facebook: string
  categoryName: string
  status?: LeadStatus
}

export type LeadProfileFieldRenderProps = {
  name: string
  state: {
    value: string
    meta: {
      isTouched: boolean
      isValid: boolean
      errors: readonly unknown[]
    }
  }
  handleBlur: () => void
  handleChange: (value: string) => void
}

export type LeadProfileFormApi = {
  Field: (props: {
    name: keyof LeadProfileFormValues & string
    children: (field: LeadProfileFieldRenderProps) => ReactNode
  }) => ReactNode
}
