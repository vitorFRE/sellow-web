import { IconMessageCircle, IconStar } from "@tabler/icons-react"

import type { Lead } from "@/features/leads/types/lead"

function formatScore(value: number) {
  if (Number.isInteger(value)) return String(value)
  return value.toFixed(1)
}

export function LeadNameCell({ lead }: { lead: Lead }) {
  const score = lead.totalScore
  const reviews = lead.reviewsCount
  const hasScore = score != null && !Number.isNaN(Number(score))
  const hasReviews = reviews != null && !Number.isNaN(Number(reviews))
  const showMeta = hasScore || hasReviews

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="truncate font-medium">{lead.name}</span>
      {showMeta ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
          {hasScore ? (
            <span
              className="inline-flex items-center gap-1 tabular-nums"
              title="Nota média"
            >
              <IconStar className="size-3.5 shrink-0 text-amber-500" />
              {formatScore(Number(score))}
            </span>
          ) : null}
          {hasReviews ? (
            <span
              className="inline-flex items-center gap-1 tabular-nums"
              title="Quantidade de avaliações"
            >
              <IconMessageCircle className="size-3.5 shrink-0" />
              {Number(reviews)}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
