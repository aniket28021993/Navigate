import { useMemo } from 'react'
import { Navigate, Route, Routes, useNavigate } from './router'
import './App.css'
import { DashboardPage } from './modules/dashboard/DashboardPage'
import { LoginPage } from './modules/auth/LoginPage'
import { PasswordRecoveryPage } from './modules/auth/PasswordRecoveryPage'
import { RegistrationPage } from './modules/auth/RegistrationPage'
import { GuestPaymentPage } from './modules/payment/GuestPaymentPage'
import { EmployeeProfilePage } from './modules/management/EmployeeProfilePage'

function App() {
  const navigate = useNavigate()

  const content = useMemo(() => {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <LoginPage
              onLogin={() => navigate('/dashboard')}
              onNavigateRecovery={() => navigate('/recovery')}
              onNavigateRegistration={() => navigate('/registration')}
              onNavigateGuestPayment={() => navigate('/guest-payment')}
            />
          }
        />
        <Route path="/registration" element={<RegistrationPage onBackToLogin={() => navigate('/login')} />} />
        <Route path="/recovery" element={<PasswordRecoveryPage onBackToLogin={() => navigate('/login')} />} />
        <Route path="/guest-payment" element={<GuestPaymentPage onBackToLogin={() => navigate('/login')} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/employee/:employeeId" element={<EmployeeProfilePage />} />
        <Route path="/:section" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }, [navigate])

  return <>{content}</>
}

export default App
