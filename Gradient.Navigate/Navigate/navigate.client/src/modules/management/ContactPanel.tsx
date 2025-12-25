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

export function ContactPanel() {
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
              <span data-label="Name">{row.name}</span>
              <span data-label="Email">{row.email}</span>
              <span data-label="Phone">{row.phone}</span>
              <span data-label="Fax">{row.fax}</span>
              <span data-label="Status">{row.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
