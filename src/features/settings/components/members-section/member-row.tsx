import { IconPencil, IconTrash } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { getWorkspaceRoleLabel } from "@/features/workspaces/lib/workspace-role-labels"
import type { WorkspaceUser } from "@/features/settings/types/workspace-user"
import { cn } from "@/lib/utils"

type Props = {
  member: WorkspaceUser
  busy?: boolean
  canEditRole: boolean
  canRemove: boolean
  onEditRole: (member: WorkspaceUser) => void
  onRemove: (member: WorkspaceUser) => void
}

export function MemberRow({
  member,
  busy,
  canEditRole,
  canRemove,
  onEditRole,
  onRemove,
}: Props) {
  return (
    <li
      className={cn(
        "flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between",
        busy && "opacity-60"
      )}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium text-stat-value">{member.name}</p>
        <p className="text-sm text-stat-muted">{member.email}</p>
        <p className="text-xs text-stat-muted">
          {getWorkspaceRoleLabel(member.workspaceRole)}
          {!member.isActive ? " · Inativo" : ""}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1 self-start">
        {canEditRole ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-stat-muted hover:text-stat-value"
            disabled={busy}
            onClick={() => onEditRole(member)}
          >
            <IconPencil className="size-3.5" aria-hidden />
            Role
          </Button>
        ) : null}
        {canRemove ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
            disabled={busy}
            onClick={() => onRemove(member)}
          >
            <IconTrash className="size-3.5" aria-hidden />
            Remover
          </Button>
        ) : null}
      </div>
    </li>
  )
}
