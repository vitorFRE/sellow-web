import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Informe seu e-mail.")
    .email("Informe um e-mail valido."),
  password: z
    .string()
    .min(1, "Informe sua senha.")
    .min(6, "A senha precisa ter ao menos 6 caracteres."),
})

export type LoginSchema = z.infer<typeof loginSchema>
