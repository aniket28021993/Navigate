import type { FormEvent } from 'react'
import { useState } from 'react'

const paymentRows = [
  {
    method: 'Visa •••• 0080',
    type: 'Credit Card',
    processing: 'Instant',
    availability: '24/7',
  },
  {
    method: 'ACH Transfer',
    type: 'Bank Account',
    processing: '1-2 business days',
    availability: 'Business hours',
  },
]

interface GuestPaymentPageProps {
  onBackToLogin: () => void
}

export function GuestPaymentPage({ onBackToLogin }: GuestPaymentPageProps) {
  const [activeTab, setActiveTab] = useState<'card' | 'ach'>('card')
  const [status, setStatus] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('Guest payment submitted. A receipt will be emailed shortly.')
  }

  return (
    <div className="guest-payment-page">
      <div className="guest-payment-page__content">
        <header className="guest-payment-page__header">
          <div>
            <p className="guest-payment-page__brand">
              Gradient&apos;s <strong>NaviGATE</strong>
            </p>
            <h1>Guest payment</h1>
            <p className="guest-payment-page__subtitle">Make a one-time payment without logging in.</p>
          </div>
          <button className="guest-payment-page__back" type="button" onClick={onBackToLogin}>
            Back to sign in
          </button>
        </header>
        <p className="guest-payment-page__helper">
          Enter invoice details and choose the payment method that works best for you.
        </p>
        <div className="guest-payment">
          <div className="management-card">
            <div className="management-card__title">💳 Available payment methods</div>
            <div className="payment-tabs">
              <button
                className={`payment-tabs__tab${activeTab === 'card' ? ' payment-tabs__tab--active' : ''}`}
                type="button"
                onClick={() => {
                  setActiveTab('card')
                  setStatus('Credit card payments selected.')
                }}
              >
                Credit Card
              </button>
              <button
                className={`payment-tabs__tab${activeTab === 'ach' ? ' payment-tabs__tab--active' : ''}`}
                type="button"
                onClick={() => {
                  setActiveTab('ach')
                  setStatus('ACH payments selected.')
                }}
              >
                ACH
              </button>
            </div>
            {status ? <div className="action-feedback action-feedback--inline">{status}</div> : null}
            <div className="management-table management-table--payments">
              <div className="management-table__row management-table__row--header">
                <span>Payment Method</span>
                <span>Type</span>
                <span>Processing</span>
                <span>Availability</span>
              </div>
              {paymentRows.map((row) => (
                <div key={row.method} className="management-table__row">
                  <span data-label="Payment Method">{row.method}</span>
                  <span data-label="Type">{row.type}</span>
                  <span data-label="Processing">{row.processing}</span>
                  <span data-label="Availability">{row.availability}</span>
                </div>
              ))}
            </div>
            <div className="management-card__footer guest-payment__footer">
              <div className="guest-payment__panel">
                <div className="guest-payment__panel-header">
                  <h3>Make a payment</h3>
                  <p>Provide invoice information and confirm the payment amount.</p>
                </div>
                <form className="guest-payment__form" onSubmit={handleSubmit}>
                  <label className="guest-payment__field">
                    <span>Invoice number</span>
                    <input type="text" name="invoice" placeholder="INV-2048" required />
                  </label>
                  <label className="guest-payment__field">
                    <span>Company name</span>
                    <input type="text" name="company" placeholder="West Canyon Foods" required />
                  </label>
                  <label className="guest-payment__field">
                    <span>Email receipt to</span>
                    <input type="email" name="email" placeholder="billing@company.com" required />
                  </label>
                  <label className="guest-payment__field">
                    <span>Payment amount</span>
                    <input type="number" name="amount" min="1" step="0.01" placeholder="$0.00" required />
                  </label>
                  <label className="guest-payment__field guest-payment__field--full">
                    <span>Payment note</span>
                    <input type="text" name="note" placeholder="Optional reference" />
                  </label>
                  <div className="guest-payment__actions">
                    <button className="management-card__primary" type="submit">
                      Submit payment
                    </button>
                    <p className="guest-payment__note">
                      Selected method: {activeTab === 'card' ? 'Credit card' : 'ACH transfer'}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
