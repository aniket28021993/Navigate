import { useMemo, useState } from 'react'

const userRoles = ['Accounting', 'Admin', 'Owner', 'Permitting']

export function UserSettingsPanel() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const passwordRules = useMemo(() => {
    return {
      length: newPassword.length >= 10,
      upper: /[A-Z]/.test(newPassword),
      lower: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      notSame: newPassword.length > 0 && newPassword !== currentPassword,
    }
  }, [currentPassword, newPassword])

  const allRulesMet = Object.values(passwordRules).every(Boolean)
  const confirmationMatches = newPassword.length > 0 && newPassword === confirmPassword

  const handleSavePassword = () => {
    setStatus('')
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please complete all password fields.')
      return
    }
    if (!allRulesMet) {
      setError('New password does not meet the required rules.')
      return
    }
    if (!confirmationMatches) {
      setError('Password confirmation does not match.')
      return
    }
    setError('')
    setStatus('Password updated securely.')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="management-view">
      <div className="management-view__header">
        <div>
          <h2>User Settings</h2>
          <p>Review assigned roles and manage your account password.</p>
        </div>
        <div className="management-view__logo">
          <strong>Harmony Fields</strong>
          <span>Signed in</span>
        </div>
      </div>

      <div className="settings-grid settings-grid--stack">
        <section className="settings-card">
          <header className="settings-card__header">
            <div>
              <h3>Your roles</h3>
              <p>Permissions granted to your profile.</p>
            </div>
          </header>
          <div className="settings-role-list">
            {userRoles.map((role) => (
              <span key={role} className="settings-role-pill">
                {role}
              </span>
            ))}
          </div>
        </section>

        <section className="settings-card">
          <header className="settings-card__header">
            <div>
              <h3>Password management</h3>
              <p>Update your password with the required security rules.</p>
            </div>
          </header>
          <div className="settings-form">
            <label className="settings-field">
              <span>Current password</span>
              <input
                className="settings-input"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                placeholder="Enter current password"
              />
            </label>
            <label className="settings-field">
              <span>New password</span>
              <input
                className="settings-input"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Create a new password"
              />
            </label>
            <label className="settings-field">
              <span>Confirm new password</span>
              <input
                className="settings-input"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter new password"
              />
            </label>
          </div>
          <div className="settings-rules">
            <p>Password rules</p>
            <ul>
              <li className={passwordRules.length ? 'is-complete' : ''}>At least 10 characters</li>
              <li className={passwordRules.number ? 'is-complete' : ''}>Includes a number</li>
              <li className={passwordRules.upper ? 'is-complete' : ''}>Includes an uppercase letter</li>
              <li className={passwordRules.lower ? 'is-complete' : ''}>Includes a lowercase letter</li>
              <li className={passwordRules.notSame ? 'is-complete' : ''}>Different from current password</li>
              <li className={confirmationMatches ? 'is-complete' : ''}>Confirmation matches new password</li>
            </ul>
          </div>
          {error ? <p className="settings-error">{error}</p> : null}
          {status ? <p className="settings-success">{status}</p> : null}
          <div className="settings-card__footer">
            <button type="button" className="settings-primary" onClick={handleSavePassword}>
              Update password
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
