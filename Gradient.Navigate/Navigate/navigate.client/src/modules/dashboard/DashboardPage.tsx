import { SectionCard } from '../shared/components/SectionCard'

export function DashboardPage() {
  return (
    <SectionCard
      title="Core Modules"
      description="Each domain feature lives in its own module folder."
    >
      <div className="module-grid">
        <article className="module-card">
          <h3>Clients</h3>
          <p>Client registry, onboarding, and compliance workflows.</p>
        </article>
        <article className="module-card">
          <h3>Personnel</h3>
          <p>Hiring, assignments, and availability planning.</p>
        </article>
        <article className="module-card">
          <h3>Shipping</h3>
          <p>Carrier integrations, label generation, and tracking.</p>
        </article>
      </div>
    </SectionCard>
  )
}
