import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/shared/lib/api-errors"
import {
  deleteLeadFollowUp,
  getLeadFollowUp,
  putLeadFollowUp,
  type LeadFollowUpInput,
  type LeadFollowUpResponse,
} from "@/features/lead-detail/api/lead-detail-api"
import { leadFollowUpQueryKey } from "@/features/lead-detail/queries/lead-detail-query-keys"
import { invalidateWorkspaceLeadsQueries } from "@/features/workspaces/lib/business-query-key"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"

export function useLeadFollowUpQuery(leadId: string | null) {
  const { workspaceId } = useActiveWorkspace()

  return useQuery({
    queryKey: leadFollowUpQueryKey(workspaceId ?? "", leadId ?? ""),
    queryFn: () => getLeadFollowUp(leadId as string),
    enabled: Boolean(leadId && workspaceId),
    staleTime: 30_000,
  })
}

export function useSaveLeadFollowUpMutation(leadId: string) {
  const queryClient = useQueryClient()
  const { workspaceId } = useActiveWorkspace()

  return useMutation({
    mutationFn: (input: LeadFollowUpInput) => putLeadFollowUp(leadId, input),
    onSuccess: (data) => {
      if (!workspaceId) return
      queryClient.setQueryData<LeadFollowUpResponse | null>(
        leadFollowUpQueryKey(workspaceId, leadId),
        data
      )
      void invalidateWorkspaceLeadsQueries(queryClient, workspaceId)
      toast.success("Follow-up salvo.", { id: `lead-follow-up-${leadId}` })
    },
    onError: (err) => {
      const message = getApiErrorMessage(
        err,
        "Não foi possível salvar o follow-up."
      )
      toast.error(message, { id: `lead-follow-up-${leadId}` })
    },
  })
}

export function useDeleteLeadFollowUpMutation(leadId: string) {
  const queryClient = useQueryClient()
  const { workspaceId } = useActiveWorkspace()

  return useMutation({
    mutationFn: () => deleteLeadFollowUp(leadId),
    onSuccess: () => {
      if (!workspaceId) return
      queryClient.setQueryData<LeadFollowUpResponse | null>(
        leadFollowUpQueryKey(workspaceId, leadId),
        null
      )
      void invalidateWorkspaceLeadsQueries(queryClient, workspaceId)
      toast.success("Follow-up removido.", { id: `lead-follow-up-${leadId}` })
    },
    onError: (err) => {
      const message = getApiErrorMessage(
        err,
        "Não foi possível remover o follow-up."
      )
      toast.error(message, { id: `lead-follow-up-${leadId}` })
    },
  })
}
