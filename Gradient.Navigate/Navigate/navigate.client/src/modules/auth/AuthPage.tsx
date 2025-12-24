import { SectionCard } from '../shared/components/SectionCard'

export function AuthPage() {
  return (
    <SectionCard
      title="Authentication Module"
      description="Handles login, registration, MFA, and token lifecycle."
    >
      <ul className="feature-list">
        <li>JWT access tokens with refresh flow</li>
        <li>Role-based access control and claims</li>
        <li>Centralized session and security state</li>
      </ul>
      <div className="chip-row">
        <span className="chip">Login</span>
        <span className="chip">Register</span>
        <span className="chip">MFA</span>
        <span className="chip">Session</span>
      </div>
    </SectionCard>
  )
}
