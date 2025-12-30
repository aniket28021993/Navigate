import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from '../../router'
import { AppShell } from '../shared/layout/AppShell'
import { getNavigationPath, navigationItems } from '../shared/layout/navigationItems'
import type { NavigationKey } from '../shared/layout/navigationItems'
import { ContactPanel } from '../management/ContactPanel'
import { EmployeePanel } from '../management/EmployeePanel'
import { EquipmentPanel } from '../management/EquipmentPanel'
import { PaymentPanel } from '../management/PaymentPanel'
import { CompanySettingsPanel } from '../settings/CompanySettingsPanel'
import { UserSettingsPanel } from '../settings/UserSettingsPanel'

const summaryCards = [
  { label: 'Active Drivers', value: '24', icon: '👥', tone: 'primary' },
  { label: 'Active Vehicles', value: '18', icon: '🚚', tone: 'success' },
  { label: 'Monthly Revenue', value: '$12.4K', icon: '💲', tone: 'purple' },
  { label: 'Compliance Rate', value: '94%', icon: '⚡', tone: 'warning' },
]

const randomTests = [
  { name: 'Sarah Johnson', type: 'Drug Test', date: 'Nov 28, 2025', status: 'Scheduled' },
  { name: 'Michael Chen', type: 'Drug Test', date: 'Nov 28, 2025', status: 'Scheduled' },
  { name: 'David Martinez', type: 'Drug Test', date: 'Nov 28, 2025', status: 'Scheduled' },
  { name: 'Emily Davis', type: 'Alcohol Test', date: 'Nov 28, 2025', status: 'Completed' },
]

const invoiceStatus = [
  { label: 'Paid', value: 45, tone: 'paid' },
  { label: 'Pending', value: 8, tone: 'pending' },
  { label: 'Overdue', value: 3, tone: 'overdue' },
]

const contactsByRole = [
  { label: 'Accounting DS', value: 24 },
  { label: 'Accounting VS', value: 6 },
  { label: 'Navigate Admin', value: 4 },
  { label: 'Primary Contact DS', value: 5 },
  { label: 'Primary Contact VS', value: 3 },
]

const topEquipment = [
  { name: 'Freightliner Cascadia 2023', type: 'Tractor', status: 'Operational', miles: '45,230 mi' },
  { name: 'Volvo VNL 860 2022', type: 'Tractor', status: 'Operational', miles: '68,450 mi' },
  { name: 'Utility Dry Van 53ft', type: 'Trailer', status: 'In Service', miles: 'N/A' },
  { name: 'Kenworth T680 2023', type: 'Tractor', status: 'Operational', miles: '38,210 mi' },
  { name: 'Great Dane Refrigerated', type: 'Trailer', status: 'Operational', miles: '52,900 mi' },
]

const programParticipants = [
  {
    name: 'David Martinez',
    role: 'Driver',
    program: 'Drug & Alcohol Testing',
    status: 'Active',
  },
  {
    name: 'James Wilson',
    role: 'Driver',
    program: 'Drug & Alcohol Testing',
    status: 'Active',
  },
  {
    name: 'Robert Brown',
    role: 'Driver',
    program: 'Physical Examinations',
    status: 'Pending',
  },
  {
    name: 'Emily Davis',
    role: 'Driver',
    program: 'Physical Examinations',
    status: 'Active',
  },
  {
    name: 'Lisa Anderson',
    role: 'Manager',
    program: 'Safety Training',
    status: 'Active',
  },
  {
    name: 'Jennifer Garcia',
    role: 'Driver',
    program: 'Drug & Alcohol Testing',
    status: 'Active',
  },
]

const quickActions = ['Add a New Driver', 'Request a New Test', 'Add a New Vehicle', 'Pay My Bill']

