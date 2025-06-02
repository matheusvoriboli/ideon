import { Copy, Search, Settings } from 'lucide-react'
import { useState } from 'react'
import { Button, Input, Table, Pagination } from '~/index'

interface TableData {
  uuid: string
  organizationName: string
  carrier: string
  account: string
  deliveryConfiguration: string
}

const mockData: TableData[] = [
  {
    uuid: 'c12026',
    organizationName: 'Product Release Webinar Compa...',
    carrier: 'SelectHealth',
    account: 'Normal Account',
    deliveryConfiguration: '875420',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group 1',
    carrier: 'Guardian',
    account: 'Normal Account',
    deliveryConfiguration: '12.02.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group 2',
    carrier: 'SelectHealth',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Puma',
    carrier: 'Guardian',
    account: 'Normal Account',
    deliveryConfiguration: '09.03.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group Inc',
    carrier: 'Kaiser Permanente',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Product Release Webinar Compa...',
    carrier: 'SelectHealth',
    account: 'Normal Account',
    deliveryConfiguration: '875420',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group 1',
    carrier: 'Guardian',
    account: 'Normal Account',
    deliveryConfiguration: '12.02.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group 2',
    carrier: 'SelectHealth',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Puma',
    carrier: 'Guardian',
    account: 'Normal Account',
    deliveryConfiguration: '09.03.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group Inc',
    carrier: 'Kaiser Permanente',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group Inc',
    carrier: 'Kaiser Permanente',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group Inc',
    carrier: 'Kaiser Permanente',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group Inc',
    carrier: 'Kaiser Permanente',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group Inc',
    carrier: 'Kaiser Permanente',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group Inc',
    carrier: 'Kaiser Permanente',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group Inc',
    carrier: 'Kaiser Permanente',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
  },
  {
    uuid: 'c12026',
    organizationName: 'Demo Group Inc',
    carrier: 'Kaiser Permanente',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
  },
]

const CoveragePeriods: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar dados baseado na pesquisa
  const filteredData = mockData.filter(
    item =>
      item.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uuid.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calcular paginação
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  // Handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
  }

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

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>
    </div>
  )
}

export default CoveragePeriods
