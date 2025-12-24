import { useMemo, useState } from 'react'
import './App.css'
import { DashboardPage } from './modules/dashboard/DashboardPage'
import { LoginPage } from './modules/auth/LoginPage'
import { PasswordRecoveryPage } from './modules/auth/PasswordRecoveryPage'
import { RegistrationPage } from './modules/auth/RegistrationPage'

type AppView = 'login' | 'registration' | 'recovery' | 'dashboard'

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
      default:
        return (
          <LoginPage
            onLogin={() => setView('dashboard')}
            onNavigateRecovery={() => setView('recovery')}
            onNavigateRegistration={() => setView('registration')}
          />
        )
    }
  }, [view])

  return <>{content}</>
}

export default App
