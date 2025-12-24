const equipmentRows = [
  {
    unitNumber: 'Unit 18',
    unitType: 'Reefer',
    vin: '1HTMMAAL9SH001314',
    status: 'Active',
  },
]

export function EquipmentPanel() {
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
            equipmentRows.map((row) => (
              <div key={row.vin} className="management-table__row">
                <span>{row.unitNumber}</span>
                <span>{row.unitType}</span>
                <span>{row.vin}</span>
                <span>{row.status}</span>
              </div>
            ))
          ) : (
            <div className="management-table__row management-table__row--empty">
              <span>No data</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
