export function AuthBackdrop() {
  return (
    <div className="auth-backdrop" aria-hidden>
      <img
        src="/images/login-pattern-ambient.png"
        alt=""
        decoding="async"
        fetchPriority="low"
      />
    </div>
  )
}