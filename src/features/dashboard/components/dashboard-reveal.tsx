import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

type Props = {
  children: ReactNode
  delay?: number
  className?: string
}

export function DashboardReveal({ children, delay = 0, className }: Props) {
  return (
    <div
      className={cn("dashboard-reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
