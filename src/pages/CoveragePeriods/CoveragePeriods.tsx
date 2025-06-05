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
import { notImplemented } from '~/utils'

const CoveragePeriods: React.FC = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
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
    <main className="bg-white rounded-md h-full flex flex-col" role="main">
      <CoveragePeriodsFilterOffcanvas
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        methods={methods}
        data-testid="coverage-periods-filter-offcanvas"
      />

      <header className="p-4 pt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Coverage Periods</h1>
          <div
            className="flex items-center gap-2"
            role="toolbar"
            aria-label="Page actions"
          >
            <Button
              variant="outline"
              onClick={() => notImplemented('Settings')}
              aria-label="Settings"
            >
              <Settings size={20} aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              onClick={() => notImplemented('Export CSV')}
              aria-label="Export data as CSV"
            >
              Export CSV
            </Button>
            <Input
              value={searchValue}
              onChange={value => setSearchValue(value)}
              placeholder="Search"
              icon={<Search size={16} />}
              data-testid="search-input"
            />
          </div>
        </div>
        <nav
          className="flex items-center gap-2 mt-4"
          aria-label="Filter controls"
        >
          <Button
            variant="outline"
            onClick={handleOpenOffcanvas}
            aria-label="Open filters"
          >
            <Filter size={16} aria-hidden="true" />
            Filter
          </Button>
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="border-0 text-ideon-primary-300 font-semibold"
            aria-label="Reset filters"
          >
            Reset Filters
          </Button>
        </nav>

        <div data-testid="coverage-periods-active-tags">
          <CoveragePeriodsActiveTags
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
          />
        </div>
      </header>

      <section
        className="flex-1 px-4 py-6 overflow-hidden"
        aria-label="Coverage periods table"
      >
        <div data-testid="coverage-periods-table">
          <CoveragePeriodsTable />
        </div>
      </section>
    </main>
  )
}

export default CoveragePeriods
