import { useEffect, useState } from 'react'
import { TablePagination } from '../shared/components/TablePagination'

type PaymentMethod = {
  id: string
  type: 'Credit Card' | 'ACH'
  account: string
  isDefault: boolean
  autoPayEnabled: boolean
}

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: 'card-0080',
    type: 'Credit Card',
    account: '**** **** **** 0080',
    isDefault: true,
    autoPayEnabled: true,
  },
  {
    id: 'card-1144',
    type: 'Credit Card',
    account: '**** **** **** 1144',
    isDefault: false,
    autoPayEnabled: false,
  },
  {
    id: 'ach-7391',
    type: 'ACH',
    account: '**** **** **** 7391',
    isDefault: false,
    autoPayEnabled: true,
  },
  {
    id: 'ach-2205',
    type: 'ACH',
    account: '**** **** **** 2205',
    isDefault: false,
    autoPayEnabled: false,
  },
]

export function PaymentPanel() {
  const [status, setStatus] = useState('')
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(paymentMethods.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedRows = paymentMethods.slice(startIndex, startIndex + pageSize)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const handleAutoPayToggle = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) =>
        method.id === id ? { ...method, autoPayEnabled: !method.autoPayEnabled } : method
      )
    )
    setStatus('Auto-pay configuration updated.')
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({ ...method, isDefault: method.id === id }))
    )
    setStatus('Default payment method updated.')
  }

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
    setStatus('Payment method removed from demo list.')
  }

  return (
    <div className="management-view">
      <div className="management-card">
        <div className="management-card__title">💳 Client Payment Methods</div>
        {status ? <div className="action-feedback action-feedback--inline">{status}</div> : null}
        <div className="management-table management-table--payments">
          <div className="management-table__row management-table__row--header">
            <span>Type</span>
            <span>Account</span>
            <span>Default</span>
            <span>Auto-Pay</span>
            <span>Actions</span>
          </div>
          {paginatedRows.map((row) => (
            <div key={row.id} className="management-table__row">
              <span data-label="Type">{row.type}</span>
              <span data-label="Account">{row.account}</span>
              <span data-label="Default">{row.isDefault ? '✔' : '—'}</span>
              <span data-label="Auto-Pay">
                <button
                  type="button"
                  className="payment-action"
                  aria-pressed={row.autoPayEnabled}
                  onClick={() => handleAutoPayToggle(row.id)}
                >
                  {row.autoPayEnabled ? 'Enabled' : 'Enable'}
                </button>
              </span>
              <span data-label="Actions" className="payment-actions">
                <button
                  type="button"
                  className="payment-action"
                  onClick={() => handleSetDefault(row.id)}
                  disabled={row.isDefault}
                >
                  Set default
                </button>
                <button
                  type="button"
                  className="payment-action"
                  onClick={() => handleDeleteMethod(row.id)}
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
        <TablePagination
          currentPage={currentPage}
          totalItems={paymentMethods.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          itemLabel="payment methods"
        />
        <div className="management-card__footer payment-footer">
          <div className="payment-actions">
            <button
              className="management-card__primary"
              type="button"
              onClick={() => setStatus('Credit card account form opened.')}
            >
              Add Credit Card Account
            </button>
            <button
              className="management-card__primary"
              type="button"
              onClick={() => setStatus('ACH account form opened.')}
            >
              Add ACH Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
