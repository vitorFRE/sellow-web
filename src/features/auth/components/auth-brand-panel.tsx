import { AuthBackdrop } from "@/features/auth/components/auth-backdrop"

export function AuthBrandPanel() {
  const year = new Date().getFullYear()

  return (
    <aside className="auth-brand-panel relative hidden overflow-hidden border-r border-border/60 lg:flex lg:flex-col lg:justify-between lg:p-14">
      <AuthBackdrop />
      <div className="relative z-10">
        <span className="text-base font-semibold tracking-tight">Sellow</span>
      </div>

      <div className="relative z-10 max-w-md space-y-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Painel comercial
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-balance xl:text-[2.75rem] xl:leading-[1.1]">
          Leads, propostas e relatórios no mesmo fluxo.
        </h1>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Acompanhe oportunidades e feche negócios com visão clara do funil.
        </p>
      </div>

      <p className="relative z-10 text-xs text-muted-foreground">
        &copy; {year} Sellow
      </p>
    </aside>
  )
}
