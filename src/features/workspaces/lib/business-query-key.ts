export const BUSINESS_QUERY_ROOT = "business" as const

export function businessQueryKey(
  workspaceId: string,
  ...segments: readonly unknown[]
) {
  return [BUSINESS_QUERY_ROOT, workspaceId, ...segments] as const
}

export function isBusinessQuery(queryKey: readonly unknown[]): boolean {
  return queryKey[0] === BUSINESS_QUERY_ROOT
}

export function invalidateWorkspaceLeadsQueries(
  queryClient: { invalidateQueries: (opts: {
    predicate: (query: { queryKey: readonly unknown[] }) => boolean
  }) => Promise<void> },
  workspaceId: string
) {
  return queryClient.invalidateQueries({
    predicate: (query) =>
      isBusinessQuery(query.queryKey) &&
      query.queryKey[1] === workspaceId &&
      query.queryKey[2] === "leads",
  })
}
