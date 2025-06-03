import { UseFormReturn } from 'react-hook-form'
import { Offcanvas, Tabs } from '~/index'
import { type CoveragePeriodsFiltersForm } from '~/utils'
import { useFiltersStore } from '~/stores/filtersStore'
import CoveragePeriodsCreateFilter from '../CoveragePeriodsCreateFilter/CoveragePeriodsCreateFilter'
import CoveragePeriodsSavedFilter from '../CoveragePeriodsSavedFilter/CoveragePeriodsSavedFilter'
import CoveragePeriodsNameFilter from '../CoveragePeriodsNameFilter/CoveragePeriodsNameFilter'

const CoveragePeriodsFilterOffcanvas = ({
  isOpen,
  onClose,
  methods,
}: {
  isOpen: boolean
  onClose: () => void
  methods: UseFormReturn<CoveragePeriodsFiltersForm>
}) => {
  const { currentStep, setCurrentStep } = useFiltersStore()

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'filters':
        return <CoveragePeriodsCreateFilter methods={methods} />
      case 'saved-filters':
        return <CoveragePeriodsSavedFilter />
      case 'name-filter':
        return <CoveragePeriodsNameFilter />
      default:
        return <CoveragePeriodsCreateFilter methods={methods} />
    }
  }

  return (
    <Offcanvas isOpen={isOpen} onClose={onClose}>
      {currentStep !== 'name-filter' && (
        <div className="mb-6">
          <Tabs
            tabs={[
              { id: 'filter', label: 'Filter' },
              { id: 'saved-filters', label: 'Saved Filters' },
            ]}
            onChange={tabId => {
              setCurrentStep(tabId as 'filters' | 'saved-filters')
            }}
          />
        </div>
      )}
      {renderCurrentStep()}
    </Offcanvas>
  )
}

export default CoveragePeriodsFilterOffcanvas
