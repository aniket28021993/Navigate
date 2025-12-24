const paymentRows = [
  {
    card: '**** **** **** 0080',
    isDefault: 'Yes',
    autopay: 'Telematic • Fuel Tax',
  },
]

export function PaymentPanel() {
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
