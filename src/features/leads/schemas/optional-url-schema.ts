import { z } from "zod"

export const optionalUrlSchema = z
  .string()
  .refine(
    (s) => {
      const u = s.trim()
      return u === "" || z.string().url().safeParse(u).success
    },
    { message: "URL inválida." }
  )
