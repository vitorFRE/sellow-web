import * as React from "react"
import { IconArrowLeft } from "@tabler/icons-react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LossReasonsSection } from "@/features/settings/components/loss-reasons-section"
import { SettingsConfigNav } from "@/features/settings/components/settings-config-nav"
import { SettingsMobileMenuList } from "@/features/settings/components/settings-mobile-menu-list"
import type { SettingsSectionId } from "@/features/settings/config/settings-nav"
import { useIsMobile } from "@/shared/hooks/use-mobile"

function renderSection(section: SettingsSectionId) {
  if (section === "loss-reasons") return <LossReasonsSection />
  return null
}

function SettingsContentColumn({ section }: { section: SettingsSectionId }) {
  return (
    <SidebarInset className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-transparent">
      <div className="flex min-h-0 w-full min-w-0 max-w-2xl flex-1 flex-col gap-6 pt-4 sm:pl-4 sm:pr-2 md:pt-6">
        {renderSection(section)}
      </div>
    </SidebarInset>
  )
}

export function ConfiguracoesSettingsPage() {
  const isMobile = useIsMobile()
  const [section, setSection] = React.useState<SettingsSectionId>("loss-reasons")
  const [mobilePane, setMobilePane] = React.useState<"menu" | "detail">("menu")
  const prevMobile = React.useRef(isMobile)

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
    <div className="-my-4 flex min-h-0 w-full min-w-0 flex-1 flex-col gap-6 md:-my-6">
      {isMobile && mobilePane === "menu" ? (
        <>
          <SettingsMobileMenuList onSelect={openSection} />
        </>
      ) : null}

      {!isMobile ? (
        <SidebarProvider
          persistOpenState={false}
          enableKeyboardShortcut={false}
          className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-4 sm:-ml-4 sm:flex-row sm:items-stretch sm:gap-0 md:-ml-6"
        >
          <SettingsConfigNav section={section} onSectionChange={setSection} />
          <SettingsContentColumn section={section} />
        </SidebarProvider>
      ) : null}

      {isMobile && mobilePane === "detail" ? (
        <div className="flex min-h-0 flex-1 flex-col gap-6">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="-ml-2 w-fit gap-1.5 rounded-2xl px-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobilePane("menu")}
          >
            <IconArrowLeft className="size-4 shrink-0" aria-hidden />
            Voltar às opções
          </Button>
          <div className="flex min-h-0 w-full min-w-0 max-w-2xl flex-1 flex-col gap-6 px-0 pt-4 md:pt-6">
            {renderSection(section)}
          </div>
        </div>
      ) : null}
    </div>
  )
}
