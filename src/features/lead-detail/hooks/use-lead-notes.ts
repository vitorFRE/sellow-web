import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/shared/lib/api-errors"
import {
  getLeadNotes,
  putLeadNotes,
  type LeadNotes,
} from "@/features/lead-detail/api/lead-detail-api"
import { leadNotesQueryKey } from "@/features/lead-detail/queries/lead-detail-query-keys"
import { invalidateWorkspaceLeadsQueries } from "@/features/workspaces/lib/business-query-key"
import { useActiveWorkspace } from "@/features/workspaces/hooks/use-active-workspace"

export function useLeadNotesQuery(leadId: string | null) {
  const { workspaceId } = useActiveWorkspace()

  return useQuery({
    queryKey: leadNotesQueryKey(workspaceId ?? "", leadId ?? ""),
    queryFn: () => getLeadNotes(leadId as string),
    enabled: Boolean(leadId && workspaceId),
    staleTime: 30_000,
  })
}

export function useSaveLeadNotesMutation(leadId: string) {
  const queryClient = useQueryClient()
  const { workspaceId } = useActiveWorkspace()

  return useMutation({
    mutationFn: (body: string) => putLeadNotes(leadId, body),
    onSuccess: (data) => {
      if (!workspaceId) return
      queryClient.setQueryData<LeadNotes>(
        leadNotesQueryKey(workspaceId, leadId),
        data
      )
      void invalidateWorkspaceLeadsQueries(queryClient, workspaceId)
      toast.success("Anotações salvas.", { id: `lead-notes-${leadId}` })
    },
    onError: (err) => {
      const message = getApiErrorMessage(
        err,
        "Não foi possível salvar as anotações."
      )
      toast.error(message, { id: `lead-notes-${leadId}` })
    },
  })
}