const servicesManaged = [
  {
    title: 'Business Setup & Maintenance',
    description:
      'Starting and maintaining an FMCSA-compliant business is no small feat — and missing key steps can be costly.',
    bullets: [
      'Business Name Registration and Licensing',
      'Employee Identification Number (EIN)',
      'Operating Authority, USDOT #, and Process Agents',
    ],
    tone: 'default',
  },
  {
    title: 'Permits & Registrations',
    description:
      'Ensure your fleet operates legally across all jurisdictions with proper permits and registrations.',
    bullets: [
      'IRP (International Registration Plan)',
      'IFTA (International Fuel Tax Agreement)',
      'UCR (Unified Carrier Registration)',
      'Operating Authority Renewals',
    ],
    tone: 'default',
  },
  {
    title: 'Drug & Alcohol Program Management',
    description:
      'Stay compliant with DOT drug and alcohol testing requirements with comprehensive program management.',
    bullets: ['Random Testing Program', 'Pre-Employment Screening', 'Post-Accident Testing', 'DOT Compliance Support'],
    tone: 'default',
  },
  {
    title: 'Specimen Collections',
    description:
      'Professional and certified specimen collection services for drug and alcohol testing.',
    bullets: [
      'Certified Collection Sites',
      'Urine Drug Testing',
      'Breath Alcohol Testing',
      'Chain of Custody Procedures',
    ],
    tone: 'default',
  },
  {
    title: 'Physical Examinations',
    description:
      'DOT medical examinations conducted by certified medical examiners to ensure driver qualification.',
    bullets: ['DOT Physical Exams', 'Medical Certificate Issuance', 'CDL Medical Card Processing', 'Vision and Hearing Tests'],
    tone: 'default',
  },
  {
    title: 'Additional Available Services',
    description:
      'Expand your compliance coverage with these additional services. Contact us to learn more about adding these.',
    bullets: [
      'Fuel Tax & Weight Mile Reporting',
      'IRP Credentialing',
      'Electronic Logging Devices (ELD)',
      'FMCSA CDL Clearinghouse Management',
      'Driver Qualification File Management',
    ],
    tone: 'alert',
  },
]

const upcomingActivities = [
  { title: 'DOT Physical Renewal - Driver: Sarah Johnson', due: 'Due in 5 days (Dec 1, 2025)', tone: 'warning' },
  { title: 'Random Drug Test - 3 drivers scheduled', due: 'Scheduled for Nov 28, 2025', tone: 'info' },
  { title: 'IRP Registration Renewal', due: 'Due in 12 days (Dec 3, 2025)', tone: 'danger' },
]

