import { Filter, Search, Settings } from 'lucide-react'
import { useState } from 'react'
import {
  Button,
  Input,
  CoveragePeriodsFilterOffcanvas,
  CoveragePeriodsTable,
} from '~/index'

const CoveragePeriods: React.FC = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)

  return (
    <div className="bg-white rounded-md h-full flex flex-col">
      <CoveragePeriodsFilterOffcanvas
        isOpen={isOffcanvasOpen}
        onClose={() => setIsOffcanvasOpen(false)}
      />

      <div className="p-4 pt-6 border-b border-gray-300">
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
              value={''}
              onChange={() => {}}
              placeholder="Search"
              icon={<Search size={16} />}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsOffcanvasOpen(true)}>
            <Filter size={16} />
            Filter
          </Button>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 overflow-hidden">
        <CoveragePeriodsTable />
      </div>
    </div>
  )
}

export default CoveragePeriods
