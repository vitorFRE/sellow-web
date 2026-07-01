import * as React from "react"

import { cn } from "@/lib/utils"

type Props = {
  step: number
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

function stepLabel(step: number) {
  return String(step).padStart(2, "0")
}

export function ImportStepPanel({
  step,
  title,
  description,
  children,
  className,
}: Props) {
  return (
    <section className={cn("dashboard-stat-board space-y-6", className)}>
      <header className="flex items-start gap-5 border-b border-border pb-5">
        <span
          className="shrink-0 font-mono text-xs tabular-nums text-stat-muted"
          aria-hidden
        >
          {stepLabel(step)}
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <h2 className="text-base font-semibold tracking-tight text-stat-value">
            {title}
          </h2>
          {description ? (
            <p className="text-sm leading-relaxed text-stat-muted">{description}</p>
          ) : null}
        </div>
      </header>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
