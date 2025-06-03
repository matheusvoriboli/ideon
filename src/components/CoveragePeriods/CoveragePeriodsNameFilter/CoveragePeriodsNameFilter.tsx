import { useState } from 'react'
import { Button, Input, Checkbox } from '~/index'
import { useFiltersStore } from '~/stores/filtersStore'

const CoveragePeriodsNameFilter: React.FC = () => {
  const [filterName, setFilterName] = useState('')
  const [isDefault, setIsDefault] = useState(false)

  const { filterToSave, addSavedFilter, cancelSavingFilter, setCurrentStep } =
    useFiltersStore()

  const handleSave = () => {
    if (filterName.trim() && filterToSave) {
      addSavedFilter(filterName.trim(), filterToSave, isDefault)
      setFilterName('')
      setIsDefault(false)
    }
  }

  const handleCancel = () => {
    cancelSavingFilter()
    setFilterName('')
    setIsDefault(false)
  }

  const handleBackToFilters = () => {
    setCurrentStep('filters')
    setFilterName('')
    setIsDefault(false)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4">
        {/* <div>
          <h3 className="text-lg font-semibold mb-4">Save Filter</h3>
          <p className="text-sm text-gray-600 mb-4">
            Give your filter a name to save it for future use.
          </p>
        </div> */}

        <div>
          <Input
            label="Filter Name"
            value={filterName}
            onChange={setFilterName}
            placeholder="Enter filter name"
          />
        </div>

        <div className="flex items-start gap-2">
          <div className="flex items-center h-5 mt-0.5">
            <Checkbox checked={isDefault} onChange={setIsDefault} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Set as default filter</label>
            <span className="text-xs text-gray-600">
              This filter will be applied by default when you visit this page.
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-300">
        <Button variant="outline" className="flex-1" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleBackToFilters}
        >
          Back to Filters
        </Button>
        <Button
          className="flex-1"
          onClick={handleSave}
          disabled={!filterName.trim()}
        >
          Save Filter
        </Button>
      </div>
    </div>
  )
}

export default CoveragePeriodsNameFilter
