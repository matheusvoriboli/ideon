import { Copy, SearchX } from 'lucide-react'
import { useMemo, useEffect } from 'react'
import { Pagination, Table } from '~/components'
import { useFiltersStore } from '~/stores'
import {
  useTable,
  mockData,
  filterCoveragePeriodsData,
  showError,
  showSuccess,
} from '~/utils'

const CoveragePeriodsTable = () => {
  const { activeFilters, searchTerm } = useFiltersStore()

  // Filter data based on activeFilters using the helper function
  const filteredData = useMemo(() => {
    return filterCoveragePeriodsData(mockData, activeFilters)
  }, [activeFilters])

  const {
    currentPage,
    itemsPerPage,
    currentData,
    totalItems,
    totalPages,
    sortColumn,
    sortDirection,
    handlePageChange,
    handleItemsPerPageChange,
    handleSort,
    resetToFirstPage,
  } = useTable({
    data: filteredData,
    searchFields: ['organizationName', 'carrier', 'account', 'uuid'],
    initialItemsPerPage: 10,
    externalSearchTerm: searchTerm,
  })

  // Reset to first page when filters change
  useEffect(() => {
    resetToFirstPage()
  }, [activeFilters, resetToFirstPage])

  const handleCopyUUID = async (uuid: string) => {
    try {
      await navigator.clipboard.writeText(uuid)
      showSuccess('UUID copied to clipboard')
    } catch {
      showError('Failed to copy UUID')
    }
  }

  return (
    <div className="flex flex-col h-full">
      {filteredData.length > 0 ? (
        <>
          <div className="flex-1 overflow-y-auto">
            <Table
              caption="Lista de Coverage Periods com informações de organização, transportadora e configuração de entrega"
              aria-label="Tabela de Coverage Periods"
            >
              <Table.Header>
                <Table.Row isHeader>
                  <Table.Cell
                    isHeader
                    scope="col"
                    sortable
                    sortColumn="uuid"
                    currentSortColumn={sortColumn}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    UUID
                  </Table.Cell>
                  <Table.Cell
                    isHeader
                    scope="col"
                    sortable
                    sortColumn="organizationName"
                    currentSortColumn={sortColumn}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Organization Name
                  </Table.Cell>
                  <Table.Cell
                    isHeader
                    scope="col"
                    sortable
                    sortColumn="carrier"
                    currentSortColumn={sortColumn}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Carrier
                  </Table.Cell>
                  <Table.Cell
                    isHeader
                    scope="col"
                    sortable
                    sortColumn="account"
                    currentSortColumn={sortColumn}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Account
                  </Table.Cell>
                  <Table.Cell
                    isHeader
                    scope="col"
                    sortable
                    sortColumn="deliveryConfiguration"
                    currentSortColumn={sortColumn}
                    currentSortDirection={sortDirection}
                    onSort={handleSort}
                  >
                    Delivery Configuration
                  </Table.Cell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {currentData.map((item, index) => (
                  <Table.Row key={`${item.uuid}-${index}`}>
                    <Table.Cell>
                      <button
                        type="button"
                        className="flex items-center gap-3 text-ideon-primary-300 dark:text-ideon-primary-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-ideon-primary-200 dark:focus:ring-ideon-primary-400 rounded p-1 cursor-pointer"
                        onClick={() => handleCopyUUID(item.uuid)}
                        aria-label={`Copy UUID ${item.uuid}`}
                      >
                        <Copy size={16} aria-hidden="true" />
                        <span>{item.uuid}</span>
                      </button>
                    </Table.Cell>
                    <Table.Cell>{item.organizationName}</Table.Cell>
                    <Table.Cell>{item.carrier}</Table.Cell>
                    <Table.Cell>{item.account}</Table.Cell>
                    <Table.Cell>{item.deliveryConfiguration}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <div className="pt-4 bg-white dark:bg-ideon-dark-100">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </>
      ) : (
        <div
          className="flex-1 flex flex-col items-center gap-2 mt-30 text-ideon-dark dark:text-gray-300"
          role="status"
          aria-live="polite"
        >
          <SearchX
            size={36}
            className="text-gray-400 dark:text-gray-500"
            aria-hidden="true"
          />
          <h2 className="text-xl">No results found</h2>
          <p className="text-gray-400 dark:text-gray-500">
            Adjust your filters and try again
          </p>
        </div>
      )}
    </div>
  )
}

export default CoveragePeriodsTable
