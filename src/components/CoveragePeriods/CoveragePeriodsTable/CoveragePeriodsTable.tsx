import { Copy } from 'lucide-react'
import { Pagination, Table } from '~/components'
import { useTable } from '~/utils'
import { mockData } from '~/utils'

const CoveragePeriodsTable = () => {
  const {
    currentPage,
    itemsPerPage,
    currentData,
    totalItems,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
  } = useTable({
    data: mockData,
    searchFields: ['organizationName', 'carrier', 'account', 'uuid'],
    initialItemsPerPage: 10,
  })

  return (
    <div className="flex flex-col h-full">
      {/* Table section - scrollable */}
      <div className="flex-1 overflow-y-auto">
        <Table>
          <Table.Header>
            <Table.Row isHeader>
              <Table.Cell isHeader>UUID</Table.Cell>
              <Table.Cell isHeader>Organization Name</Table.Cell>
              <Table.Cell isHeader>Carrier</Table.Cell>
              <Table.Cell isHeader>Account</Table.Cell>
              <Table.Cell isHeader>Delivery Configuration</Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {currentData.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <div
                    className="flex items-center gap-3 text-ideon-primary-300 font-semibold cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(item.uuid)
                    }}
                  >
                    <Copy size={16} />
                    {item.uuid}
                  </div>
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

      {/* Pagination section - fixed */}
      <div className="pt-4 border-t border-gray-200 bg-white">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  )
}

export default CoveragePeriodsTable
