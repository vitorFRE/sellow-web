import { cn } from "@/lib/utils"

type AuthBackdropProps = {
  subdued?: boolean
  className?: string
}

export function AuthBackdrop({ subdued = false, className }: AuthBackdropProps) {
  return (
    <div
      className={cn("auth-backdrop", subdued && "auth-backdrop--subdued", className)}
      aria-hidden
    >
      <img
        src="/images/login-pattern-ambient.png"
        alt=""
        decoding="async"
        fetchPriority="low"
      />
    </div>
  )
}