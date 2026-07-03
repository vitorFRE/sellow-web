import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/shared/lib/api-errors"
import {
  createLossReason,
  deleteLossReason,
  patchLossReason,
} from "@/features/settings/api/loss-reasons-api"
import { lossReasonsQueryKey } from "@/features/settings/queries/loss-reasons-query-keys"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"

type Args = {
  onCreateSuccess: () => void
  onEditClose: () => void
  onDeleteClose: () => void
}

export function useLossReasonsMutations({
  onCreateSuccess,
  onEditClose,
  onDeleteClose,
}: Args) {
  const queryClient = useQueryClient()
  const { workspaceId } = useActiveWorkspace()

  const createMutation = useMutation({
    mutationFn: createLossReason,
    onSuccess: async () => {
      if (!workspaceId) return
      await queryClient.invalidateQueries({
        queryKey: lossReasonsQueryKey(workspaceId),
      })
      onCreateSuccess()
      toast.success("Motivo criado.")
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Não foi possível criar o motivo."))
    },
  })

  const patchMutation = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string
      body: { name: string; description: string | null }
    }) => patchLossReason(id, body),
    onSuccess: async () => {
      if (!workspaceId) return
      await queryClient.invalidateQueries({
        queryKey: lossReasonsQueryKey(workspaceId),
      })
      onEditClose()
      toast.success("Motivo atualizado.")
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Não foi possível salvar."))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteLossReason,
    onSuccess: async (msg) => {
      if (!workspaceId) return
      await queryClient.invalidateQueries({
        queryKey: lossReasonsQueryKey(workspaceId),
      })
      onDeleteClose()
      toast.success(msg)
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Não foi possível excluir."))
    },
  })

  return { createMutation, patchMutation, deleteMutation }
}
