import type { ReactNode } from "react"

import { AppSidebar } from "@/features/dashboard/components/app-sidebar"
import { WorkspaceProvider } from "@/features/workspaces/context/workspace-context"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <SidebarProvider className="dashboard-canvas h-svh overflow-hidden p-2 md:p-3">
        <AppSidebar />
        <SidebarInset
          className={cn(
            "dashboard-float-main relative z-10 h-[calc(100svh-1rem)] min-h-0 min-w-0 overflow-hidden md:h-[calc(100svh-1.5rem)]",
            "md:ml-2"
          )}
        >
          <header className="relative z-10 flex h-14 shrink-0 items-center gap-2 border-b border-border/40 px-4 md:px-5">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-center"
            />
          </header>
          <div className="relative z-10 flex min-h-0 w-full min-w-0 flex-1 flex-col gap-5 overflow-auto p-4 md:gap-6 md:p-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </WorkspaceProvider>
  )
}
