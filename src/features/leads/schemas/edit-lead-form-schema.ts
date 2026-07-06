import { z } from "zod"

import { optionalUrlSchema } from "@/features/leads/schemas/optional-url-schema"

export const editLeadFormSchema = z.object({
  name: z.string().min(1, "Informe o nome."),
  email: z.union([z.literal(""), z.string().email("E-mail inválido.")]),
  phone: z.string(),
  budget: z
    .string()
    .refine(
      (s) => s.trim() === "" || /^-?\d+(\.\d+)?$/.test(s.trim()),
      "Orçamento inválido."
    ),
  source: z.string(),
  city: z.string(),
  state: z.string(),
  url: optionalUrlSchema,
  website: optionalUrlSchema,
  instagram: optionalUrlSchema,
  facebook: optionalUrlSchema,
  categoryName: z.string(),
})

export type EditLeadFormValues = z.infer<typeof editLeadFormSchema>

export const editLeadDefaultValues: EditLeadFormValues = {
  name: "",
  email: "",
  phone: "",
  budget: "",
  source: "",
  city: "",
  state: "",
  url: "",
  website: "",
  instagram: "",
  facebook: "",
  categoryName: "",
}
