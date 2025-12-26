import { useEffect, useMemo, useState } from 'react'
import { TablePagination } from '../shared/components/TablePagination'

const equipmentColumns = [
  { id: 'unitNumber', label: 'Unit Number' },
  { id: 'unitType', label: 'Unit Type' },
  { id: 'vin', label: 'VIN' },
  { id: 'status', label: 'Status' },
] as const

const equipmentRows = [
  {
    unitNumber: 'Unit 18',
    unitType: 'Reefer',
    vin: '1HTMMAAL9SH001314',
    status: 'Active',
  },
  {
    unitNumber: 'Unit 07',
    unitType: 'Dry Van',
    vin: '3HSDZAPR5KN203982',
    status: 'Active',
  },
  {
    unitNumber: 'Unit 21',
    unitType: 'Flatbed',
    vin: '1XP5DB9X9YD512304',
    status: 'Maintenance',
  },
  {
    unitNumber: 'Unit 33',
    unitType: 'Tanker',
    vin: '2HSCUAPR7CN276451',
    status: 'Active',
  },
  {
    unitNumber: 'Unit 12',
    unitType: 'Reefer',
    vin: '1FTWW3B59PEC10457',
    status: 'Inactive',
  },
  {
    unitNumber: 'Unit 42',
    unitType: 'Dry Van',
    vin: '1XKADP9X6KJ237901',
    status: 'Active',
  },
  {
    unitNumber: 'Unit 25',
    unitType: 'Flatbed',
    vin: '1FUJGHDV6GLHZ4832',
    status: 'Inspection',
  },
  {
    unitNumber: 'Unit 15',
    unitType: 'Reefer',
    vin: '1HTMMAAL7SH009114',
    status: 'Active',
  },
  {
    unitNumber: 'Unit 30',
    unitType: 'Tanker',
    vin: '2HSCUAPR4CN281110',
    status: 'Inactive',
  },
  {
    unitNumber: 'Unit 04',
    unitType: 'Dry Van',
    vin: '3HSDZAPR7KN209115',
    status: 'Active',
  },
]

export function EquipmentPanel() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const pageSize = 6

  const filteredRows = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    return equipmentRows.filter((row) => {
      if (normalizedSearch) {
        const values = Object.values(row).map((value) => String(value).toLowerCase())
        if (!values.some((value) => value.includes(normalizedSearch))) {
          return false
        }
      }

      return Object.entries(filters).every(([key, value]) => {
        if (!value) {
          return true
        }
        const rowValue = String((row as Record<string, string>)[key] ?? '').toLowerCase()
        return rowValue.includes(value.toLowerCase())
      })
    })
  }, [filters, searchTerm])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredRows.slice(startIndex, startIndex + pageSize)
  }, [currentPage, filteredRows, pageSize])

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
          <h2>Equipment List</h2>
          <p>Manage Equipment List</p>
        </div>
        <div className="management-view__logo">
          <strong>Pro-Demo Hauling</strong>
          <span>transportation</span>
        </div>
      </div>
      <div className="management-card">
        <div className="management-card__title">👥 Equipment</div>
        <div className="management-card__toolbar">
          <div />
          <label className="management-card__search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search equipment"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setCurrentPage(1)
              }}
            />
          </label>
        </div>
        <div className="management-table">
          <div className="management-table__row management-table__row--header">
            <span>Unit Number</span>
            <span>Unit Type</span>
            <span>VIN</span>
            <span>Status</span>
          </div>
          <div className="management-table__row management-table__row--filters">
            {equipmentColumns.map((column) => (
              <span key={`equipment-filter-${column.id}`}>
                <input
                  type="text"
                  value={filters[column.id] ?? ''}
                  onChange={(event) => handleFilterChange(column.id, event.target.value)}
                  placeholder={`Filter ${column.label}`}
                />
              </span>
            ))}
          </div>
          {filteredRows.length ? (
            paginatedRows.map((row) => (
              <div key={row.vin} className="management-table__row">
                <span data-label="Unit Number">{row.unitNumber}</span>
                <span data-label="Unit Type">{row.unitType}</span>
                <span data-label="VIN">{row.vin}</span>
                <span data-label="Status">{row.status}</span>
              </div>
            ))
          ) : (
            <div className="management-table__row management-table__row--empty">
              <span>No data</span>
            </div>
          )}
        </div>
        <TablePagination
          currentPage={currentPage}
          totalItems={filteredRows.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          itemLabel="equipment entries"
        />
      </div>
    </div>
  )
}
