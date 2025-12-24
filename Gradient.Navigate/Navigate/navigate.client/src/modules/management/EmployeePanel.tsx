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

export function EmployeePanel() {
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
            <button type="button" aria-label="Export">
              ⤓
            </button>
            <button type="button" aria-label="Copy">
              ⧉
            </button>
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
