import type { UseFormReturn } from 'react-hook-form'
import { Button, Tag } from '~/index'
import { useFiltersStore } from '~/stores/filtersStore'
import {
  showSuccess,
  showError,
  type CoveragePeriodsFiltersForm,
  type SavedFilter,
} from '~/utils'

const CoveragePeriodsSavedFilter: React.FC<{
  closeOffcanvas: () => void
  methods: UseFormReturn<CoveragePeriodsFiltersForm>
}> = ({ closeOffcanvas, methods }) => {
  const {
    savedFilters,
    removeSavedFilter,
    setDefaultFilter,
    applyFilter,
    activeFilters,
  } = useFiltersStore()

  const handleApplyFilter = (filter: SavedFilter) => {
    applyFilter(filter)
    methods.reset()
    closeOffcanvas()
    showSuccess('Filter applied successfully')
  }

  const handleDeleteFilter = (id: string) => {
    if (confirm('Are you sure you want to delete this filter?')) {
      removeSavedFilter(id)
      showSuccess('Filter deleted successfully')
    } else {
      showError('Filter not deleted')
    }
  }

  const handleToggleDefault = (id: string, currentIsDefault: boolean) => {
    if (!currentIsDefault) {
      setDefaultFilter(id)
      showSuccess('Filter set as default successfully')
    } else {
      setDefaultFilter('')
      showSuccess('Filter removed as default successfully')
    }
  }

  return (
    <div>
      <div className="space-y-4 flex-1 overflow-y-auto">
        {savedFilters?.length === 0 ? (
          <div className="text-gray-500 text-sm">No filters saved</div>
        ) : (
          <div>
            {savedFilters?.map(filter => (
              <div
                key={filter.id}
                className={`group flex items-center justify-between px-4 hover:bg-ideon-light transition-colors h-16 cursor-pointer ${
                  (filter.filters === activeFilters || filter.isDefault) &&
                  'bg-ideon-light'
                }`}
                onClick={e => {
                  e.stopPropagation()
                  handleApplyFilter(filter)
                }}
              >
                {filter.name}
                <div className="flex group-hover:hidden items-center gap-2 ">
                  {filter.isDefault && <Tag>Default</Tag>}
                </div>
                <div className="hidden group-hover:flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={e => {
                      e?.stopPropagation()
                      handleToggleDefault(filter.id, filter.isDefault)
                    }}
                  >
                    {filter.isDefault ? 'Remove as Default' : 'Make Default'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={e => {
                      e?.stopPropagation()
                      handleDeleteFilter(filter.id)
                    }}
                    className="text-red-400"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CoveragePeriodsSavedFilter
