import { cn } from "@/lib/utils"

type Props = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function DashboardSectionHeader({
  eyebrow,
  title,
  description,
  className,
}: Props) {
  return (
    <header className={cn("border-b border-border pb-5", className)}>
      {eyebrow ? (
        <p className="mb-2 text-[11px] font-medium tracking-[0.14em] text-stat-label uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-base font-semibold tracking-tight text-stat-value">
        {title}
      </h2>
      {description ? (
        <p className="mt-1.5 text-sm leading-relaxed text-stat-muted">
          {description}
        </p>
      ) : null}
    </header>
  )
}
