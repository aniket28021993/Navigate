import { useEffect, useState } from 'react'
import { TablePagination } from '../shared/components/TablePagination'

const equipmentRows = [
  {
    unitNumber: 'Unit 18',
    unitType: 'Reefer',
    vin: '1HTMMAAL9SH001314',
    status: 'Active',
  },
]

export function EquipmentPanel() {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(equipmentRows.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedRows = equipmentRows.slice(startIndex, startIndex + pageSize)

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
            <input type="text" placeholder="Search" />
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
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={`equipment-filter-${index}`}>🔍</span>
            ))}
          </div>
          {equipmentRows.length ? (
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
          totalItems={equipmentRows.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          itemLabel="equipment entries"
        />
      </div>
    </div>
  )
}
