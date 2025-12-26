import type { PropsWithChildren } from 'react'

type NavigationLink = {
  key: string
  label: string
  description?: string
}

type AppShellProps = PropsWithChildren & {
  navigationLinks?: NavigationLink[]
  activeNavigationKey?: string
  onNavigationSelect?: (key: string) => void
  actionMessage?: string
  onHeaderAction?: (action: string) => void
}

export function AppShell({
  children,
  navigationLinks = [],
  activeNavigationKey,
  onNavigationSelect,
  actionMessage,
  onHeaderAction,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <div className="app-shell__logo">
          <p>NaviGATE</p>
          <span>Operations Suite</span>
        </div>
        <nav className="app-shell__nav">
          {navigationLinks.map((item) => (
            <button
              key={item.key}
              className={`app-shell__nav-item${activeNavigationKey === item.key ? ' app-shell__nav-item--active' : ''}`}
              type="button"
              onClick={() => onNavigationSelect?.(item.key)}
            >
              <span>{item.label}</span>
              {item.description ? <small>{item.description}</small> : null}
            </button>
          ))}
        </nav>
        <div className="app-shell__footer">
          <p>Active region</p>
          <strong>Southwest Hub</strong>
          <span>Next sync: 14:30</span>
        </div>
      </aside>
      <div className="app-shell__content">
        <div className="app-shell__mobile-header">
          <div>
            <p className="app-shell__mobile-title">NaviGATE</p>
            <span className="app-shell__mobile-subtitle">Fleet pulse &amp; quick actions</span>
          </div>
          <button className="app-shell__mobile-action" type="button" onClick={() => onHeaderAction?.('Settings')}>
            Settings
          </button>
        </div>
        {navigationLinks.length ? (
          <nav className="app-shell__mobile-nav">
            {navigationLinks.map((item) => (
              <button
                key={item.key}
                className={`app-shell__mobile-link${activeNavigationKey === item.key ? ' app-shell__mobile-link--active' : ''}`}
                type="button"
                onClick={() => onNavigationSelect?.(item.key)}
              >
                <span>{item.label}</span>
                {item.description ? <small>{item.description}</small> : null}
              </button>
            ))}
          </nav>
        ) : null}
        <header className="app-shell__header">
          <div>
            <p className="app-shell__title">Welcome back, Harmony</p>
            <p className="app-shell__subtitle">Today&apos;s fleet status and compliance checks.</p>
          </div>
          <div className="app-shell__header-actions">
            <button className="app-shell__ghost" type="button" onClick={() => onHeaderAction?.('Settings')}>
              Settings
            </button>
            <button className="app-shell__action" type="button" onClick={() => onHeaderAction?.('Logout')}>
              Logout
            </button>
          </div>
        </header>
        {actionMessage ? (
          <div className="action-feedback" role="status">
            {actionMessage}
          </div>
        ) : null}
        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  )
}
