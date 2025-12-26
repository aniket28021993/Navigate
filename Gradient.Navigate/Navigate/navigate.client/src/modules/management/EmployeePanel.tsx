import { useMemo, useState } from 'react'

type Employee = {
  id: string
  lastName: string
  firstName: string
  phone: string
  email: string
  dob: string
  hireDate: string
  jobTitle: string
  licenseNumber: string
  licenseState: string
  licenseClass: string
  documents: Array<{ name: string; type: string; uploaded: string }>
  emergencyContact: {
    name: string
    relationship: string
    phone: string
    email: string
  }
}

const employeeRows: Employee[] = [
  {
    id: 'emp-001',
    lastName: 'Driver',
    firstName: 'New',
    phone: '(480) 555-0112',
    email: 'newdriver@prodemo.com',
    dob: '1/1/1990',
    hireDate: '7/31/2025',
    jobTitle: 'Commercial Driver',
    licenseNumber: '008012',
    licenseState: 'AZ',
    licenseClass: 'A',
    documents: [
      { name: 'CDL License', type: 'PDF', uploaded: '7/20/2025' },
      { name: 'Medical Card', type: 'PDF', uploaded: '7/21/2025' },
    ],
    emergencyContact: {
      name: 'Jamie Driver',
      relationship: 'Spouse',
      phone: '(480) 555-0144',
      email: 'jamie.driver@prodemo.com',
    },
  },
  {
    id: 'emp-002',
    lastName: 'Ortiz',
    firstName: 'Carla',
    phone: '(602) 555-0199',
    email: 'cortiz@prodemo.com',
    dob: '4/18/1987',
    hireDate: '3/14/2023',
    jobTitle: 'Dispatcher',
    licenseNumber: 'AZ-11042',
    licenseState: 'AZ',
    licenseClass: 'D',
    documents: [
      { name: 'Signed Handbook', type: 'PDF', uploaded: '3/16/2023' },
      { name: 'W-4', type: 'PDF', uploaded: '3/15/2023' },
    ],
    emergencyContact: {
      name: 'Luis Ortiz',
      relationship: 'Brother',
      phone: '(602) 555-0188',
      email: 'lortiz@prodemo.com',
    },
  },
  {
    id: 'emp-003',
    lastName: 'Patel',
    firstName: 'Meera',
    phone: '(623) 555-0123',
    email: 'mpatel@prodemo.com',
    dob: '9/12/1992',
    hireDate: '11/2/2022',
    jobTitle: 'Safety Coordinator',
    licenseNumber: 'CA-55201',
    licenseState: 'CA',
    licenseClass: 'C',
    documents: [
      { name: 'Certification', type: 'PDF', uploaded: '11/1/2022' },
      { name: 'Training Log', type: 'PDF', uploaded: '11/5/2022' },
    ],
    emergencyContact: {
      name: 'Ravi Patel',
      relationship: 'Father',
      phone: '(623) 555-0145',
      email: 'rpatel@prodemo.com',
    },
  },
]

const employeeColumns = [
  { id: 'lastName', label: 'Last Name' },
  { id: 'firstName', label: 'First Name' },
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
  { id: 'jobTitle', label: 'Job Title' },
  { id: 'hireDate', label: 'Date Of Hire' },
  { id: 'dob', label: 'Date Of Birth' },
  { id: 'licenseNumber', label: 'License #' },
  { id: 'licenseState', label: 'License State' },
  { id: 'licenseClass', label: 'License Class' },
] as const

const columnLabels = employeeColumns.reduce<Record<string, string>>((acc, column) => {
  acc[column.id] = column.label
  return acc
}, {})

