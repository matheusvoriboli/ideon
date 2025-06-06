import { UseFormReturn } from 'react-hook-form'
import { Offcanvas, Tabs } from '~/index'
import { type CoveragePeriodsFiltersForm } from '~/utils'
import { useFiltersStore } from '~/stores'
import {
  CoveragePeriodsCreateFilter,
  CoveragePeriodsSavedFilter,
  CoveragePeriodsNameFilter,
} from '~/components'

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
        return (
          <CoveragePeriodsCreateFilter
            methods={methods}
            closeOffcanvas={onClose}
          />
        )
      case 'saved-filters':
        return (
          <CoveragePeriodsSavedFilter
            closeOffcanvas={onClose}
            methods={methods}
          />
        )
      case 'name-filter':
        return (
          <CoveragePeriodsNameFilter
            methods={methods}
            closeOffcanvas={onClose}
          />
        )
      default:
        return (
          <CoveragePeriodsCreateFilter
            methods={methods}
            closeOffcanvas={onClose}
          />
        )
    }
  }

  const getDefaultTabId = () => {
    switch (currentStep) {
      case 'filters':
        return 'filter'
      case 'saved-filters':
        return 'saved-filters'
      default:
        return 'filter'
    }
  }

  const handleBackToFilters = () => {
    setCurrentStep('filters')
  }

  const getOffcanvasProps = () => {
    if (currentStep === 'name-filter') {
      return {
        title: 'Save Filter',
        showBackButton: true,
        onBack: handleBackToFilters,
      }
    }
    if (currentStep === 'saved-filters') {
      return {
        title: 'Saved Filters',
        showBackButton: false,
      }
    }
    return {
      title: 'Select Filters',
      showBackButton: false,
    }
  }

  return (
    <Offcanvas isOpen={isOpen} onClose={onClose} {...getOffcanvasProps()}>
      {currentStep !== 'name-filter' && (
        <div className="mb-6">
          <Tabs
            key={currentStep}
            tabs={[
              { id: 'filter', label: 'Filter' },
              { id: 'saved-filters', label: 'Saved Filters' },
            ]}
            defaultTab={getDefaultTabId()}
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
