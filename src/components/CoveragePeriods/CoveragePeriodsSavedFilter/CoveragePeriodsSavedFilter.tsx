import { Button, Tag } from '~/index'
import { useFiltersStore } from '~/stores/filtersStore'
import type { SavedFilter } from '~/utils'

const CoveragePeriodsSavedFilter: React.FC = () => {
  const { savedFilters, removeSavedFilter, setDefaultFilter, applyFilter } =
    useFiltersStore()

  const handleApplyFilter = (filter: SavedFilter) => {
    applyFilter(filter)
  }

  const handleDeleteFilter = (id: string) => {
    if (confirm('Are you sure you want to delete this filter?')) {
      removeSavedFilter(id)
    }
  }

  const handleToggleDefault = (id: string, currentIsDefault: boolean) => {
    if (!currentIsDefault) {
      setDefaultFilter(id)
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
                className="group flex items-center justify-between px-4 hover:bg-ideon-light transition-colors h-16 cursor-pointer"
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
                    onClick={() => {
                      handleToggleDefault(filter.id, filter.isDefault)
                    }}
                  >
                    {filter.isDefault ? 'Remove as Default' : 'Make Default'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
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
