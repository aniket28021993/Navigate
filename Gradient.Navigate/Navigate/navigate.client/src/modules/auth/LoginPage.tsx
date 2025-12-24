export function LoginPage() {
  return (
    <div className="login-page">
      <section className="login-page__left">
        <div className="login-card">
          <header className="login-card__header">
            <p className="login-card__brand">Gradient's <strong>NaviGATE</strong></p>
            <h1>Sign in to your account.</h1>
          </header>
          <form className="login-card__form">
            <label className="login-field">
              <span className="login-field__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input type="email" name="email" placeholder="jeffd@gradientway.com" />
            </label>
            <label className="login-field">
              <span className="login-field__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V7a4 4 0 1 1 8 0v4" />
                </svg>
              </span>
              <input type="password" name="password" placeholder="••••••••" />
            </label>
            <div className="login-card__links">
              <span>Forgot your password?</span>
              <a href="#">Password Recovery</a>
            </div>
            <button type="submit" className="login-card__submit">Login</button>
            <div className="login-card__links login-card__links--secondary">
              <span>New Account?</span>
              <a href="#">Account Registration</a>
            </div>
          </form>
        </div>
      </section>
      <section className="login-page__right" aria-hidden="true" />
    </div>
  )
}
