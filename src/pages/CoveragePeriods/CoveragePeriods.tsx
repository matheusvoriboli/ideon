import { Search, Settings } from 'lucide-react'
import { Button, Input } from '~/index'

const CoveragePeriods: React.FC = () => {
  return (
    <div className="bg-white px-4 py-8 rounded-md">
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
            value=""
            onChange={() => {}}
            placeholder="Search"
            icon={<Search size={16} />}
          />
        </div>
      </div>
    </div>
  )
}

export default CoveragePeriods
