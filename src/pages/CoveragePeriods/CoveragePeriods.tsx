import { Filter, Search, Settings } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Input,
  CoveragePeriodsFilterOffcanvas,
  CoveragePeriodsTable,
  CoveragePeriodsActiveTags,
} from '~/index'
import {
  coveragePeriodsFiltersSchema,
  type CoveragePeriodsFiltersForm,
  defaultCoveragePeriodsFilters,
} from '~/utils/schemas/coveragePeriodsSchema'
import { useFiltersStore } from '~/stores/filtersStore'

const CoveragePeriods: React.FC = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
  const isInitialMount = useRef(true)

  const {
    activeFilters,
    setCurrentStep,
    removeSpecificFilter,
    resetActiveFilters,
  } = useFiltersStore()

  const methods = useForm<CoveragePeriodsFiltersForm>({
    resolver: zodResolver(coveragePeriodsFiltersSchema),
    defaultValues: defaultCoveragePeriodsFilters,
  })

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const isDefaultFilters =
      JSON.stringify(activeFilters) ===
      JSON.stringify(defaultCoveragePeriodsFilters)
    if (!isDefaultFilters) {
      methods.reset(activeFilters)
    }
  }, [activeFilters, methods])

  const handleOpenOffcanvas = () => {
    setCurrentStep('filters')
    setIsOffcanvasOpen(true)
  }

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false)
  }

  const handleRemoveFilter = (filterKey: keyof CoveragePeriodsFiltersForm) => {
    removeSpecificFilter(filterKey)
  }

  const handleResetFilters = () => {
    methods.reset()
    resetActiveFilters()
  }

  return (
    <div className="bg-white rounded-md h-full flex flex-col">
      <CoveragePeriodsFilterOffcanvas
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        methods={methods}
      />

      <div className="p-4 pt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Coverage Periods</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => {}}>
              <Settings size={20} />
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
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="border-0 text-ideon-primary-300 font-semibold"
          >
            Reset Filters
          </Button>
        </div>

        <CoveragePeriodsActiveTags
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
        />
      </div>

      <div className="flex-1 px-4 py-6 overflow-hidden">
        <CoveragePeriodsTable />
      </div>
    </div>
  )
}

export default CoveragePeriods
