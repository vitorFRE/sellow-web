import { IconPencil } from "@tabler/icons-react"

import { FeedbackStatusBadge } from "@/features/feedback/components/feedback-status-badge"
import { FEEDBACK_TYPE_LABELS } from "@/features/feedback/lib/feedback-labels"
import type { Feedback } from "@/features/feedback/types/feedback"
import { formatDateTimeShortPtOrDash } from "@/shared/lib/format-datetime"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TYPE_BADGE_STYLES: Record<Feedback["type"], string> = {
  BUG: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  SUGGESTION:
    "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  OTHER: "border-border bg-muted/40 text-stat-muted",
}

type Props = {
  feedback: Feedback
  onManage: () => void
}

export function FeedbackAdminRow({ feedback, onManage }: Props) {
  const userName = feedback.user?.name?.trim()
  const userEmail = feedback.user?.email

  return (
    <li>
      <article className="rounded-lg border border-stat-card-border bg-stat-card p-4 transition-colors hover:border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-stat-value">
                {userName || userEmail || "Usuário desconhecido"}
              </p>
              {userName && userEmail ? (
                <p className="text-xs text-stat-muted">{userEmail}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-[0.06em] uppercase",
                  TYPE_BADGE_STYLES[feedback.type]
                )}
              >
                {FEEDBACK_TYPE_LABELS[feedback.type]}
              </span>
              <FeedbackStatusBadge status={feedback.status} />
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 shrink-0 gap-1.5 px-2 text-stat-muted hover:text-stat-value"
            onClick={onManage}
          >
            <IconPencil className="size-3.5" aria-hidden />
            Gerenciar
          </Button>
        </div>

        <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-stat-value">
          {feedback.message}
        </p>

        <footer className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-stat-muted">
          <span>{formatDateTimeShortPtOrDash(feedback.createdAt)}</span>
          {feedback.workspace ? (
            <>
              <span aria-hidden>·</span>
              <span>{feedback.workspace.name}</span>
            </>
          ) : null}
          {feedback.adminNote ? (
            <>
              <span aria-hidden>·</span>
              <span className="italic">Nota interna</span>
            </>
          ) : null}
        </footer>
      </article>
    </li>
  )
}
