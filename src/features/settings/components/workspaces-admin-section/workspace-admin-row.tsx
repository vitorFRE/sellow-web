import type { Workspace } from "@/features/workspaces/types"

type Props = {
  workspace: Workspace
}

export function WorkspaceAdminRow({ workspace }: Props) {
  const memberLabel =
    workspace.memberCount === 1
      ? "1 membro"
      : `${workspace.memberCount ?? 0} membros`

  return (
    <li className="flex items-center justify-between gap-4 py-4">
      <p className="min-w-0 truncate text-sm font-medium text-stat-value">
        {workspace.name}
      </p>
      <span className="shrink-0 rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-stat-muted">
        {memberLabel}
      </span>
    </li>
  )
}
