import { Filter, Search, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Input,
  CoveragePeriodsFilterOffcanvas,
  CoveragePeriodsTable,
} from '~/index'
import {
  coveragePeriodsFiltersSchema,
  type CoveragePeriodsFiltersForm,
} from '~/utils/schemas/coveragePeriodsSchema'
import { useFiltersStore } from '~/stores/filtersStore'

const CoveragePeriods: React.FC = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)

  const { activeFilters, getDefaultFilter, setActiveFilters, setCurrentStep } =
    useFiltersStore()

  const methods = useForm<CoveragePeriodsFiltersForm>({
    resolver: zodResolver(coveragePeriodsFiltersSchema),
    defaultValues: activeFilters,
  })

  // Apply default filter on mount
  useEffect(() => {
    const defaultFilter = getDefaultFilter()
    if (defaultFilter) {
      setActiveFilters(defaultFilter.filters)
      methods.reset(defaultFilter.filters)
    }
  }, [getDefaultFilter, setActiveFilters, methods])

  // Sync form with active filters
  useEffect(() => {
    methods.reset(activeFilters)
  }, [activeFilters, methods])

  const handleOpenOffcanvas = () => {
    setCurrentStep('filters')
    setIsOffcanvasOpen(true)
  }

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false)
  }

  return (
    <div className="bg-white rounded-md h-full flex flex-col">
      <CoveragePeriodsFilterOffcanvas
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        methods={methods}
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
          <Button variant="outline" onClick={handleOpenOffcanvas}>
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
