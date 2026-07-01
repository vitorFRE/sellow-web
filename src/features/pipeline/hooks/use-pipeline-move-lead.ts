import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/shared/lib/api-errors"
import { updateLeadStatus } from "@/features/leads/api/leads-api"
import type { LeadListFilterState } from "@/features/leads/types/lead-list-query"
import {
  applyOptimisticPipelineMove,
  type PipelineMoveVariables,
  restoreLeadsQueries,
  snapshotLeadsQueries,
} from "@/features/pipeline/lib/apply-pipeline-optimistic-move"
import { reconcilePipelineCacheWithServerLead } from "@/features/pipeline/lib/reconcile-pipeline-cache"

export function usePipelineMoveLead(filters: LeadListFilterState) {
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
      applyOptimisticPipelineMove(queryClient, variables, filters)
      return { previous }
    },
    onSuccess: (serverLead, variables) => {
      reconcilePipelineCacheWithServerLead(
        queryClient,
        serverLead,
        variables.status,
        filters
      )
    },
    onError: (err, _variables, context) => {
      if (context?.previous) {
        restoreLeadsQueries(queryClient, context.previous)
      }
      const message = getApiErrorMessage(
        err,
        "Não foi possível atualizar o status do lead."
      )
      toast.error(message, { id: "pipeline-move-status" })
    },
  })
}
