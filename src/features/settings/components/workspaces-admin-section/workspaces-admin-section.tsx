import * as React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IconPlus } from "@tabler/icons-react"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/shared/lib/api-errors"
import { createWorkspace, listWorkspaces } from "@/features/workspaces/api/workspaces-api"
import { WorkspaceAdminRow } from "@/features/settings/components/workspaces-admin-section/workspace-admin-row"
import { WorkspaceCreateDialog } from "@/features/settings/components/workspaces-admin-section/workspace-create-dialog"
import { workspacesAdminQueryKey } from "@/features/settings/queries/loss-reasons-query-keys"
import { useWorkspacePermissions } from "@/features/workspaces/hooks/use-workspace-permissions"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function WorkspacesAdminSection() {
  const { isSuperAdmin } = useWorkspacePermissions()
  const queryClient = useQueryClient()
  const [createOpen, setCreateOpen] = React.useState(false)

  const listQuery = useQuery({
    queryKey: workspacesAdminQueryKey(),
    queryFn: listWorkspaces,
    enabled: isSuperAdmin,
  })

  const createMutation = useMutation({
    mutationFn: (name: string) => createWorkspace({ name }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: workspacesAdminQueryKey() })
      setCreateOpen(false)
      toast.success("Workspace criado.")
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Não foi possível criar o workspace."))
    },
  })

  if (!isSuperAdmin) {
    return (
      <p className="text-sm leading-relaxed text-stat-muted">
        Apenas super administradores podem gerenciar workspaces da plataforma.
      </p>
    )
  }

  return (
    <section className="dashboard-stat-board flex min-w-0 flex-col p-6">
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <p className="font-mono text-[10px] tracking-[0.16em] text-stat-label uppercase">
            Super admin
          </p>
          <h2 className="text-base font-semibold tracking-tight text-stat-value">
            Workspaces
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-stat-muted">
            Crie novos ambientes e acompanhe quantos membros cada um possui.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          className="shrink-0 gap-1.5 self-start"
          onClick={() => setCreateOpen(true)}
        >
          <IconPlus className="size-4" aria-hidden />
          Novo workspace
        </Button>
      </header>

      <WorkspaceCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        isPending={createMutation.isPending}
        onCreate={(name) => createMutation.mutate(name)}
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
            "Não foi possível carregar os workspaces."
          )}
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {listQuery.data?.length === 0 ? (
            <li className="py-10 text-center text-sm text-stat-muted">
              Nenhum workspace cadastrado.
            </li>
          ) : (
            listQuery.data?.map((workspace) => (
              <WorkspaceAdminRow key={workspace.id} workspace={workspace} />
            ))
          )}
        </ul>
      )}
    </section>
  )
}
