import { useEffect, useState } from 'react'
import { TablePagination } from '../shared/components/TablePagination'

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
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(contactRows.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedRows = contactRows.slice(startIndex, startIndex + pageSize)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

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
          {paginatedRows.map((row) => (
            <div key={row.email} className="management-table__row">
              <span data-label="Name">{row.name}</span>
              <span data-label="Email">{row.email}</span>
              <span data-label="Phone">{row.phone}</span>
              <span data-label="Fax">{row.fax}</span>
              <span data-label="Status">{row.status}</span>
            </div>
          ))}
        </div>
        <TablePagination
          currentPage={currentPage}
          totalItems={contactRows.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          itemLabel="contacts"
        />
      </div>
    </div>
  )
}
