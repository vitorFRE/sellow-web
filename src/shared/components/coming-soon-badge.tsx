import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

export function ComingSoonBadge({ className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-amber-700 dark:text-amber-300",
        className
      )}
    >
      Em breve
    </span>
  )
}
