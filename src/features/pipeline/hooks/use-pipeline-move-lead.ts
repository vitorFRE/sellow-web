import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { HttpError } from "@/features/auth/api/auth-api"
import { updateLeadStatus } from "@/features/leads/api/leads-api"
import {
  applyOptimisticPipelineMove,
  type PipelineMoveVariables,
  restoreLeadsQueries,
  snapshotLeadsQueries,
} from "@/features/pipeline/lib/apply-pipeline-optimistic-move"
import { reconcilePipelineCacheWithServerLead } from "@/features/pipeline/lib/reconcile-pipeline-cache"

export function usePipelineMoveLead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      status,
      lossReasonId,
      lossReasonNote,
    }: PipelineMoveVariables) =>
      updateLeadStatus(id, {
        status,
        lossReasonId: status === "LOST" ? lossReasonId : undefined,
        lossReasonNote: status === "LOST" ? lossReasonNote : undefined,
      }),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["leads", "pipeline"] })
      const previous = snapshotLeadsQueries(queryClient)
      applyOptimisticPipelineMove(queryClient, variables)
      return { previous }
    },
    onSuccess: (serverLead, variables) => {
      reconcilePipelineCacheWithServerLead(
        queryClient,
        serverLead,
        variables.status
      )
    },
    onError: (err, _variables, context) => {
      if (context?.previous) {
        restoreLeadsQueries(queryClient, context.previous)
      }
      const message =
        err instanceof HttpError
          ? err.message
          : "Não foi possível atualizar o status do lead."
      toast.error(message, { id: "pipeline-move-status" })
    },
  })
}
