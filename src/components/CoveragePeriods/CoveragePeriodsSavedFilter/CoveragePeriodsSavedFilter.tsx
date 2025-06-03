import { Trash2, Star, StarOff } from 'lucide-react'
import { Button } from '~/index'
import { useFiltersStore } from '~/stores/filtersStore'
import { type SavedFilter } from '~/utils'

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div>
      <div className="space-y-4 flex-1 overflow-y-auto">
        <div className="flex flex-col mb-2">
          <label className="text-sm font-semibold">Saved Filters</label>
        </div>

        {savedFilters.length === 0 ? (
          <div className="text-gray-500 text-sm">No filters saved</div>
        ) : (
          <div className="space-y-3">
            {savedFilters.map(filter => (
              <div
                key={filter.id}
                className="p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{filter.name}</h4>
                    {filter.isDefault && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                        <Star size={12} />
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        handleToggleDefault(filter.id, filter.isDefault)
                      }
                      className="p-1 hover:bg-gray-200 rounded"
                      title={
                        filter.isDefault
                          ? 'Remove from default'
                          : 'Set as default'
                      }
                    >
                      {filter.isDefault ? (
                        <StarOff size={14} className="text-gray-500" />
                      ) : (
                        <Star size={14} className="text-gray-400" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteFilter(filter.id)}
                      className="p-1 hover:bg-red-100 rounded"
                      title="Delete filter"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-600 space-y-1 mb-3">
                  <div className="text-xs text-gray-400">
                    Created: {formatDate(filter.createdAt)}
                  </div>

                  {filter.filters.organization.length > 0 && (
                    <div>
                      Organizations: {filter.filters.organization.join(', ')}
                    </div>
                  )}
                  {filter.filters.group && (
                    <div>Group: {filter.filters.group}</div>
                  )}
                  {filter.filters.carrier && (
                    <div>Carrier: {filter.filters.carrier}</div>
                  )}
                  {filter.filters.state && (
                    <div>State: {filter.filters.state}</div>
                  )}
                  <div>Format: {filter.filters.distributionFormat}</div>
                </div>

                <Button
                  size="sm"
                  onClick={() => handleApplyFilter(filter)}
                  className="w-full"
                >
                  Apply Filter
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CoveragePeriodsSavedFilter
