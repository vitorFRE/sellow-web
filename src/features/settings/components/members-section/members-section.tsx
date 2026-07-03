import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { IconPlus } from "@tabler/icons-react"

import { getApiErrorMessage, isWorkspaceForbidden } from "@/shared/lib/api-errors"
import { listWorkspaceUsers } from "@/features/settings/api/users-api"
import { MemberAddDialog } from "@/features/settings/components/members-section/member-add-dialog"
import { MemberRoleDialog } from "@/features/settings/components/members-section/member-role-dialog"
import { MemberRow } from "@/features/settings/components/members-section/member-row"
import { useMembersMutations } from "@/features/settings/components/members-section/use-members-mutations"
import { workspaceUsersQueryKey } from "@/features/settings/queries/loss-reasons-query-keys"
import type { WorkspaceUser } from "@/features/settings/types/workspace-user"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"
import { useWorkspacePermissions } from "@/features/workspaces/hooks/use-workspace-permissions"
import { canPromoteToOwner, canRemoveMember } from "@/features/workspaces/lib/workspace-permissions"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function MembersSection() {
  const { workspaceId, role: activeRole } = useActiveWorkspace()
  const { canManageMembers } = useWorkspacePermissions()
  const [page] = React.useState(1)
  const [addOpen, setAddOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<WorkspaceUser | null>(null)

  const { addMutation, roleMutation, removeMutation } = useMembersMutations({
    workspaceId: workspaceId ?? "",
    onAddSuccess: () => setAddOpen(false),
    onEditClose: () => setEditing(null),
  })

  const listQuery = useQuery({
    queryKey: workspaceUsersQueryKey(workspaceId ?? "", page),
    queryFn: () => listWorkspaceUsers({ page, limit: 20 }),
    enabled: Boolean(workspaceId && canManageMembers),
  })

  const busyId =
    roleMutation.isPending && roleMutation.variables
      ? roleMutation.variables.userId
      : removeMutation.isPending && removeMutation.variables
        ? removeMutation.variables
        : null

  if (!canManageMembers) {
    return (
      <p className="text-sm leading-relaxed text-stat-muted">
        Apenas proprietários e administradores podem gerenciar membros.
      </p>
    )
  }

  if (isWorkspaceForbidden(listQuery.error)) {
    return (
      <p className="text-sm leading-relaxed text-stat-muted">
        Você não tem permissão para listar membros neste workspace.
      </p>
    )
  }

  const canEditRoles = canManageMembers
  const canRemove = canRemoveMember(activeRole)
  const canPromote = canPromoteToOwner(activeRole)

  return (
    <section className="dashboard-stat-board flex min-w-0 flex-col p-6">
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <p className="text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
            Equipe
          </p>
          <h2 className="text-base font-semibold tracking-tight text-stat-value">
            Membros
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-stat-muted">
            Gerencie quem tem acesso a este workspace e suas permissões.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          className="shrink-0 gap-1.5 self-start"
          onClick={() => setAddOpen(true)}
        >
          <IconPlus className="size-4" aria-hidden />
          Adicionar membro
        </Button>
      </header>

      <MemberAddDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        isPending={addMutation.isPending}
        onAdd={(payload) => addMutation.mutate(payload)}
      />

      {listQuery.isLoading ? (
        <ul className="divide-y divide-border">
          <li>
            <Skeleton className="h-16 w-full rounded-none bg-stat-card" />
          </li>
        </ul>
      ) : listQuery.isError ? (
        <p className="pt-5 text-sm text-destructive">
          {getApiErrorMessage(
            listQuery.error,
            "Não foi possível carregar os membros."
          )}
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {listQuery.data?.data.length === 0 ? (
            <li className="py-10 text-center text-sm text-stat-muted">
              Nenhum membro encontrado.
            </li>
          ) : (
            listQuery.data?.data.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                busy={busyId === member.id}
                canEditRole={canEditRoles}
                canRemove={canRemove}
                onEditRole={setEditing}
                onRemove={(item) => removeMutation.mutate(item.id)}
              />
            ))
          )}
        </ul>
      )}

      <MemberRoleDialog
        open={editing != null}
        member={editing}
        isPending={
          roleMutation.isPending && roleMutation.variables?.userId === editing?.id
        }
        canPromoteToOwner={canPromote}
        onOpenChange={(open) => !open && setEditing(null)}
        onSave={(nextRole) => {
          if (!editing) return
          roleMutation.mutate({ userId: editing.id, role: nextRole })
        }}
      />
    </section>
  )
}
