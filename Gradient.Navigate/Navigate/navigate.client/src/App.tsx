import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { DashboardPage } from './modules/dashboard/DashboardPage'
import { LoginPage } from './modules/auth/LoginPage'
import { PasswordRecoveryPage } from './modules/auth/PasswordRecoveryPage'
import { RegistrationPage } from './modules/auth/RegistrationPage'
import { GuestPaymentPage } from './modules/payment/GuestPaymentPage'
import { EmployeeProfilePage } from './modules/management/EmployeeProfilePage'
import { NavigationKey, navigationItems } from './modules/shared/layout/navigationItems'

type AppView = 'login' | 'registration' | 'recovery' | 'dashboard' | 'guest-payment' | 'employee-profile'

type AppRoute = {
  view: AppView
  dashboardKey?: NavigationKey
}

const navigationKeySet = new Set<NavigationKey>(navigationItems.map((item) => item.key))

const parseRouteFromHash = (): AppRoute => {
  const hash = window.location.hash.replace('#', '')
  if (hash.startsWith('employee/')) {
    return { view: 'employee-profile' }
  }
  if (hash.startsWith('dashboard/')) {
    const key = decodeURIComponent(hash.replace('dashboard/', '')) as NavigationKey
    return {
      view: 'dashboard',
      dashboardKey: navigationKeySet.has(key) ? key : 'dashboard',
    }
  }
  if (hash === 'dashboard') {
    return { view: 'dashboard', dashboardKey: 'dashboard' }
  }
  return { view: 'login' }
}

function App() {
  const [route, setRoute] = useState<AppRoute>(parseRouteFromHash)

  useEffect(() => {
    const handleHashChange = () => setRoute(parseRouteFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateToLogin = () => {
    window.location.hash = ''
    setRoute({ view: 'login' })
  }

  const navigateToDashboard = (key: NavigationKey = 'dashboard') => {
    window.location.hash = `dashboard/${key}`
    setRoute({ view: 'dashboard', dashboardKey: key })
  }

  const content = useMemo(() => {
    switch (route.view) {
      case 'registration':
        return <RegistrationPage onBackToLogin={navigateToLogin} />
      case 'recovery':
        return <PasswordRecoveryPage onBackToLogin={navigateToLogin} />
      case 'dashboard':
        return (
          <DashboardPage
            initialModule={route.dashboardKey}
            onModuleChange={(key) => navigateToDashboard(key)}
          />
        )
      case 'guest-payment':
        return <GuestPaymentPage onBackToLogin={navigateToLogin} />
      case 'employee-profile':
        return <EmployeeProfilePage onNavigateDashboard={navigateToDashboard} />
      default:
        return (
          <LoginPage
            onLogin={() => navigateToDashboard('dashboard')}
            onNavigateRecovery={() => setRoute({ view: 'recovery' })}
            onNavigateRegistration={() => setRoute({ view: 'registration' })}
            onNavigateGuestPayment={() => setRoute({ view: 'guest-payment' })}
          />
        )
    }
  }, [route])

  return <>{content}</>
}

export default App
