import type { FormEvent } from 'react'
import { useState } from 'react'
import { AuthLayout } from './AuthLayout'

interface LoginPageProps {
  onLogin: () => void
  onNavigateRecovery: () => void
  onNavigateRegistration: () => void
  onNavigateGuestPayment: () => void
}

export function LoginPage({ onLogin, onNavigateRecovery, onNavigateRegistration, onNavigateGuestPayment }: LoginPageProps) {
  const [status, setStatus] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('Signing you in with demo credentials.')
    window.setTimeout(() => {
      onLogin()
    }, 400)
  }

  return (
    <AuthLayout title="Sign in" subtitle="Access your dispatch and compliance workspace.">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-field">
          <span className="auth-field__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <input type="email" name="email" placeholder="Enter your username" />
        </label>
        <label className="auth-field">
          <span className="auth-field__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 1 1 8 0v4" />
            </svg>
          </span>
          <input type="password" name="password" placeholder="Password" />
        </label>
        <div className="auth-links">
          <span>Forgot your password?</span>
          <a
            className="auth-link"
            href="#password-recovery"
            onClick={(event) => {
              event.preventDefault()
              setStatus('Redirecting to password recovery.')
              onNavigateRecovery()
            }}
          >
            Password Recovery
          </a>
        </div>
        {status ? <div className="action-feedback action-feedback--inline">{status}</div> : null}
        <button type="submit" className="auth-button auth-button--primary">
          Login
        </button>
        <div className="auth-links auth-links--secondary">
          <span>Need to pay an invoice?</span>
          <a
            className="auth-link"
            href="#guest-payment"
            onClick={(event) => {
              event.preventDefault()
              setStatus('Opening guest payment form.')
              onNavigateGuestPayment()
            }}
          >
            Make a guest payment
          </a>
        </div>
        <div className="auth-links auth-links--secondary">
          <span>New account?</span>
          <a
            className="auth-link"
            href="#account-registration"
            onClick={(event) => {
              event.preventDefault()
              setStatus('Opening registration form.')
              onNavigateRegistration()
            }}
          >
            Account Registration
          </a>
        </div>
      </form>
    </AuthLayout>
  )
}
