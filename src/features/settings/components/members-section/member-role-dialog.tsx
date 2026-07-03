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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getWorkspaceRoleLabel } from "@/features/workspaces/lib/workspace-role-labels"
import type { WorkspaceRole } from "@/features/workspaces/types"
import type { WorkspaceUser } from "@/features/settings/types/workspace-user"

const ROLES: WorkspaceRole[] = ["MEMBER", "ADMIN", "OWNER"]

type Props = {
  open: boolean
  member: WorkspaceUser | null
  isPending: boolean
  canPromoteToOwner: boolean
  onOpenChange: (open: boolean) => void
  onSave: (role: WorkspaceRole) => void
}

export function MemberRoleDialog({
  open,
  member,
  isPending,
  canPromoteToOwner,
  onOpenChange,
  onSave,
}: Props) {
  const [role, setRole] = React.useState<WorkspaceRole>("MEMBER")

  React.useEffect(() => {
    if (open && member) {
      setRole(member.workspaceRole)
    }
  }, [open, member])

  const availableRoles = canPromoteToOwner
    ? ROLES
    : ROLES.filter((item) => item !== "OWNER")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(role)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Editar role</DialogTitle>
            <DialogDescription>
              Altere a permissão de{" "}
              <span className="font-medium text-foreground">
                {member?.name ?? member?.email}
              </span>{" "}
              neste workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <label className="grid gap-1.5 text-sm font-medium">
              Role
              <Select
                value={role}
                onValueChange={(value) => setRole(value as WorkspaceRole)}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((item) => (
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
            <Button type="submit" disabled={isPending || !member}>
              {isPending ? "Salvando…" : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
