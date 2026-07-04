import * as React from "react"
import { IconArrowLeft } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { DashboardReveal } from "@/features/dashboard/components/dashboard-reveal"
import { LossReasonsSection } from "@/features/settings/components/loss-reasons-section"
import { MembersSection } from "@/features/settings/components/members-section/members-section"
import { SettingsConfigNav } from "@/features/settings/components/settings-config-nav"
import { SettingsMobileMenuList } from "@/features/settings/components/settings-mobile-menu-list"
import { WorkspacesAdminSection } from "@/features/settings/components/workspaces-admin-section/workspaces-admin-section"
import { FeedbackMySection } from "@/features/settings/components/feedback-my-section"
import { FeedbackAdminSection } from "@/features/settings/components/feedback-admin-section/feedback-admin-section"
import type { SettingsSectionId } from "@/features/settings/config/settings-nav"
import { useVisibleSettingsNavItems } from "@/features/settings/hooks/use-visible-settings-nav-items"
import { useIsMobile } from "@/shared/hooks/use-mobile"

function renderSection(section: SettingsSectionId) {
  if (section === "loss-reasons") return <LossReasonsSection />
  if (section === "members") return <MembersSection />
  if (section === "my-feedback") return <FeedbackMySection />
  if (section === "workspaces-admin") return <WorkspacesAdminSection />
  if (section === "feedback-admin") return <FeedbackAdminSection />
  return null
}

export function ConfiguracoesSettingsPage() {
  const isMobile = useIsMobile()
  const visibleItems = useVisibleSettingsNavItems()
  const [section, setSection] = React.useState<SettingsSectionId>("loss-reasons")
  const [mobilePane, setMobilePane] = React.useState<"menu" | "detail">("menu")
  const prevMobile = React.useRef(isMobile)

  React.useEffect(() => {
    if (!visibleItems.some((item) => item.id === section)) {
      setSection(visibleItems[0]?.id ?? "loss-reasons")
    }
  }, [section, visibleItems])

  React.useEffect(() => {
    if (isMobile && !prevMobile.current) setMobilePane("menu")
    prevMobile.current = isMobile
  }, [isMobile])

  const openSection = React.useCallback(
    (id: SettingsSectionId) => {
      setSection(id)
      if (isMobile) setMobilePane("detail")
    },
    [isMobile]
  )

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-1 flex-col pb-4">
      {isMobile && mobilePane === "menu" ? (
        <DashboardReveal>
          <SettingsMobileMenuList onSelect={openSection} />
        </DashboardReveal>
      ) : null}

      {!isMobile ? (
        <div className="flex min-h-0 w-full flex-1 gap-8 lg:gap-10">
          <SettingsConfigNav section={section} onSectionChange={setSection} />
          <div className="min-w-0 flex-1">
            <DashboardReveal delay={80}>{renderSection(section)}</DashboardReveal>
          </div>
        </div>
      ) : null}

      {isMobile && mobilePane === "detail" ? (
        <div className="flex min-h-0 flex-1 flex-col gap-6">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="-ml-2 w-fit gap-1.5 px-2 text-stat-muted hover:text-stat-value"
            onClick={() => setMobilePane("menu")}
          >
            <IconArrowLeft className="size-4 shrink-0" aria-hidden />
            Voltar
          </Button>
          <DashboardReveal>{renderSection(section)}</DashboardReveal>
        </div>
      ) : null}
    </div>
  )
}
