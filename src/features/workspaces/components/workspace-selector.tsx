import { useRouter } from "@tanstack/react-router"
import { IconBuilding, IconCheck } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { getWorkspaceRoleLabel } from "@/features/workspaces/lib/workspace-role-labels"
import { applyActiveWorkspace } from "@/features/workspaces/lib/resolve-active-workspace"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"
import type { UserWorkspace } from "@/features/workspaces/types"
import { cn } from "@/lib/utils"

type WorkspaceSelectorProps = {
  onSelect?: (workspaceId: string) => void
  className?: string
}

export function WorkspaceSelector({
  onSelect,
  className,
}: WorkspaceSelectorProps) {
  const router = useRouter()
  const { workspaces, workspaceId, setWorkspace } = useActiveWorkspace()

  function handleSelect(workspace: UserWorkspace) {
    applyActiveWorkspace(workspace.id)
    setWorkspace(workspace.id)
    onSelect?.(workspace.id)
    void router.navigate({ to: "/dashboard" })
  }

  if (workspaces.length === 0) {
    return (
      <div className={cn("space-y-4 text-center", className)}>
        <p className="text-sm text-muted-foreground">
          Sua conta não possui acesso a nenhum workspace.
        </p>
        <Button type="button" variant="outline" onClick={() => router.navigate({ to: "/" })}>
          Voltar ao login
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Escolha um workspace</h1>
        <p className="text-sm text-muted-foreground">
          Selecione o ambiente em que deseja trabalhar.
        </p>
      </div>
      <ul className="space-y-2">
        {workspaces.map((workspace) => {
          const isActive = workspace.id === workspaceId
          return (
            <li key={workspace.id}>
              <button
                type="button"
                onClick={() => handleSelect(workspace)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                  isActive
                    ? "border-primary/40 bg-primary/5"
                    : "border-border hover:bg-muted/50"
                )}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <IconBuilding className="size-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{workspace.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {getWorkspaceRoleLabel(workspace.role)}
                  </span>
                </span>
                {isActive ? (
                  <IconCheck className="size-4 shrink-0 text-primary" aria-hidden />
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
