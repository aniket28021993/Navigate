import { useEffect, useState } from 'react'
import { TablePagination } from '../shared/components/TablePagination'

const paymentRows = [
  {
    card: '**** **** **** 0080',
    isDefault: 'Yes',
    autopay: 'Telematic • Fuel Tax',
  },
]

export function PaymentPanel() {
  const [activeTab, setActiveTab] = useState<'card' | 'ach'>('card')
  const [status, setStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(paymentRows.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedRows = paymentRows.slice(startIndex, startIndex + pageSize)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  return (
    <div className="management-view">
      <div className="management-card">
        <div className="management-card__title">💳 Client Payment Methods</div>
        <div className="payment-tabs">
          <button
          className={`payment-tabs__tab${activeTab === 'card' ? ' payment-tabs__tab--active' : ''}`}
          type="button"
          onClick={() => {
            setActiveTab('card')
            setStatus('Showing credit card methods.')
            setCurrentPage(1)
          }}
          >
            Credit Card
          </button>
          <button
            className={`payment-tabs__tab${activeTab === 'ach' ? ' payment-tabs__tab--active' : ''}`}
            type="button"
            onClick={() => {
              setActiveTab('ach')
              setStatus('Showing ACH instructions.')
              setCurrentPage(1)
            }}
          >
            ACH
          </button>
        </div>
        {status ? <div className="action-feedback action-feedback--inline">{status}</div> : null}
        <div className="management-table management-table--payments">
          <div className="management-table__row management-table__row--header">
            <span>Credit Card</span>
            <span>Is Default</span>
            <span>Auto-Pay</span>
            <span>Actions</span>
          </div>
          {paginatedRows.map((row) => (
            <div key={row.card} className="management-table__row">
              <span data-label="Credit Card">{row.card}</span>
              <span data-label="Is Default">{row.isDefault}</span>
              <span data-label="Auto-Pay">{row.autopay}</span>
              <span data-label="Actions" className="payment-actions">
                <button
                  type="button"
                  className="payment-action"
                  onClick={() => setStatus('Default payment method updated.')}
                >
                  ✅
                </button>
                <button
                  type="button"
                  className="payment-action"
                  onClick={() => setStatus('Payment method removed from demo list.')}
                >
                  🗑️
                </button>
              </span>
            </div>
          ))}
        </div>
        <TablePagination
          currentPage={currentPage}
          totalItems={paymentRows.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          itemLabel="payment methods"
        />
        <div className="management-card__footer payment-footer">
          <button className="management-card__primary" type="button" onClick={() => setStatus('Payment changes saved.')}>
            Save Changes
          </button>
          <div className="payment-links">
            <p>
              To Make a Payment with a new{' '}
              <a
                href="#credit-card-enrollment"
                onClick={(event) => {
                  event.preventDefault()
                  setStatus('Credit card enrollment link opened.')
                }}
              >
                Credit Card Account
              </a>
            </p>
            <p>
              To Make a Payment with a new{' '}
              <a
                href="#ach-enrollment"
                onClick={(event) => {
                  event.preventDefault()
                  setStatus('ACH enrollment link opened.')
                }}
              >
                ACH Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