export function EmployeePanel() {
  const [status, setStatus] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [showColumnChooser, setShowColumnChooser] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(employeeColumns.map((column) => column.id)),
  )
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [activeTab, setActiveTab] = useState<'general' | 'documents' | 'emergency'>('general')

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    return employeeRows.filter((employee) => {
      if (normalizedSearch) {
        const values = Object.entries(employee)
          .filter(([key]) => key !== 'documents' && key !== 'emergencyContact' && key !== 'id')
          .map(([, value]) => String(value).toLowerCase())
        if (!values.some((value) => value.includes(normalizedSearch))) {
          return false
        }
      }

      return Object.entries(filters).every(([key, value]) => {
        if (!value) {
          return true
        }
        const employeeValue = String((employee as Record<string, string>)[key] ?? '').toLowerCase()
        return employeeValue.includes(value.toLowerCase())
      })
    })
  }, [filters, searchTerm])

  const visibleColumnList = employeeColumns.filter((column) => visibleColumns.has(column.id))
  const gridTemplateColumns = `repeat(${visibleColumnList.length}, minmax(140px, 1fr)) minmax(120px, 0.6fr)`

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }))
  }

  const toggleColumnVisibility = (columnId: string) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev)
      if (next.has(columnId)) {
        next.delete(columnId)
      } else {
        next.add(columnId)
      }
      return next
    })
  }

  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleExportAll = () => {
    const headers = employeeColumns.map((column) => column.label).join(',')
    const rows = employeeRows
      .map((employee) =>
        employeeColumns
          .map((column) => `"${String((employee as Record<string, string>)[column.id] ?? '')}"`)
          .join(','),
      )
      .join('\n')
    downloadFile('employees.xlsx', `${headers}\n${rows}`, 'application/vnd.ms-excel')
    setStatus('Employee list exported to Excel.')
  }

  const handleDownloadRoster = () => {
    const roster = employeeRows
      .map((employee) => `${employee.firstName} ${employee.lastName} - ${employee.jobTitle}`)
      .join('\n')
    downloadFile('employee-roster.txt', roster, 'text/plain')
    setStatus('Roster download prepared.')
  }

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setActiveTab('general')
  }

  const handleDownloadDocuments = () => {
    if (!selectedEmployee) {
      return
    }
    const documentList = selectedEmployee.documents
      .map((doc) => `${doc.name} (${doc.type}) - ${doc.uploaded}`)
      .join('\n')
    downloadFile(`${selectedEmployee.lastName}-documents.txt`, documentList, 'text/plain')
    setStatus(`Downloaded all documents for ${selectedEmployee.firstName} ${selectedEmployee.lastName}.`)
  }

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
            <button type="button" aria-label="Export" onClick={handleExportAll}>
              ⤓
            </button>
            <button type="button" aria-label="Columns" onClick={() => setShowColumnChooser((prev) => !prev)}>
              ☰
            </button>
            <button type="button" aria-label="Copy" onClick={() => setStatus('Employee roster copied to clipboard.')}>
              ⧉
            </button>
          </div>
          <label className="management-card__search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search employees"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>
        {showColumnChooser ? (
          <div className="management-card__columns">
            <div className="management-card__columns-title">Column chooser</div>
            <div className="management-card__columns-grid">
              {employeeColumns.map((column) => (
                <label key={column.id} className="management-card__columns-option">
                  <input
                    type="checkbox"
                    checked={visibleColumns.has(column.id)}
                    onChange={() => toggleColumnVisibility(column.id)}
                  />
                  <span>{column.label}</span>
                </label>
              ))}
            </div>
          </div>
        ) : null}
        {status ? <div className="action-feedback action-feedback--inline">{status}</div> : null}
        <div className="management-table">
          <div className="management-table__row management-table__row--header" style={{ gridTemplateColumns }}>
            {visibleColumnList.map((column) => (
              <span key={column.id}>{column.label}</span>
            ))}
            <span>Actions</span>
          </div>
          <div className="management-table__row management-table__row--filters" style={{ gridTemplateColumns }}>
            {visibleColumnList.map((column) => (
              <span key={`filter-${column.id}`}>
                <input
                  type="text"
                  value={filters[column.id] ?? ''}
                  onChange={(event) => handleFilterChange(column.id, event.target.value)}
                  placeholder={`Filter ${columnLabels[column.id]}`}
                />
              </span>
            ))}
            <span />
          </div>
          {filteredEmployees.length ? (
            filteredEmployees.map((employee) => (
              <div key={employee.id} className="management-table__row" style={{ gridTemplateColumns }}>
                {visibleColumnList.map((column) => (
                  <span key={`${employee.id}-${column.id}`} data-label={column.label}>
                    {String((employee as Record<string, string>)[column.id] ?? '')}
                  </span>
                ))}
                <span className="management-table__actions">
                  <button type="button" onClick={() => handleSelectEmployee(employee)}>
                    View
                  </button>
                </span>
              </div>
            ))
          ) : (
            <div className="management-table__row management-table__row--empty" style={{ gridTemplateColumns }}>
              <span>No employees match the current filters.</span>
            </div>
          )}
        </div>
        <div className="management-card__footer">
          <button className="management-card__primary" type="button" onClick={handleDownloadRoster}>
            ⬇ Download Roster
          </button>
        </div>
      </div>
      {selectedEmployee ? (
        <div className="management-card management-card--details">
          <div className="management-card__title">
            👤 Employee Profile · {selectedEmployee.firstName} {selectedEmployee.lastName}
          </div>
          <div className="employee-tabs">
            <button
              type="button"
              className={`employee-tabs__tab ${activeTab === 'general' ? 'employee-tabs__tab--active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button
              type="button"
              className={`employee-tabs__tab ${activeTab === 'documents' ? 'employee-tabs__tab--active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
            <button
              type="button"
              className={`employee-tabs__tab ${activeTab === 'emergency' ? 'employee-tabs__tab--active' : ''}`}
              onClick={() => setActiveTab('emergency')}
            >
              Emergency Contact
            </button>
          </div>
          <div className="employee-details">
            {activeTab === 'general' ? (
              <div className="employee-details__grid">
                <div>
                  <span className="employee-details__label">Name</span>
                  <span>
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </span>
                </div>
                <div>
                  <span className="employee-details__label">Job Title</span>
                  <span>{selectedEmployee.jobTitle}</span>
                </div>
                <div>
                  <span className="employee-details__label">Hire Date</span>
                  <span>{selectedEmployee.hireDate}</span>
                </div>
                <div>
                  <span className="employee-details__label">Date Of Birth</span>
                  <span>{selectedEmployee.dob}</span>
                </div>
                <div>
                  <span className="employee-details__label">Phone</span>
                  <span>{selectedEmployee.phone}</span>
                </div>
                <div>
                  <span className="employee-details__label">Email</span>
                  <span>{selectedEmployee.email}</span>
                </div>
                <div>
                  <span className="employee-details__label">License Number</span>
                  <span>{selectedEmployee.licenseNumber}</span>
                </div>
                <div>
                  <span className="employee-details__label">License State</span>
                  <span>{selectedEmployee.licenseState}</span>
                </div>
                <div>
                  <span className="employee-details__label">License Class</span>
                  <span>{selectedEmployee.licenseClass}</span>
                </div>
              </div>
            ) : null}
            {activeTab === 'documents' ? (
              <div className="employee-details__documents">
                <div className="employee-details__documents-header">
                  <div>
                    <strong>Documents</strong>
                    <p>Download all employee files in one click.</p>
                  </div>
                  <button type="button" onClick={handleDownloadDocuments}>
                    ⬇ Download all
                  </button>
                </div>
                <div className="employee-details__documents-list">
                  {selectedEmployee.documents.map((doc) => (
                    <div key={doc.name} className="employee-details__document">
                      <div>
                        <strong>{doc.name}</strong>
                        <span>
                          {doc.type} · Uploaded {doc.uploaded}
                        </span>
                      </div>
                      <button type="button" onClick={() => setStatus(`Downloaded ${doc.name}.`)}>
                        ⤓
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {activeTab === 'emergency' ? (
              <div className="employee-details__grid">
                <div>
                  <span className="employee-details__label">Name</span>
                  <span>{selectedEmployee.emergencyContact.name}</span>
                </div>
                <div>
                  <span className="employee-details__label">Relationship</span>
                  <span>{selectedEmployee.emergencyContact.relationship}</span>
                </div>
                <div>
                  <span className="employee-details__label">Phone</span>
                  <span>{selectedEmployee.emergencyContact.phone}</span>
                </div>
                <div>
                  <span className="employee-details__label">Email</span>
                  <span>{selectedEmployee.emergencyContact.email}</span>
                </div>
              </div>
            ) : null}
          </div>
          <div className="management-card__footer">
            <button className="management-card__primary" type="button" onClick={() => setSelectedEmployee(null)}>
              Back to list
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
