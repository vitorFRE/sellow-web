import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import { listMyFeedback } from "@/features/feedback/api/feedback-api"
import { FeedbackStatusBadge } from "@/features/feedback/components/feedback-status-badge"
import { FEEDBACK_TYPE_LABELS } from "@/features/feedback/lib/feedback-labels"
import { myFeedbackQueryKey } from "@/features/feedback/queries/feedback-query-keys"
import { formatDateTimeShortPtOrDash } from "@/shared/lib/format-datetime"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function FeedbackMySection() {
  const [page, setPage] = React.useState(1)

  const listQuery = useQuery({
    queryKey: myFeedbackQueryKey(page),
    queryFn: () => listMyFeedback({ page, limit: 10 }),
  })

  const items = listQuery.data?.data ?? []
  const meta = listQuery.data?.meta

  return (
    <section className="dashboard-stat-board flex min-w-0 flex-col p-6">
      <header className="border-b border-border pb-5">
        <div className="min-w-0 space-y-2">
          <p className="font-mono text-[10px] tracking-[0.16em] text-stat-label uppercase">
            Conta
          </p>
          <h2 className="text-base font-semibold tracking-tight text-stat-value">
            Meus feedbacks
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-stat-muted">
            Histórico do que você enviou pela sidebar. Acompanhe o status de cada
            mensagem.
          </p>
        </div>
      </header>

      {listQuery.isLoading ? (
        <ul className="divide-y divide-border">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="py-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-2 h-16 w-full" />
            </li>
          ))}
        </ul>
      ) : listQuery.isError ? (
        <p className="py-8 text-sm text-stat-muted">
          Não foi possível carregar seus feedbacks.
        </p>
      ) : items.length === 0 ? (
        <p className="py-8 text-sm text-stat-muted">
          Você ainda não enviou nenhum feedback. Use o item Feedback na sidebar
          para compartilhar uma sugestão ou reportar um problema.
        </p>
      ) : (
        <>
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-3 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium tracking-wide text-stat-muted uppercase">
                    {FEEDBACK_TYPE_LABELS[item.type]}
                  </span>
                  <FeedbackStatusBadge status={item.status} />
                  <span className="text-xs text-stat-muted">
                    {formatDateTimeShortPtOrDash(item.createdAt)}
                  </span>
                  {item.workspace ? (
                    <span className="text-xs text-stat-muted">
                      · {item.workspace.name}
                    </span>
                  ) : null}
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap text-stat-value">
                  {item.message}
                </p>
              </li>
            ))}
          </ul>

          {meta && meta.totalPages > 1 ? (
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
              <p className="text-xs text-stat-muted">
                Página {meta.page} de {meta.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  Anterior
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page >= meta.totalPages}
                  onClick={() =>
                    setPage((current) => Math.min(meta.totalPages, current + 1))
                  }
                >
                  Próxima
                </Button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </section>
  )
}
