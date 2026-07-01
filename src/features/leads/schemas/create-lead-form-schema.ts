import { z } from "zod"

import { ALL_LEAD_STATUSES } from "@/features/leads/config/lead-status"

export const createLeadFormSchema = z
  .object({
    name: z.string().min(1, "Informe o nome."),
    email: z.union([z.literal(""), z.string().email("E-mail inválido.")]),
    phone: z.string(),
    budget: z
      .string()
      .refine(
        (s) => s.trim() === "" || /^-?\d+(\.\d+)?$/.test(s.trim()),
        "Orçamento inválido."
      ),
    status: z.enum(ALL_LEAD_STATUSES),
    source: z.string(),
    city: z.string(),
    state: z.string(),
    website: z.string(),
    categoryName: z.string(),
  })
  .refine(
    (d) => {
      const u = d.website.trim()
      return u === "" || z.string().url().safeParse(u).success
    },
    { path: ["website"], message: "URL inválida." }
  )

export type CreateLeadFormValues = z.infer<typeof createLeadFormSchema>

export const createLeadDefaultValues: CreateLeadFormValues = {
  name: "",
  email: "",
  phone: "",
  budget: "",
  status: "NEW",
  source: "",
  city: "",
  state: "",
  website: "",
  categoryName: "",
}
