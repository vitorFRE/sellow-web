import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"
import type { QueryClient } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"

//import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootLayout,
  }
)

function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
      {/*  {import.meta.env.DEV ? <TanStackRouterDevtools /> : null} */}
    </>
  )
}
