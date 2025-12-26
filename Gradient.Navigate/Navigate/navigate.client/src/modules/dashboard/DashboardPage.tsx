import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from '../../router'
import { AppShell } from '../shared/layout/AppShell'
import { getNavigationPath, navigationItems } from '../shared/layout/navigationItems'
import type { NavigationKey } from '../shared/layout/navigationItems'
import { ContactPanel } from '../management/ContactPanel'
import { EmployeePanel } from '../management/EmployeePanel'
import { EquipmentPanel } from '../management/EquipmentPanel'
import { PaymentPanel } from '../management/PaymentPanel'
import { TablePagination } from '../shared/components/TablePagination'

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

export function DashboardPage() {
  const navigate = useNavigate()
  const { section } = useParams<{ section?: string }>()
  const [activeModule, setActiveModule] = useState<NavigationKey>('dashboard')
  const [feedback, setFeedback] = useState('')
  const [loadsPage, setLoadsPage] = useState(1)
  const validKeys = useMemo(() => new Set(navigationItems.map((item) => item.key)), [])
  const loadsPageSize = 4
  const loadsTotalPages = Math.max(1, Math.ceil(loads.length / loadsPageSize))
  const paginatedLoads = useMemo(() => {
    const startIndex = (loadsPage - 1) * loadsPageSize
    return loads.slice(startIndex, startIndex + loadsPageSize)
  }, [loadsPage, loadsPageSize])

  useEffect(() => {
    if (!section) {
      setActiveModule('dashboard')
      return
    }
    if (!validKeys.has(section)) {
      navigate('/dashboard', { replace: true })
      return
    }
    setActiveModule(section as NavigationKey)
  }, [navigate, section, validKeys])

  useEffect(() => {
    if (loadsPage > loadsTotalPages) {
      setLoadsPage(loadsTotalPages)
    }
  }, [loadsPage, loadsTotalPages])

  const handleFeedback = (message: string) => {
    setFeedback(message)
    window.setTimeout(() => {
      setFeedback((current) => (current === message ? '' : current))
    }, 2000)
  }

  const moduleContent = useMemo(() => {
    switch (activeModule) {
      case 'employee':
        return <EmployeePanel />
      case 'contact':
        return <ContactPanel />
      case 'equipment':
        return <EquipmentPanel />
      case 'payment':
        return <PaymentPanel />
      default:
        return null
    }
  }, [activeModule])

  return (
    <AppShell
      navigationLinks={navigationItems.map((item) => ({
        key: item.key,
        label: item.label,
        description: item.description,
      }))}
      activeNavigationKey={activeModule}
      onNavigationSelect={(key) => {
        const nextKey = key as NavigationKey
        navigate(getNavigationPath(nextKey))
        handleFeedback(`Opened ${navigationItems.find((item) => item.key === nextKey)?.label} workspace.`)
      }}
      actionMessage={feedback}
      onHeaderAction={(action) => handleFeedback(`${action} action queued.`)}
    >
      {activeModule === 'dashboard' ? (
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
                <button
                  className="data-card__action"
                  type="button"
                  onClick={() => handleFeedback('Active loads view opened.')}
                >
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
                {paginatedLoads.map((load) => (
                  <div key={load.id} className="data-table__row">
                    <span data-label="Load">{load.id}</span>
                    <span data-label="Client">{load.client}</span>
                    <span data-label="Route">{load.route}</span>
                    <span data-label="ETA">{load.eta}</span>
                    <span
                      data-label="Status"
                      className={`status-pill status-pill--${load.status.replace(' ', '').toLowerCase()}`}
                    >
                      {load.status}
                    </span>
                  </div>
                ))}
              </div>
              <TablePagination
                currentPage={loadsPage}
                totalItems={loads.length}
                pageSize={loadsPageSize}
                onPageChange={setLoadsPage}
                itemLabel="loads"
              />
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
                <button
                  className="data-card__action"
                  type="button"
                  onClick={() => handleFeedback('Alert review queue opened.')}
                >
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
        </div>
      ) : (
        moduleContent
      )}
    </AppShell>
  )
}
