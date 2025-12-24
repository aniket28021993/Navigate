import { useMemo, useState } from 'react'
import { DashboardPage } from '../dashboard/DashboardPage'
import { LoginPage } from '../auth/LoginPage'
import { PasswordRecoveryPage } from '../auth/PasswordRecoveryPage'
import { RegistrationPage } from '../auth/RegistrationPage'

const previewTabs = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'login', label: 'Login' },
  { key: 'registration', label: 'Registration' },
  { key: 'recovery', label: 'Password Recovery' },
] as const

type PreviewKey = (typeof previewTabs)[number]['key']

export function PreviewPage() {
  const [active, setActive] = useState<PreviewKey>('dashboard')

  const content = useMemo(() => {
    switch (active) {
      case 'login':
        return <LoginPage />
      case 'registration':
        return <RegistrationPage />
      case 'recovery':
        return <PasswordRecoveryPage />
      default:
        return <DashboardPage />
    }
  }, [active])

  return (
    <div className="preview-shell">
      <header className="preview-shell__header">
        <div>
          <h2>NaviGATE UI Preview</h2>
          <p>Module architecture with dummy data for API binding.</p>
        </div>
        <div className="preview-shell__tabs">
          {previewTabs.map((tab) => (
            <button
              key={tab.key}
              className={`preview-shell__tab${active === tab.key ? ' preview-shell__tab--active' : ''}`}
              type="button"
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>
      <div className="preview-shell__content">{content}</div>
    </div>
  )
}
