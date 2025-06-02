import { Copy, Search, Settings } from 'lucide-react'
import { Button, Input, Table, Pagination } from '~/index'
import { mockData, useTable } from '~/utils'

const CoveragePeriods: React.FC = () => {
  const {
    currentPage,
    itemsPerPage,
    searchTerm,
    currentData,
    totalItems,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
  } = useTable({
    data: mockData,
    searchFields: ['organizationName', 'carrier', 'account', 'uuid'],
    initialItemsPerPage: 10,
  })

  return (
    <div className="bg-white px-4 py-8 rounded-md overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coverage Periods</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => {}}>
            <Settings />
          </Button>
          <Button variant="outline" onClick={() => {}}>
            Export CSV
          </Button>
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            icon={<Search size={16} />}
          />
        </div>
      </div>
      <div className="mt-8">
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
                  <div className="flex items-center gap-3 text-ideon-primary-300 font-semibold">
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

export default CoveragePeriods
