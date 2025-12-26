import { useEffect, useMemo, useState } from 'react'
import { TablePagination } from '../shared/components/TablePagination'

const contactColumns = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'fax', label: 'Fax' },
  { id: 'status', label: 'Status' },
] as const

const columnLabels = contactColumns.reduce<Record<string, string>>((acc, column) => {
  acc[column.id] = column.label
  return acc
}, {})

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
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6
  const filteredContacts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    return contactRows.filter((contact) => {
      if (normalizedSearch) {
        const values = Object.values(contact).map((value) => String(value).toLowerCase())
        if (!values.some((value) => value.includes(normalizedSearch))) {
          return false
        }
      }

      return Object.entries(filters).every(([key, value]) => {
        if (!value) {
          return true
        }
        const contactValue = String((contact as Record<string, string>)[key] ?? '').toLowerCase()
        return contactValue.includes(value.toLowerCase())
      })
    })
  }, [filters, searchTerm])
  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / pageSize))
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredContacts.slice(startIndex, startIndex + pageSize)
  }, [currentPage, filteredContacts, pageSize])
  const gridTemplateColumns = `repeat(${contactColumns.length}, minmax(140px, 1fr))`

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }))
    setCurrentPage(1)
  }

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
        <div className="management-view__logo">
          <strong>Pro-Demo Hauling</strong>
          <span>transportation</span>
        </div>
      </div>
      <div className="management-card">
        <div className="management-card__title">👥 Contact</div>
        <div className="management-card__toolbar">
          <div className="management-card__actions" />
          <label className="management-card__search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search contacts"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setCurrentPage(1)
              }}
            />
          </label>
        </div>
        <div className="management-table">
          <div className="management-table__row management-table__row--header" style={{ gridTemplateColumns }}>
            {contactColumns.map((column) => (
              <span key={column.id}>{column.label}</span>
            ))}
          </div>
          <div className="management-table__row management-table__row--filters" style={{ gridTemplateColumns }}>
            {contactColumns.map((column) => (
              <span key={`contact-filter-${column.id}`}>
                <input
                  type="text"
                  value={filters[column.id] ?? ''}
                  onChange={(event) => handleFilterChange(column.id, event.target.value)}
                  placeholder={`Filter ${columnLabels[column.id]}`}
                />
              </span>
            ))}
          </div>
          {filteredContacts.length ? (
            paginatedRows.map((row) => (
              <div key={row.email} className="management-table__row" style={{ gridTemplateColumns }}>
                <span data-label="Name">{row.name}</span>
                <span data-label="Email">{row.email}</span>
                <span data-label="Phone">{row.phone}</span>
                <span data-label="Fax">{row.fax}</span>
                <span data-label="Status">{row.status}</span>
              </div>
            ))
          ) : (
            <div className="management-table__row management-table__row--empty" style={{ gridTemplateColumns }}>
              <span>No contacts match the current filters.</span>
            </div>
          )}
        </div>
        <TablePagination
          currentPage={currentPage}
          totalItems={filteredContacts.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          itemLabel="contacts"
        />
      </div>
    </div>
  )
}
