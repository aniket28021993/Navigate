interface TablePaginationProps {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  itemLabel?: string
}

export function TablePagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = 'items',
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  const handlePageChange = (nextPage: number) => {
    const clampedPage = Math.min(Math.max(nextPage, 1), totalPages)
    onPageChange(clampedPage)
  }

  return (
    <div className="table-pagination">
      <span className="table-pagination__summary">
        Showing {startItem}-{endItem} of {totalItems} {itemLabel}
      </span>
      <div className="table-pagination__controls">
        <button type="button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="table-pagination__page">
          Page {currentPage} of {totalPages}
        </span>
        <button type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
