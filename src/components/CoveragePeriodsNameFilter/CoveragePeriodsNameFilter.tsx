import { useState } from 'react'
import { Button, Input, Checkbox } from '~/index'
import { useFiltersStore } from '~/stores'
import { UseFormReturn } from 'react-hook-form'
import { CoveragePeriodsFiltersForm, showSuccess } from '~/utils'

const CoveragePeriodsNameFilter: React.FC<{
  methods: UseFormReturn<CoveragePeriodsFiltersForm>
  closeOffcanvas: () => void
}> = ({ methods, closeOffcanvas }) => {
  const [filterName, setFilterName] = useState('')
  const [isDefault, setIsDefault] = useState(false)

  const { filterToSave, addSavedFilter, setCurrentStep } = useFiltersStore()

  const handleSave = () => {
    if (filterName.trim() && filterToSave) {
      addSavedFilter(filterName.trim(), filterToSave, isDefault)
      methods.reset()
      setFilterName('')
      setIsDefault(false)
      setCurrentStep('saved-filters')
      closeOffcanvas()
      showSuccess('Filter saved successfully')
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4">
        <div>
          <Input
            label="Name"
            value={filterName}
            onChange={setFilterName}
            placeholder="Initial and Paused"
          />
        </div>

        <div className="flex items-start gap-2">
          <div className="flex items-center h-5 mt-0.5">
            <Checkbox checked={isDefault} onChange={setIsDefault} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-ideon-dark dark:text-gray-300">
              Set as default filter
            </label>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              This filter will be applied by default when you visit this page
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-ideon-primary-500 dark:border-gray-600">
        <Button
          className="w-full"
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
