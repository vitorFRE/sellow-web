import type { ReactNode } from "react"
import type { TablerIcon } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

export function PipelineCardIconRow({
  icon: Icon,
  children,
  className,
}: {
  icon: TablerIcon
  children: ReactNode
  className?: string
}) {
  if (children == null || children === "") return null
  return (
    <div
      className={cn(
        "flex items-start gap-2 text-xs text-muted-foreground",
        className
      )}
    >
      <Icon
        className="mt-0.5 size-3.5 shrink-0 opacity-70"
        aria-hidden
      />
      <span className="min-w-0 flex-1 leading-snug wrap-break-word">
        {children}
      </span>
    </div>
  )
}
