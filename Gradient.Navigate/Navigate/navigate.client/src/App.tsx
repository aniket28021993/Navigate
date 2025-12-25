import { useMemo, useState } from 'react'
import './App.css'
import { DashboardPage } from './modules/dashboard/DashboardPage'
import { LoginPage } from './modules/auth/LoginPage'
import { PasswordRecoveryPage } from './modules/auth/PasswordRecoveryPage'
import { RegistrationPage } from './modules/auth/RegistrationPage'
import { GuestPaymentPage } from './modules/payment/GuestPaymentPage'

type AppView = 'login' | 'registration' | 'recovery' | 'dashboard' | 'guest-payment'

function App() {
  const [view, setView] = useState<AppView>('login')

  const content = useMemo(() => {
    switch (view) {
      case 'registration':
        return <RegistrationPage onBackToLogin={() => setView('login')} />
      case 'recovery':
        return <PasswordRecoveryPage onBackToLogin={() => setView('login')} />
      case 'dashboard':
        return <DashboardPage />
      case 'guest-payment':
        return <GuestPaymentPage onBackToLogin={() => setView('login')} />
      default:
        return (
          <LoginPage
            onLogin={() => setView('dashboard')}
            onNavigateRecovery={() => setView('recovery')}
            onNavigateRegistration={() => setView('registration')}
            onNavigateGuestPayment={() => setView('guest-payment')}
          />
        )
    }
  }, [view])

  return <>{content}</>
}

export default App
