import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from '../../router'
import { employeeRows } from './employeeData'
import { TablePagination } from '../shared/components/TablePagination'

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
  const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [showColumnChooser, setShowColumnChooser] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(employeeColumns.map((column) => column.id)),
  )
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

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
  const gridTemplateColumns = `minmax(56px, 0.35fr) repeat(${visibleColumnList.length}, minmax(140px, 1fr))`
  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize))
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredEmployees.slice(startIndex, startIndex + pageSize)
  }, [currentPage, filteredEmployees, pageSize])

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }))
    setCurrentPage(1)
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

  const handleSelectEmployee = (employeeId: string) => {
    navigate(`/employee/${encodeURIComponent(employeeId)}`)
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
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setCurrentPage(1)
              }}
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
            <span>View</span>
            {visibleColumnList.map((column) => (
              <span key={column.id}>{column.label}</span>
            ))}
          </div>
          <div className="management-table__row management-table__row--filters" style={{ gridTemplateColumns }}>
            <span />
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
          </div>
          {filteredEmployees.length ? (
            paginatedEmployees.map((employee) => (
              <div key={employee.id} className="management-table__row" style={{ gridTemplateColumns }}>
                <span className="management-table__actions">
                  <button type="button" aria-label="View employee profile" onClick={() => handleSelectEmployee(employee.id)}>
                    👁️
                  </button>
                </span>
                {visibleColumnList.map((column) => (
                  <span key={`${employee.id}-${column.id}`} data-label={column.label}>
                    {String((employee as Record<string, string>)[column.id] ?? '')}
                  </span>
                ))}
              </div>
            ))
          ) : (
            <div className="management-table__row management-table__row--empty" style={{ gridTemplateColumns }}>
              <span>No employees match the current filters.</span>
            </div>
          )}
        </div>
        <TablePagination
          currentPage={currentPage}
          totalItems={filteredEmployees.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          itemLabel="employees"
        />
        <div className="management-card__footer">
          <button className="management-card__primary" type="button" onClick={handleDownloadRoster}>
            ⬇ Download Roster
          </button>
        </div>
      </div>
    </div>
  )
}
