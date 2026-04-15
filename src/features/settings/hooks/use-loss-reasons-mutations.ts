import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { HttpError } from "@/features/auth/api/auth-api"
import {
  createLossReason,
  deleteLossReason,
  patchLossReason,
} from "@/features/settings/api/loss-reasons-api"
import { lossReasonsQueryKey } from "@/features/settings/queries/loss-reasons-query-keys"

function errorMessage(err: unknown, fallback: string) {
  if (err instanceof HttpError) return err.message
  return fallback
}

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

  const createMutation = useMutation({
    mutationFn: createLossReason,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: lossReasonsQueryKey })
      onCreateSuccess()
      toast.success("Motivo criado.")
    },
    onError: (err) => {
      toast.error(errorMessage(err, "Não foi possível criar o motivo."))
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
      await queryClient.invalidateQueries({ queryKey: lossReasonsQueryKey })
      onEditClose()
      toast.success("Motivo atualizado.")
    },
    onError: (err) => {
      toast.error(errorMessage(err, "Não foi possível salvar."))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteLossReason,
    onSuccess: async (msg) => {
      await queryClient.invalidateQueries({ queryKey: lossReasonsQueryKey })
      onDeleteClose()
      toast.success(msg)
    },
    onError: (err) => {
      toast.error(errorMessage(err, "Não foi possível excluir."))
    },
  })

  return { createMutation, patchMutation, deleteMutation }
}
