import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, Dropdown } from '~/index'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange?: (itemsPerPage: number) => void
  showItemsPerPage?: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = totalPages > 1 ? getVisiblePages() : [1]

  return (
    <nav
      className="flex items-center justify-end gap-4 px-4 py-3 bg-white border-ideon-primary-500"
      aria-label="Pagination navigation"
    >
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400" role="status" aria-live="polite">
          Showing {startItem} to {endItem} of {totalItems} results
        </div>

        {showItemsPerPage && onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm">Show:</span>
            <Dropdown
              value={itemsPerPage}
              options={[
                { value: 10, label: '10' },
                { value: 25, label: '25' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]}
              onChange={value => onItemsPerPageChange(Number(value))}
              className="min-w-[80px]"
              multiple={false}
              searchable={false}
              aria-label="Items per page"
            />
          </div>
        )}
      </div>

      <div
        className="flex items-center gap-2"
        role="group"
        aria-label="Pagination controls"
      >
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          variant="outline"
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Previous
        </Button>

        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Pages"
        >
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-1" aria-hidden="true">
                  ...
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onPageChange(page as number)}
                  className={`px-2 py-1 text-sm rounded transition-colors cursor-pointer ${
                    currentPage === page
                      ? 'text-ideon-primary-300 font-bold underline'
                      : 'text-gray-700'
                  }`}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
          <ChevronRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </nav>
  )
}

export default Pagination
