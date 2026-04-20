import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { HttpError } from "@/features/auth/api/auth-api"
import {
  getLeadNotes,
  putLeadNotes,
  type LeadNotes,
} from "@/features/lead-detail/api/lead-detail-api"
import { leadNotesQueryKey } from "@/features/lead-detail/queries/lead-detail-query-keys"

export function useLeadNotesQuery(leadId: string | null) {
  return useQuery({
    queryKey: leadNotesQueryKey(leadId ?? ""),
    queryFn: () => getLeadNotes(leadId as string),
    enabled: Boolean(leadId),
    staleTime: 30_000,
  })
}

export function useSaveLeadNotesMutation(leadId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: string) => putLeadNotes(leadId, body),
    onSuccess: (data) => {
      queryClient.setQueryData<LeadNotes>(leadNotesQueryKey(leadId), data)
      void queryClient.invalidateQueries({ queryKey: ["leads", "pipeline"] })
      void queryClient.invalidateQueries({ queryKey: ["leads", "list"] })
      toast.success("Anotações salvas.", { id: `lead-notes-${leadId}` })
    },
    onError: (err) => {
      const message =
        err instanceof HttpError
          ? err.message
          : "Não foi possível salvar as anotações."
      toast.error(message, { id: `lead-notes-${leadId}` })
    },
  })
}
