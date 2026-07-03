import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/shared/lib/api-errors"
import {
  addWorkspaceMember,
  removeWorkspaceMember,
  updateWorkspaceMemberRole,
} from "@/features/workspaces/api/workspaces-api"
import { workspaceUsersQueryKey } from "@/features/settings/queries/loss-reasons-query-keys"
import type { WorkspaceRole } from "@/features/workspaces/types"
import type { AddWorkspaceMemberInput } from "@/features/workspaces/types"

type Args = {
  workspaceId: string
  onAddSuccess: () => void
  onEditClose: () => void
}

export function useMembersMutations({
  workspaceId,
  onAddSuccess,
  onEditClose,
}: Args) {
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (input: AddWorkspaceMemberInput) =>
      addWorkspaceMember(workspaceId, input),
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({
        queryKey: workspaceUsersQueryKey(workspaceId, 1),
        exact: false,
      })
      onAddSuccess()
      toast.success(
        result.linked
          ? "Usuário vinculado ao workspace."
          : "Membro criado com sucesso."
      )
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Não foi possível adicionar o membro."))
    },
  })

  const roleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: WorkspaceRole }) =>
      updateWorkspaceMemberRole(workspaceId, userId, role),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: workspaceUsersQueryKey(workspaceId, 1),
        exact: false,
      })
      onEditClose()
      toast.success("Role atualizada.")
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Não foi possível atualizar a role."))
    },
  })

  const removeMutation = useMutation({
    mutationFn: (userId: string) => removeWorkspaceMember(workspaceId, userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: workspaceUsersQueryKey(workspaceId, 1),
        exact: false,
      })
      toast.success("Membro removido do workspace.")
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Não foi possível remover o membro."))
    },
  })

  return { addMutation, roleMutation, removeMutation }
}
