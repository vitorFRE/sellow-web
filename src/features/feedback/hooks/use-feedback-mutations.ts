import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  createFeedback,
  patchFeedback,
  type CreateFeedbackBody,
  type PatchFeedbackBody,
} from "@/features/feedback/api/feedback-api"
import {
  adminFeedbackQueryKey,
  myFeedbackQueryKey,
} from "@/features/feedback/queries/feedback-query-keys"
import { getApiErrorMessage } from "@/shared/lib/api-errors"

type UseFeedbackMutationsOptions = {
  onCreateSuccess?: () => void
  onAdminUpdateSuccess?: () => void
}

export function useFeedbackMutations(options: UseFeedbackMutationsOptions = {}) {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (body: CreateFeedbackBody) => createFeedback(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["feedback", "mine"] })
      toast.success("Feedback enviado. Obrigado!")
      options.onCreateSuccess?.()
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "Não foi possível enviar o feedback."))
    },
  })

  const adminPatchMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: PatchFeedbackBody }) =>
      patchFeedback(id, body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["feedback", "admin"] })
      await queryClient.invalidateQueries({ queryKey: ["feedback", "mine"] })
      toast.success("Feedback atualizado.")
      options.onAdminUpdateSuccess?.()
    },
    onError: (err) => {
      toast.error(
        getApiErrorMessage(err, "Não foi possível atualizar o feedback.")
      )
    },
  })

  return { createMutation, adminPatchMutation }
}

export { myFeedbackQueryKey, adminFeedbackQueryKey }
