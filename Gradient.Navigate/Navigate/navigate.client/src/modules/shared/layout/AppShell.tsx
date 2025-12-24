import type { PropsWithChildren } from 'react'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div>
          <p className="app-shell__title">Navigate</p>
          <p className="app-shell__subtitle">Module-based React architecture</p>
        </div>
        <button className="app-shell__action" type="button">
          Secure Session
        </button>
      </header>
      <main className="app-shell__main">{children}</main>
    </div>
  )
}
