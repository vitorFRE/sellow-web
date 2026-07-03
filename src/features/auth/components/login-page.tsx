import { AuthBackdrop } from "@/features/auth/components/auth-backdrop"
import { AuthBrandPanel } from "@/features/auth/components/auth-brand-panel"
import { LoginForm } from "@/features/auth/components/login-form"

export function LoginPage() {
  const year = new Date().getFullYear()

  return (
    <div className="auth-surface grid min-h-[100dvh] lg:grid-cols-2">
      <AuthBrandPanel />

      <div className="relative flex flex-col bg-background">
        <div className="pointer-events-none absolute inset-0 lg:hidden" aria-hidden>
          <AuthBackdrop subdued />
        </div>

        <header className="relative z-10 px-6 py-6 sm:px-10 lg:hidden">
          <span className="text-base font-semibold tracking-tight">Sellow</span>
        </header>

        <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-[22rem]">
            <LoginForm />
          </div>
        </main>

        <footer className="relative z-10 px-6 py-6 text-xs text-muted-foreground sm:px-10 lg:hidden">
          <p>&copy; {year} Sellow</p>
        </footer>
      </div>
    </div>
  )
}
