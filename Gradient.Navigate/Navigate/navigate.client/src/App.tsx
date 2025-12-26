import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { DashboardPage } from './modules/dashboard/DashboardPage'
import { LoginPage } from './modules/auth/LoginPage'
import { PasswordRecoveryPage } from './modules/auth/PasswordRecoveryPage'
import { RegistrationPage } from './modules/auth/RegistrationPage'
import { GuestPaymentPage } from './modules/payment/GuestPaymentPage'
import { EmployeeProfilePage } from './modules/management/EmployeeProfilePage'

type AppView = 'login' | 'registration' | 'recovery' | 'dashboard' | 'guest-payment' | 'employee-profile'

const getViewFromHash = (hash: string): AppView | null => {
  if (hash.startsWith('#employee/')) {
    return 'employee-profile'
  }

  switch (hash) {
    case '#dashboard':
      return 'dashboard'
    case '#registration':
      return 'registration'
    case '#recovery':
      return 'recovery'
    case '#guest-payment':
      return 'guest-payment'
    case '#login':
      return 'login'
    default:
      return null
  }
}

const getInitialView = (): AppView => getViewFromHash(window.location.hash) ?? 'login'

const viewToHash: Partial<Record<AppView, string>> = {
  dashboard: '#dashboard',
  registration: '#registration',
  recovery: '#recovery',
  'guest-payment': '#guest-payment',
  login: '#login',
}

function App() {
  const [view, setView] = useState<AppView>(getInitialView)

  useEffect(() => {
    const handleHashChange = () => {
      const nextView = getViewFromHash(window.location.hash)
      if (nextView) {
        setView(nextView)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const setViewAndHash = (nextView: AppView, hashOverride?: string) => {
    setView(nextView)
    const nextHash = hashOverride ?? viewToHash[nextView]
    if (!nextHash) {
      return
    }
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash
    }
  }

  const content = useMemo(() => {
    switch (view) {
      case 'registration':
        return <RegistrationPage onBackToLogin={() => setViewAndHash('login')} />
      case 'recovery':
        return <PasswordRecoveryPage onBackToLogin={() => setViewAndHash('login')} />
      case 'dashboard':
        return <DashboardPage />
      case 'guest-payment':
        return <GuestPaymentPage onBackToLogin={() => setViewAndHash('login')} />
      case 'employee-profile':
        return <EmployeeProfilePage />
      default:
        return (
          <LoginPage
            onLogin={() => setViewAndHash('dashboard')}
            onNavigateRecovery={() => setViewAndHash('recovery')}
            onNavigateRegistration={() => setViewAndHash('registration')}
            onNavigateGuestPayment={() => setViewAndHash('guest-payment')}
          />
        )
    }
  }, [view])

  return <>{content}</>
}

export default App
