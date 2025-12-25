import type { FormEvent } from 'react'
import { useState } from 'react'
import { AuthLayout } from './AuthLayout'

interface RegistrationPageProps {
  onBackToLogin: () => void
}

export function RegistrationPage({ onBackToLogin }: RegistrationPageProps) {
  const captchaOptions = ['g2c6c2z1', 'm8n4p1w2', 't5y7u9k3']
  const [captcha, setCaptcha] = useState(captchaOptions[0])
  const [status, setStatus] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('Registration request saved. An admin will review the details.')
  }

  return (
    <AuthLayout
      title="Account Registration"
      subtitle="Create a new Gradient NaviGATE profile."
      helper="All fields are required for initial access provisioning."
      footer={
        <button className="auth-button auth-button--secondary" type="button" onClick={onBackToLogin}>
          Back to Login Page
        </button>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-field">
          <span className="auth-field__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <input type="text" name="username" placeholder="Enter your username" />
        </label>
        <label className="auth-field">
          <span className="auth-field__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16v16H4z" />
              <path d="M22 6 12 13 2 6" />
            </svg>
          </span>
          <input type="email" name="email" placeholder="Work email" />
        </label>
        <label className="auth-field">
          <span className="auth-field__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 1 1 8 0v4" />
            </svg>
          </span>
          <input type="password" name="password" placeholder="Create password" />
        </label>
        <div className="auth-captcha">
          <div className="auth-captcha__image" aria-hidden="true">
            {captcha}
          </div>
          <button
            type="button"
            className="auth-captcha__refresh"
            onClick={() => {
              const next = captchaOptions[(captchaOptions.indexOf(captcha) + 1) % captchaOptions.length]
              setCaptcha(next)
              setStatus('Captcha refreshed.')
            }}
          >
            Refresh
          </button>
          <label className="auth-captcha__input">
            <span>Input symbols</span>
            <input type="text" name="captcha" placeholder="Enter symbols" />
          </label>
        </div>
        {status ? <div className="action-feedback action-feedback--inline">{status}</div> : null}
        <button type="submit" className="auth-button auth-button--primary">
          Submit
        </button>
      </form>
    </AuthLayout>
  )
}