export function DashboardPage() {
  const navigate = useNavigate()
  const { section } = useParams<{ section?: string }>()
  const [activeModule, setActiveModule] = useState<NavigationKey>('dashboard')
  const [feedback, setFeedback] = useState('')
  const validKeys = useMemo(() => new Set(navigationItems.map((item) => item.key)), [])

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
      case 'company-settings':
        return <CompanySettingsPanel />
      case 'user-settings':
        return <UserSettingsPanel />
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
        <div className="dashboard dashboard--compliance">
          <header className="dashboard__title">
            <div>
              <h1>Dashboard</h1>
              <p>Overview of your system.</p>
            </div>
            <div className="dashboard__company-chip">
              <span>Company</span>
              <strong>Pro-Demo Hauling Transportation</strong>
            </div>
          </header>

          <section className="summary-grid">
            {summaryCards.map((item) => (
              <article key={item.label} className={`summary-card summary-card--${item.tone}`}>
                <div>
                  <p>{item.label}</p>
                  <h3>{item.value}</h3>
                </div>
                <div className="summary-card__icon" aria-hidden="true">
                  {item.icon}
                </div>
              </article>
            ))}
          </section>

          <section className="dashboard__grid dashboard__grid--wide">
            <article className="data-card data-card--scroll">
              <header className="data-card__header">
                <div className="data-card__title">
                  <span className="data-card__accent data-card__accent--red" />
                  <div>
                    <h2>Random Test Schedule</h2>
                  </div>
                </div>
              </header>
              <div className="schedule-list">
                {randomTests.map((test) => (
                  <div key={`${test.name}-${test.type}`} className="schedule-item">
                    <div>
                      <p className="schedule-item__name">{test.name}</p>
                      <p className="schedule-item__detail">
                        {test.type} · {test.date}
                      </p>
                    </div>
                    <span
                      className={`schedule-item__status schedule-item__status--${test.status.toLowerCase()}`}
                    >
                      {test.status}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="data-card">
              <header className="data-card__header">
                <div className="data-card__title">
                  <span className="data-card__accent data-card__accent--green" />
                  <div>
                    <h2>Invoice Status</h2>
                  </div>
                </div>
              </header>
              <div className="invoice-status">
                <div className="invoice-status__chart" aria-hidden="true" />
                <div className="invoice-status__legend">
                  {invoiceStatus.map((item) => (
                    <div key={item.label} className="invoice-status__item">
                      <span className={`invoice-status__dot invoice-status__dot--${item.tone}`} />
                      <div>
                        <p>{item.label}</p>
                        <strong>{item.value}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className="dashboard__grid dashboard__grid--wide">
            <article className="data-card">
              <header className="data-card__header">
                <div className="data-card__title">
                  <span className="data-card__accent data-card__accent--blue" />
                  <div>
                    <h2>Contacts by Role</h2>
                  </div>
                </div>
              </header>
              <div className="bar-chart">
                {contactsByRole.map((item) => (
                  <div key={item.label} className="bar-chart__row">
                    <span>{item.label}</span>
                    <div className="bar-chart__bar">
                      <div style={{ width: `${(item.value / 24) * 100}%` }} />
                    </div>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="data-card data-card--scroll">
              <header className="data-card__header">
                <div className="data-card__title">
                  <span className="data-card__accent data-card__accent--purple" />
                  <div>
                    <h2>Top 5 Equipment</h2>
                  </div>
                </div>
              </header>
              <div className="equipment-list">
                {topEquipment.map((item) => (
                  <div key={item.name} className="equipment-item">
                    <div>
                      <p className="equipment-item__name">{item.name}</p>
                      <span className="equipment-item__type">{item.type}</span>
                    </div>
                    <div className="equipment-item__meta">
                      <span
                        className={`equipment-item__status equipment-item__status--${item.status.replace(' ', '').toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                      <span className="equipment-item__miles">{item.miles}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="dashboard__grid dashboard__grid--wide">
            <article className="data-card data-card--scroll">
              <header className="data-card__header">
                <div className="data-card__title">
                  <span className="data-card__accent data-card__accent--purple" />
                  <div>
                    <h2>Program Participants</h2>
                  </div>
                </div>
              </header>
              <div className="participants-grid">
                {programParticipants.map((participant) => (
                  <div key={`${participant.name}-${participant.program}`} className="participant-card">
                    <div>
                      <p className="participant-card__name">{participant.name}</p>
                      <p className="participant-card__detail">
                        {participant.role}
                        <span>{participant.program}</span>
                      </p>
                    </div>
                    <span
                      className={`participant-card__status participant-card__status--${participant.status.toLowerCase()}`}
                    >
                      {participant.status}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="data-card">
            <header className="data-card__header">
              <div className="data-card__title">
                <span className="data-card__accent data-card__accent--green" />
                <div>
                  <h2>Quick Actions</h2>
                </div>
              </div>
            </header>
            <div className="quick-actions">
              {quickActions.map((action) => (
                <button key={action} className="quick-action" type="button" onClick={() => handleFeedback(action)}>
                  {action}
                </button>
              ))}
            </div>
          </section>

          <section className="services">
            <header className="services__header">
              <div>
                <h2>Services Managed</h2>
                <p>Hover over each card to view details.</p>
              </div>
              <button className="services__link" type="button">
                View All →
              </button>
            </header>
            <div className="services__grid">
              {servicesManaged.map((service) => (
                <article key={service.title} className={`service-card service-card--${service.tone}`}>
                  <div className="service-card__head">
                    <div className="service-card__title">
                      <span className="service-card__dot" />
                      <h3>{service.title}</h3>
                    </div>
                    <span className="service-card__chevron">⌃</span>
                  </div>
                  <div className="service-card__details">
                    <p>{service.description}</p>
                    <ul>
                      {service.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="dashboard__grid dashboard__grid--wide">
            <article className="data-card">
              <header className="data-card__header">
                <div className="data-card__title">
                  <span className="data-card__accent data-card__accent--green" />
                  <div>
                    <h2>Billing</h2>
                  </div>
                </div>
              </header>
              <div className="billing-card">
                <div className="billing-card__balance">
                  <span>Balance Due</span>
                  <strong>$785.00</strong>
                </div>
                <div className="billing-card__progress">
                  <div className="billing-card__bar" />
                </div>
                <div className="billing-card__actions">
                  <button type="button" className="billing-card__pay" onClick={() => handleFeedback('Pay My Bill')}>
                    Pay My Bill
                  </button>
                  <button type="button" className="billing-card__secondary">
                    See Invoices
                  </button>
                </div>
              </div>
            </article>

            <article className="data-card">
              <header className="data-card__header">
                <div className="data-card__title">
                  <span className="data-card__accent data-card__accent--orange" />
                  <div>
                    <h2>Upcoming Activities</h2>
                  </div>
                </div>
              </header>
              <div className="activity-cards">
                {upcomingActivities.map((item) => (
                  <div key={item.title} className={`activity-card activity-card--${item.tone}`}>
                    <p>{item.title}</p>
                    <span>{item.due}</span>
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
