import * as React from "react"

type Props = {
  step: number
  title: string
  description?: string
  children: React.ReactNode
}

export function ImportStepPanel({
  step,
  title,
  description,
  children,
}: Props) {
  return (
    <section className="flex flex-col gap-4 rounded-4xl border border-border/80 bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold tabular-nums text-primary"
          aria-hidden
        >
          {step}
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <h2 className="text-base font-medium tracking-tight">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
