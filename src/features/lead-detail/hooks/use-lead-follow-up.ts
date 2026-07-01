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

export function useLeadFollowUpQuery(leadId: string | null) {
  return useQuery({
    queryKey: leadFollowUpQueryKey(leadId ?? ""),
    queryFn: () => getLeadFollowUp(leadId as string),
    enabled: Boolean(leadId),
    staleTime: 30_000,
  })
}

export function useSaveLeadFollowUpMutation(leadId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: LeadFollowUpInput) => putLeadFollowUp(leadId, input),
    onSuccess: (data) => {
      queryClient.setQueryData<LeadFollowUpResponse | null>(
        leadFollowUpQueryKey(leadId),
        data
      )
      void queryClient.invalidateQueries({ queryKey: ["leads", "pipeline"] })
      void queryClient.invalidateQueries({ queryKey: ["leads", "list"] })
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

  return useMutation({
    mutationFn: () => deleteLeadFollowUp(leadId),
    onSuccess: () => {
      queryClient.setQueryData<LeadFollowUpResponse | null>(
        leadFollowUpQueryKey(leadId),
        null
      )
      void queryClient.invalidateQueries({ queryKey: ["leads", "pipeline"] })
      void queryClient.invalidateQueries({ queryKey: ["leads", "list"] })
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
