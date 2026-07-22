import {
  INTEGRATION_RUN_STATUS_LABEL,
  integrationRunStatusTone,
  type IntegrationStatusTone,
} from "@/features/integrations/lib/integration-run-status"
import type { IntegrationRunStatus } from "@/features/integrations/types/integration-run"
import { cn } from "@/lib/utils"

const TONE_CLASS: Record<IntegrationStatusTone, string> = {
  neutral:
    "border-border bg-muted text-stat-muted",
  blue: "border-transparent bg-[#E1F3FE] text-[#1F6C9F] dark:bg-[#1F6C9F]/20 dark:text-[#8EC8E8]",
  yellow:
    "border-transparent bg-[#FBF3DB] text-[#956400] dark:bg-[#956400]/25 dark:text-[#E6C87A]",
  green:
    "border-transparent bg-[#EDF3EC] text-[#346538] dark:bg-[#346538]/25 dark:text-[#9BC49E]",
  red: "border-transparent bg-[#FDEBEC] text-[#9F2F2D] dark:bg-[#9F2F2D]/25 dark:text-[#E8A09E]",
}

type Props = {
  status: IntegrationRunStatus
  className?: string
}

export function IntegrationRunStatusBadge({ status, className }: Props) {
  const tone = integrationRunStatusTone(status)
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-[0.05em] uppercase",
        TONE_CLASS[tone],
        className
      )}
    >
      {INTEGRATION_RUN_STATUS_LABEL[status]}
    </span>
  )
}
