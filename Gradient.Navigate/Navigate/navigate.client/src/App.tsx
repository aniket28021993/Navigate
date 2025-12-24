import './App.css'
import { AuthPage } from './modules/auth/AuthPage'
import { DashboardPage } from './modules/dashboard/DashboardPage'
import { AppShell } from './modules/shared/layout/AppShell'

function App() {
  return (
    <AppShell>
      <div className="app-grid">
        <DashboardPage />
        <AuthPage />
      </div>
    </AppShell>
  )
}

export default App
