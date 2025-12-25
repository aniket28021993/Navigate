import type { FormEvent } from 'react'
import { useState } from 'react'
import { AuthLayout } from './AuthLayout'

interface PasswordRecoveryPageProps {
  onBackToLogin: () => void
}

export function PasswordRecoveryPage({ onBackToLogin }: PasswordRecoveryPageProps) {
  const captchaOptions = ['dwwp9ury', 'v3x7k2m1', '8qz4t2r9']
  const [captcha, setCaptcha] = useState(captchaOptions[0])
  const [status, setStatus] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('Recovery request sent. Check your inbox for next steps.')
  }

  return (
    <AuthLayout
      title="Password Recovery"
      subtitle="Verify your profile and reset your credentials."
      helper="Use the captcha below to validate your identity."
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
