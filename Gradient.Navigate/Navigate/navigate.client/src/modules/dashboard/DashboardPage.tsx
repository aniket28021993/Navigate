import { useMemo, useState } from 'react'
import { AppShell } from '../shared/layout/AppShell'
import { ContactPanel } from '../management/ContactPanel'
import { EmployeePanel } from '../management/EmployeePanel'
import { EquipmentPanel } from '../management/EquipmentPanel'
import { PaymentPanel } from '../management/PaymentPanel'

const stats = [
  { label: 'Loads in transit', value: '128', trend: '+12% vs last week' },
  { label: 'On-time delivery', value: '94.2%', trend: 'Maintained target' },
  { label: 'Open exceptions', value: '6', trend: '2 urgent alerts' },
  { label: 'Active drivers', value: '58', trend: '4 pending check-ins' },
]

const loads = [
  {
    id: 'LD-2048',
    client: 'West Canyon Foods',
    route: 'Phoenix, AZ → Denver, CO',
    eta: '16:45 MST',
    status: 'In Transit',
  },
  {
    id: 'LD-2051',
    client: 'Blue Ridge Retail',
    route: 'Austin, TX → Omaha, NE',
    eta: '18:30 CST',
    status: 'At Pickup',
  },
  {
    id: 'LD-2054',
    client: 'Tri City Grocers',
    route: 'Las Vegas, NV → Boise, ID',
    eta: '20:10 PST',
    status: 'Delayed',
  },
]

const activity = [
  {
    time: '08:15 AM',
    title: 'Driver check-in completed',
    detail: 'Unit 18 • Mileage logged 12,140 mi',
  },
  {
    time: '09:05 AM',
    title: 'Customs docs uploaded',
    detail: 'Shipment LD-2051 • 4 files attached',
  },
  {
    time: '10:42 AM',
    title: 'Temperature alert cleared',
    detail: 'Reefer 07 • Restored to 39°F',
  },
]

const modules = [
  {
    name: 'Client Management',
    description: 'Account onboarding, contracts, and billing sync.',
  },
  {
    name: 'Carrier Network',
    description: 'Brokerage partners, capacity tiers, and scorecards.',
  },
  {
    name: 'Dispatch Console',
    description: 'Driver assignments, messaging, and live tracking.',
  },
  {
    name: 'Compliance',
    description: 'DOT renewals, insurance audits, and safety logs.',
  },
]

const tasks = [
  {
    title: 'Approve access for Mayfield Logistics',
    owner: 'Security Desk',
    due: 'Today',
  },
  {
    title: 'Update fuel surcharge table',
    owner: 'Pricing Team',
    due: 'Tomorrow',
  },
  {
    title: 'Review weekly utilization report',
    owner: 'Operations',
    due: 'Friday',
  },
]

const managementTabs = [
  { key: 'employee', label: 'Employee' },
  { key: 'contact', label: 'Contact' },
  { key: 'equipment', label: 'Equipment' },
  { key: 'payment', label: 'Payment Method' },
] as const

type ManagementKey = (typeof managementTabs)[number]['key']

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<ManagementKey>('employee')

  const managementContent = useMemo(() => {
    switch (activeTab) {
      case 'contact':
        return <ContactPanel />
      case 'equipment':
        return <EquipmentPanel />
      case 'payment':
        return <PaymentPanel />
      default:
        return <EmployeePanel />
    }
  }, [activeTab])

  return (
    <AppShell>
      <div className="dashboard">
        <section className="dashboard__stats">
          {stats.map((item) => (
            <article key={item.label} className="stat-card">
              <p className="stat-card__label">{item.label}</p>
              <h3>{item.value}</h3>
              <span className="stat-card__trend">{item.trend}</span>
            </article>
          ))}
        </section>

        <section className="dashboard__grid">
          <article className="data-card">
            <header className="data-card__header">
              <div>
                <h2>Active loads</h2>
                <p>Latest dispatch milestones across today&apos;s shipments.</p>
              </div>
              <button className="data-card__action" type="button">
                View all
              </button>
            </header>
            <div className="data-table">
              <div className="data-table__row data-table__row--header">
                <span>Load</span>
                <span>Client</span>
                <span>Route</span>
                <span>ETA</span>
                <span>Status</span>
              </div>
              {loads.map((load) => (
                <div key={load.id} className="data-table__row">
                  <span>{load.id}</span>
                  <span>{load.client}</span>
                  <span>{load.route}</span>
                  <span>{load.eta}</span>
                  <span className={`status-pill status-pill--${load.status.replace(' ', '').toLowerCase()}`}>
                    {load.status}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="data-card">
            <header className="data-card__header">
              <div>
                <h2>Today&apos;s activity</h2>
                <p>Live operational updates from the field.</p>
              </div>
            </header>
            <div className="activity-list">
              {activity.map((item) => (
                <div key={item.title} className="activity-item">
                  <span className="activity-item__time">{item.time}</span>
                  <div>
                    <p className="activity-item__title">{item.title}</p>
                    <p className="activity-item__detail">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="data-card__footer">
              <button className="data-card__action" type="button">
                Review alerts
              </button>
            </div>
          </article>
        </section>

        <section className="dashboard__grid dashboard__grid--secondary">
          <article className="data-card">
            <header className="data-card__header">
              <div>
                <h2>Module coverage</h2>
                <p>Architecture blocks prepared for API integration.</p>
              </div>
            </header>
            <div className="module-grid">
              {modules.map((module) => (
                <article key={module.name} className="module-card">
                  <h3>{module.name}</h3>
                  <p>{module.description}</p>
                </article>
              ))}
            </div>
          </article>
          <article className="data-card">
            <header className="data-card__header">
              <div>
                <h2>Priority tasks</h2>
                <p>Next actions for your team.</p>
              </div>
            </header>
            <div className="task-list">
              {tasks.map((task) => (
                <div key={task.title} className="task-item">
                  <div>
                    <p className="task-item__title">{task.title}</p>
                    <p className="task-item__owner">{task.owner}</p>
                  </div>
                  <span className="task-item__due">{task.due}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="management">
          <header className="management__header">
            <div>
              <h2>Dashboard Services</h2>
              <p>Quick access to employee records, contacts, equipment, and payment methods.</p>
            </div>
            <div className="management__tabs">
              {managementTabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`management__tab${activeTab === tab.key ? ' management__tab--active' : ''}`}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </header>
          <div className="management__content">{managementContent}</div>
        </section>
      </div>
    </AppShell>
  )
}
