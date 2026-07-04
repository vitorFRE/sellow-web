import * as React from "react"

import { dashboardSidebarData } from "@/features/dashboard/config/dashboard-sidebar-data"
import { NavMain } from "@/features/dashboard/components/nav-main"
import {
  NavSecondary,
  type NavSecondaryItem,
} from "@/features/dashboard/components/nav-secondary"
import { NavUser } from "@/features/dashboard/components/nav-user"
import { FeedbackSubmitDialog } from "@/features/feedback/components/feedback-submit-dialog"
import { useFeedbackMutations } from "@/features/feedback/hooks/use-feedback-mutations"
import { useAuthUser } from "@/features/auth/queries/auth-me-query"
import { WorkspaceSwitcher } from "@/features/workspaces/components/workspace-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

const nav = dashboardSidebarData

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: authUser } = useAuthUser()
  const [feedbackOpen, setFeedbackOpen] = React.useState(false)
  const { createMutation } = useFeedbackMutations({
    onCreateSuccess: () => setFeedbackOpen(false),
  })

  const user = {
    name: authUser?.name ?? "Carregando...",
    email: authUser?.email ?? "",
    avatar: "",
  }

  const navSecondaryItems: NavSecondaryItem[] = nav.navSecondary.map((item) => {
    if (item.title === "Feedback") {
      return {
        ...item,
        onClick: () => setFeedbackOpen(true),
      }
    }
    return item
  })

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={nav.navMain} label="Principal" />
        <NavMain items={nav.navImport} label="Importação" />
        <NavSecondary items={navSecondaryItems} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <FeedbackSubmitDialog
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        isPending={createMutation.isPending}
        onSubmit={(payload) => createMutation.mutate(payload)}
      />
    </Sidebar>
  )
}
