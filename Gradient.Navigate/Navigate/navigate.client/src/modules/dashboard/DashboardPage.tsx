import { useMemo, useState } from 'react'
import { AppShell } from '../shared/layout/AppShell'

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

const employeeRows = [
  {
    lastName: 'Driver',
    firstName: 'New',
    phone: '(480) 555-0112',
    email: 'newdriver@prodemo.com',
    dob: '1/1/1901',
    hireDate: '7/31/2025',
    jobTitle: 'Commercial Driver',
    licenseNumber: '008012',
    licenseState: 'AZ',
    licenseClass: 'A',
  },
]

const contactRows = [
  {
    name: 'rahultoday',
    email: 'today@grr.la',
    phone: '123-458-5555',
    fax: '424-541-4245',
    status: 'Active',
  },
  {
    name: 'Suresh Kamat',
    email: 'newtest@gmail.com',
    phone: '916-445-9697',
    fax: '—',
    status: 'Active',
  },
  {
    name: 'ZXsa',
    email: 'rahulss@grr.la',
    phone: '121-353-1111',
    fax: '—',
    status: 'Active',
  },
]

const equipmentRows = [
  {
    unitNumber: 'Unit 18',
    unitType: 'Reefer',
    vin: '1HTMMAAL9SH001314',
    status: 'Active',
  },
]

const paymentRows = [
  {
    card: '**** **** **** 0080',
    isDefault: 'Yes',
    autopay: 'Telematic • Fuel Tax',
  },
]

function EmployeePanel() {
  return (
    <div className="management-view">
      <div className="management-view__header">
        <div>
          <h2>Employees</h2>
          <p>Manage Employee Documentation</p>
        </div>
        <div className="management-view__logo">
          <strong>Pro-Demo Hauling</strong>
          <span>transportation</span>
        </div>
      </div>
      <div className="management-card">
        <div className="management-card__title">👥 Employees</div>
        <div className="management-card__toolbar">
          <div className="management-card__actions">
            <button type="button" aria-label="Export">⤓</button>
            <button type="button" aria-label="Copy">⧉</button>
          </div>
          <label className="management-card__search">
            <span>🔍</span>
            <input type="text" placeholder="Search" />
          </label>
        </div>
        <div className="management-table">
          <div className="management-table__row management-table__row--header">
            <span>Last Name</span>
            <span>First Name</span>
            <span>Phone</span>
            <span>Email</span>
            <span>Date Of Birth</span>
            <span>Date Of Hire</span>
            <span>Job Title</span>
            <span className="management-table__group">Current License</span>
          </div>
          <div className="management-table__row management-table__row--subheader">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span>
              <div className="management-table__license">
                <span>License #</span>
                <span>State</span>
                <span>Class</span>
              </div>
            </span>
          </div>
          <div className="management-table__row management-table__row--filters">
            {Array.from({ length: 7 }).map((_, index) => (
              <span key={`filter-${index}`}>🔍</span>
            ))}
            <span>
              <div className="management-table__license">
                <span>🔍</span>
                <span>🔍</span>
                <span>🔍</span>
              </div>
            </span>
          </div>
          {employeeRows.map((row) => (
            <div key={row.email} className="management-table__row">
              <span>{row.lastName}</span>
              <span>{row.firstName}</span>
              <span>{row.phone}</span>
              <span>{row.email}</span>
              <span>{row.dob}</span>
              <span>{row.hireDate}</span>
              <span>{row.jobTitle}</span>
              <span>
                <div className="management-table__license">
                  <span>{row.licenseNumber}</span>
                  <span>{row.licenseState}</span>
                  <span>{row.licenseClass}</span>
                </div>
              </span>
            </div>
          ))}
        </div>
        <div className="management-card__footer">
          <button className="management-card__primary" type="button">
            ⬇ Download Roster
          </button>
        </div>
      </div>
    </div>
  )
}

function ContactPanel() {
  return (
    <div className="management-view">
      <div className="management-view__header">
        <div>
          <h2>Contact</h2>
          <p>Manage Contact List</p>
        </div>
      </div>
      <div className="management-card">
        <div className="management-card__title">👥 Contact</div>
        <div className="management-card__toolbar">
          <div />
          <label className="management-card__search">
            <span>🔍</span>
            <input type="text" placeholder="Search" />
          </label>
        </div>
        <div className="management-table management-table--contacts">
          <div className="management-table__row management-table__row--header">
            <span>Name</span>
            <span>Email</span>
            <span>Phone</span>
            <span>Fax</span>
            <span>Status</span>
          </div>
          <div className="management-table__row management-table__row--filters">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={`contact-filter-${index}`}>🔍</span>
            ))}
          </div>
          {contactRows.map((row) => (
            <div key={row.email} className="management-table__row">
              <span>{row.name}</span>
              <span>{row.email}</span>
              <span>{row.phone}</span>
              <span>{row.fax}</span>
              <span>{row.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EquipmentPanel() {
  return (
    <div className="management-view">
      <div className="management-view__header">
        <div>
          <h2>Equipment List</h2>
          <p>Manage Equipment List</p>
        </div>
        <div className="management-view__logo">
          <strong>Pro-Demo Hauling</strong>
          <span>transportation</span>
        </div>
      </div>
      <div className="management-card">
        <div className="management-card__title">👥 Equipment</div>
        <div className="management-card__toolbar">
          <div />
          <label className="management-card__search">
            <span>🔍</span>
            <input type="text" placeholder="Search" />
          </label>
        </div>
        <div className="management-table">
          <div className="management-table__row management-table__row--header">
            <span>Unit Number</span>
            <span>Unit Type</span>
            <span>VIN</span>
            <span>Status</span>
          </div>
          <div className="management-table__row management-table__row--filters">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={`equipment-filter-${index}`}>🔍</span>
            ))}
          </div>
          {equipmentRows.length ? (
            equipmentRows.map((row) => (
              <div key={row.vin} className="management-table__row">
                <span>{row.unitNumber}</span>
                <span>{row.unitType}</span>
                <span>{row.vin}</span>
                <span>{row.status}</span>
              </div>
            ))
          ) : (
            <div className="management-table__row management-table__row--empty">
              <span>No data</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PaymentPanel() {
  return (
    <div className="management-view">
      <div className="management-card">
        <div className="management-card__title">💳 Client Payment Methods</div>
        <div className="payment-tabs">
          <button className="payment-tabs__tab payment-tabs__tab--active" type="button">
            Credit Card
          </button>
          <button className="payment-tabs__tab" type="button">
            ACH
          </button>
        </div>
        <div className="management-table management-table--payments">
          <div className="management-table__row management-table__row--header">
            <span>Credit Card</span>
            <span>Is Default</span>
            <span>Auto-Pay</span>
            <span>Actions</span>
          </div>
          {paymentRows.map((row) => (
            <div key={row.card} className="management-table__row">
              <span>{row.card}</span>
              <span>{row.isDefault}</span>
              <span>{row.autopay}</span>
              <span className="payment-actions">
                <span>✅</span>
                <span>🗑️</span>
              </span>
            </div>
          ))}
        </div>
        <div className="management-card__footer payment-footer">
          <button className="management-card__primary" type="button">
            Save Changes
          </button>
          <div className="payment-links">
            <p>
              To Make a Payment with a new <a href="/">Credit Card Account</a>
            </p>
            <p>
              To Make a Payment with a new <a href="/">ACH Account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

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
