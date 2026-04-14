import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { useRouter } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "@/features/auth/api/auth-api"
import { tokenStorage } from "@/features/auth/lib/token-storage"
import { loginSchema } from "@/features/auth/schemas/login-schema"
import { authMeQueryKey } from "@/features/auth/queries/auth-query-keys"

export function LoginForm() {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: loginSchema, onBlur: loginSchema },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      setIsPending(true)
      try {
        const data = await login(value.email, value.password)
        tokenStorage.setTokens(data.accessToken, data.refreshToken)
        queryClient.setQueryData(authMeQueryKey, data.user)
        await router.navigate({ to: "/dashboard" })
      } catch (err) {
        setSubmitError(
          err instanceof Error
            ? err.message
            : "Erro ao entrar. Tente novamente."
        )
      } finally {
        setIsPending(false)
      }
    },
  })

  return (
    <div className="w-full rounded-4xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-xl font-medium">Entrar na sua conta</h1>
        <p className="text-sm text-muted-foreground">
          Acesse o painel para acompanhar leads, propostas e relatorios.
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          form.handleSubmit()
        }}
        noValidate
      >
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            const errors = field.state.meta.errors.map((e) => e?.message)
            return (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium">
                  E-mail
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="voce@empresa.com"
                  autoComplete="email"
                  aria-invalid={isInvalid}
                />
                {isInvalid ? (
                  <p className="text-sm text-destructive">{errors.at(0)}</p>
                ) : null}
              </div>
            )
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            const errors = field.state.meta.errors.map((e) => e?.message)
            return (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium">
                  Senha
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  aria-invalid={isInvalid}
                />
                {isInvalid ? (
                  <p className="text-sm text-destructive">{errors.at(0)}</p>
                ) : null}
              </div>
            )
          }}
        />

        {submitError ? (
          <p className="rounded-3xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {submitError}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  )
}
