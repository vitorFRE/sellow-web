import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { useRouter } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { IconArrowRight } from "@tabler/icons-react"
import { motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "@/features/auth/api/auth-api"
import { tokenStorage } from "@/features/auth/lib/token-storage"
import { loginSchema } from "@/features/auth/schemas/login-schema"
import {
  authMeQueryKey,
  fetchAuthMe,
} from "@/features/auth/queries/auth-me-query"
import {
  applyActiveWorkspace,
  resolveActiveWorkspace,
} from "@/features/workspaces/lib/resolve-active-workspace"

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
}

export function LoginForm() {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()
  const reduce = useReducedMotion()

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: loginSchema, onBlur: loginSchema },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      setIsPending(true)
      try {
        const data = await login(value.email, value.password)
        tokenStorage.setTokens(data.accessToken, data.refreshToken)
        const me = await fetchAuthMe()
        queryClient.setQueryData(authMeQueryKey, me)

        const resolution = resolveActiveWorkspace(me.workspaces ?? [])
        if (resolution.status === "needs_selection") {
          await router.navigate({ to: "/dashboard/selecionar-workspace" })
          return
        }
        if (resolution.status === "no_access") {
          setSubmitError("Sua conta não possui acesso a nenhum workspace.")
          return
        }

        applyActiveWorkspace(resolution.workspaceId)
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

  const MotionDiv = reduce ? "div" : motion.div

  return (
    <div className="w-full space-y-7">
      <MotionDiv
        className="space-y-2"
        {...(reduce
          ? {}
          : {
              initial: "hidden",
              animate: "visible",
              custom: 0,
              variants: reveal,
            })}
      >
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-[1.75rem]">
          Bem-vindo de volta
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground lg:hidden">
          Entre com e-mail e senha para acessar leads, propostas e relatórios.
        </p>
      </MotionDiv>

      <form
        className="space-y-6"
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
              <MotionDiv
                className="space-y-2"
                {...(reduce
                  ? {}
                  : {
                      initial: "hidden",
                      animate: "visible",
                      custom: 0.06,
                      variants: reveal,
                    })}
              >
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
              </MotionDiv>
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
              <MotionDiv
                className="space-y-2"
                {...(reduce
                  ? {}
                  : {
                      initial: "hidden",
                      animate: "visible",
                      custom: 0.12,
                      variants: reveal,
                    })}
              >
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
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  aria-invalid={isInvalid}
                />
                {isInvalid ? (
                  <p className="text-sm text-destructive">{errors.at(0)}</p>
                ) : null}
              </MotionDiv>
            )
          }}
        />

        {submitError ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {submitError}
          </p>
        ) : null}

        <MotionDiv
          {...(reduce
            ? {}
            : {
                initial: "hidden",
                animate: "visible",
                custom: 0.18,
                variants: reveal,
              })}
        >
          <Button type="submit" size="lg" className="w-full" disabled={isPending}>
            {isPending ? "Entrando..." : "Entrar"}
            {!isPending ? (
              <IconArrowRight className="size-4" stroke={2} aria-hidden />
            ) : null}
          </Button>
        </MotionDiv>
      </form>
    </div>
  )
}
