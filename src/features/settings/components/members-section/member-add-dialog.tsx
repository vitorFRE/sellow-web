import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getWorkspaceRoleLabel } from "@/features/workspaces/lib/workspace-role-labels"
import type { WorkspaceRole } from "@/features/workspaces/types"

const ROLES: WorkspaceRole[] = ["MEMBER", "ADMIN", "OWNER"]

type MemberAddMode = "new" | "existing"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  isPending: boolean
  onAdd: (payload: {
    email: string
    password?: string
    name?: string
    role: WorkspaceRole
  }) => void
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

export function MemberAddDialog({
  open,
  onOpenChange,
  isPending,
  onAdd,
}: Props) {
  const [mode, setMode] = React.useState<MemberAddMode>("new")
  const [email, setEmail] = React.useState("")
  const [confirmEmail, setConfirmEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [role, setRole] = React.useState<WorkspaceRole>("MEMBER")

  React.useEffect(() => {
    if (open) {
      setMode("new")
      setEmail("")
      setConfirmEmail("")
      setPassword("")
      setName("")
      setRole("MEMBER")
    }
  }, [open])

  const trimmedEmail = email.trim()
  const normalizedEmail = normalizeEmail(email)
  const normalizedConfirm = normalizeEmail(confirmEmail)
  const emailsMatch =
    normalizedEmail.length > 0 && normalizedEmail === normalizedConfirm

  const canSubmit =
    mode === "new"
      ? Boolean(trimmedEmail && name.trim() && password.trim())
      : emailsMatch

  const switchMode = (next: MemberAddMode) => {
    setMode(next)
    setEmail("")
    setConfirmEmail("")
    setPassword("")
    setName("")
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    if (mode === "new") {
      onAdd({
        email: trimmedEmail,
        password: password.trim(),
        name: name.trim(),
        role,
      })
      return
    }

    onAdd({ email: trimmedEmail, role })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Adicionar membro</DialogTitle>
            <DialogDescription>
              {mode === "new"
                ? "Crie uma conta nova e adicione ao workspace."
                : "Vincule alguém que já usa o Sellow em outro workspace."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 py-2">
            <Tabs
              value={mode}
              onValueChange={(value) => switchMode(value as MemberAddMode)}
            >
              <TabsList variant="line" className="w-full">
                <TabsTrigger value="new" className="flex-1">
                  Nova conta
                </TabsTrigger>
                <TabsTrigger value="existing" className="flex-1">
                  Já usa o Sellow
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <label className="grid gap-1.5 text-sm font-medium">
              E-mail
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pessoa@empresa.com"
                required
                disabled={isPending}
                autoComplete="off"
              />
            </label>

            {mode === "existing" ? (
              <>
                <label className="grid gap-1.5 text-sm font-medium">
                  Confirme o e-mail
                  <Input
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder="Digite o e-mail novamente"
                    required
                    disabled={isPending}
                    autoComplete="off"
                  />
                </label>

                {emailsMatch ? (
                  <p className="border border-border px-3 py-2.5 text-xs leading-relaxed text-stat-muted">
                    Vincular{" "}
                    <span className="font-medium text-stat-value">
                      {trimmedEmail}
                    </span>{" "}
                    a este workspace. A pessoa entra com a senha que já usa.
                  </p>
                ) : confirmEmail.trim() ? (
                  <p className="text-xs text-destructive">
                    Os e-mails não coincidem.
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <label className="grid gap-1.5 text-sm font-medium">
                  Nome
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome"
                    required
                    disabled={isPending}
                    autoComplete="off"
                  />
                </label>

                <label className="grid gap-1.5 text-sm font-medium">
                  Senha
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha inicial"
                    required
                    disabled={isPending}
                    autoComplete="new-password"
                  />
                </label>
              </>
            )}

            <label className="grid gap-1.5 text-sm font-medium">
              Papel no workspace
              <Select
                value={role}
                onValueChange={(value) => setRole(value as WorkspaceRole)}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue>{getWorkspaceRoleLabel(role)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {getWorkspaceRoleLabel(item)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending || !canSubmit}>
              {isPending
                ? mode === "existing"
                  ? "Vinculando…"
                  : "Criando…"
                : mode === "existing"
                  ? "Vincular membro"
                  : "Criar e adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
