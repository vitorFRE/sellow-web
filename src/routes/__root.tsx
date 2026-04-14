import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"
import type { QueryClient } from "@tanstack/react-query"

//import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <Outlet />
      {/*  {import.meta.env.DEV ? <TanStackRouterDevtools /> : null} */}
    </>
  )
}
