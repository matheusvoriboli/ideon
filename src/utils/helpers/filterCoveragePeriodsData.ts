import {
  mockData,
  DistributionFormat,
  type CoveragePeriodsFiltersForm,
} from '~/utils'

// Function to parse date from DD.MM.YYYY to Date object
const parseDate = (dateString: string): Date => {
  if (!dateString) return new Date()
  const [day, month, year] = dateString.split('.')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

// Function to check if date matches filter criteria
const matchesDateFilter = (
  itemDate: string,
  filterDate: string,
  relative?: 'before' | 'after'
): boolean => {
  if (!filterDate || !relative) return true

  const itemDateObj = parseDate(itemDate)
  const filterDateObj = new Date(filterDate)

  if (relative === 'before') {
    return itemDateObj <= filterDateObj
  } else {
    return itemDateObj >= filterDateObj
  }
}

// Main filter function
export const filterCoveragePeriodsData = (
  data: typeof mockData,
  activeFilters: CoveragePeriodsFiltersForm
) => {
  return data.filter((item: (typeof mockData)[0]) => {
    // Organization filter (multiple selection)
    if (activeFilters.organization.length > 0) {
      if (!activeFilters.organization.includes(item.organizationName)) {
        return false
      }
    }

    // Group filter
    if (activeFilters.group && activeFilters.group !== '') {
      if (item.group !== activeFilters.group) {
        return false
      }
    }

    // Carrier filter
    if (activeFilters.carrier && activeFilters.carrier !== '') {
      if (item.carrier !== activeFilters.carrier) {
        return false
      }
    }

    // State filter
    if (activeFilters.state && activeFilters.state !== '') {
      if (item.state.toLowerCase() !== activeFilters.state.toLowerCase()) {
        return false
      }
    }

    // Distribution Format filter
    if (activeFilters.distributionFormat) {
      // Convert enum to string for comparison
      const filterFormat =
        activeFilters.distributionFormat === DistributionFormat.Edi
          ? 'Edi'
          : 'Api'
      if (item.DistributionFormat !== filterFormat) {
        return false
      }
    }

    // Coverage Start Date filter
    if (
      activeFilters.coverageStartDate.date &&
      activeFilters.coverageStartDate.relative
    ) {
      if (
        !matchesDateFilter(
          item.coverageStartDate,
          activeFilters.coverageStartDate.date,
          activeFilters.coverageStartDate.relative
        )
      ) {
        return false
      }
    }

    // Coverage End Date filter
    if (
      activeFilters.coverageEndDate.date &&
      activeFilters.coverageEndDate.relative
    ) {
      if (
        !matchesDateFilter(
          item.coverageEndDate,
          activeFilters.coverageEndDate.date,
          activeFilters.coverageEndDate.relative
        )
      ) {
        return false
      }
    }

    // Setup Completion filter
    if (
      activeFilters.setupCompletion.date &&
      activeFilters.setupCompletion.relative
    ) {
      if (
        !matchesDateFilter(
          item.SetupCompleteAt,
          activeFilters.setupCompletion.date,
          activeFilters.setupCompletion.relative
        )
      ) {
        return false
      }
    }

    return true
  })
}
