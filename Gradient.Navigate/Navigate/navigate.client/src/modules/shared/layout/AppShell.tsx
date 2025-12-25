import type { PropsWithChildren } from 'react'

type SidebarLink = {
  key: string
  label: string
  description?: string
}

type AppShellProps = PropsWithChildren & {
  sidebarLinks?: SidebarLink[]
  activeSidebarKey?: string
  sidebarLabel?: string
  onSidebarSelect?: (key: string) => void
}

const navigation = [
  { label: 'Dashboard', description: 'Overview', active: true },
  { label: 'Clients', description: 'Profiles & contracts' },
  { label: 'Loads', description: 'Shipping workflows' },
  { label: 'Dispatch', description: 'Assignments' },
  { label: 'Billing', description: 'Invoices' },
  { label: 'Analytics', description: 'KPIs' },
  { label: 'Settings', description: 'Preferences' },
]

export function AppShell({
  children,
  sidebarLinks = [],
  activeSidebarKey,
  sidebarLabel,
  onSidebarSelect,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <div className="app-shell__logo">
          <p>NaviGATE</p>
          <span>Operations Suite</span>
        </div>
        <nav className="app-shell__nav">
          {navigation.map((item) => (
            <button
              key={item.label}
              className={`app-shell__nav-item${item.active ? ' app-shell__nav-item--active' : ''}`}
              type="button"
            >
              <span>{item.label}</span>
              <small>{item.description}</small>
            </button>
          ))}
        </nav>
        {sidebarLinks.length > 0 ? (
          <div className="app-shell__nav-section">
            <p className="app-shell__nav-title">{sidebarLabel ?? 'Dashboard Services'}</p>
            <nav className="app-shell__nav">
              {sidebarLinks.map((item) => (
                <button
                  key={item.key}
                  className={`app-shell__nav-item${activeSidebarKey === item.key ? ' app-shell__nav-item--active' : ''}`}
                  type="button"
                  onClick={() => onSidebarSelect?.(item.key)}
                >
                  <span>{item.label}</span>
                  {item.description ? <small>{item.description}</small> : null}
                </button>
              ))}
            </nav>
          </div>
        ) : null}
        <div className="app-shell__footer">
          <p>Active region</p>
          <strong>Southwest Hub</strong>
          <span>Next sync: 14:30</span>
        </div>
      </aside>
      <div className="app-shell__content">
        <header className="app-shell__header">
          <div>
            <p className="app-shell__title">Welcome back, Harmony</p>
            <p className="app-shell__subtitle">Today&apos;s fleet status and compliance checks.</p>
          </div>
          <div className="app-shell__header-actions">
            <button className="app-shell__ghost" type="button">
              Create load
            </button>
            <button className="app-shell__action" type="button">
              Secure Session
            </button>
          </div>
        </header>
        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  )
}
