import { AuthBackdrop } from "@/features/auth/components/auth-backdrop"
import { LoginForm } from "@/features/auth/components/login-form"

export function LoginPage() {
  const year = new Date().getFullYear()

  return (
    <div className="auth-surface relative flex min-h-[100dvh] flex-col">
      <AuthBackdrop />
      <header className="relative z-10 px-6 py-6 sm:px-10 lg:px-14">
        <span className="text-base font-semibold tracking-tight">Sellow</span>
      </header>
      <main className="relative z-10 flex flex-1 items-center px-6 pb-12 sm:px-10 lg:px-14">
        <div className="w-full max-w-md lg:max-w-lg">
          <LoginForm />
        </div>
      </main>

      <footer className="relative z-10 px-6 py-6 text-xs text-muted-foreground sm:px-10 lg:px-14">
        <p>&copy; {year} Sellow</p>
      </footer>
    </div>
  )
}
