import type { PropsWithChildren, ReactNode } from 'react'

interface AuthLayoutProps extends PropsWithChildren {
  title: string
  subtitle: string
  helper?: string
  footer?: ReactNode
}

export function AuthLayout({ title, subtitle, helper, footer, children }: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <section className="auth-page__form">
        <div className="auth-card">
          <header className="auth-card__header">
            <p className="auth-card__brand">
              Gradient&apos;s <strong>NaviGATE</strong>
            </p>
            <h1>{title}</h1>
            <p className="auth-card__subtitle">{subtitle}</p>
            {helper ? <p className="auth-card__helper">{helper}</p> : null}
          </header>
          <div className="auth-card__content">{children}</div>
          {footer ? <div className="auth-card__footer">{footer}</div> : null}
        </div>
      </section>
      <section className="auth-page__visual" aria-hidden="true" />
    </div>
  )
}
