import { Tag } from '~/index'
import {
  type CoveragePeriodsFiltersForm,
  defaultCoveragePeriodsFilters,
  DistributionFormat,
} from '~/utils'

interface CoveragePeriodsActiveTagsProps {
  activeFilters: CoveragePeriodsFiltersForm
  onRemoveFilter: (filterKey: keyof CoveragePeriodsFiltersForm) => void
}

// Mapeamento para nomes amigáveis dos filtros
const filterLabels: Record<keyof CoveragePeriodsFiltersForm, string> = {
  organization: 'Organization',
  group: 'Group',
  coverageStartDate: 'Coverage Start Date',
  coverageEndDate: 'Coverage End Date',
  setupCompletion: 'Setup Completion',
  distributionFormat: 'Distribution Format',
  carrier: 'Carrier',
  state: 'State',
}

const CoveragePeriodsActiveTags: React.FC<CoveragePeriodsActiveTagsProps> = ({
  activeFilters,
  onRemoveFilter,
}) => {
  const getActiveTags = () => {
    const tags: Array<{
      key: keyof CoveragePeriodsFiltersForm
      label: string
      value?: string
    }> = []

    // Organization (array) - agrupar em uma única tag
    if (activeFilters.organization && activeFilters.organization.length > 0) {
      const organizationsText = activeFilters.organization.join(', ')
      tags.push({
        key: 'organization',
        label: `${filterLabels.organization}: ${organizationsText}`,
      })
    }

    // Group
    if (
      activeFilters.group &&
      activeFilters.group !== defaultCoveragePeriodsFilters.group
    ) {
      tags.push({
        key: 'group',
        label: `${filterLabels.group}: ${activeFilters.group}`,
      })
    }

    // Carrier
    if (
      activeFilters.carrier &&
      activeFilters.carrier !== defaultCoveragePeriodsFilters.carrier
    ) {
      tags.push({
        key: 'carrier',
        label: `${filterLabels.carrier}: ${activeFilters.carrier}`,
      })
    }

    // State
    if (
      activeFilters.state &&
      activeFilters.state !== defaultCoveragePeriodsFilters.state
    ) {
      tags.push({
        key: 'state',
        label: `${filterLabels.state}: ${activeFilters.state}`,
      })
    }

    // Distribution Format
    if (
      activeFilters.distributionFormat &&
      activeFilters.distributionFormat !==
        defaultCoveragePeriodsFilters.distributionFormat
    ) {
      const formatLabel =
        activeFilters.distributionFormat === DistributionFormat.Edi
          ? 'EDI'
          : 'API'
      tags.push({
        key: 'distributionFormat',
        label: `${filterLabels.distributionFormat}: ${formatLabel}`,
      })
    }

    // Coverage Start Date
    if (
      activeFilters.coverageStartDate.date &&
      activeFilters.coverageStartDate.relative
    ) {
      const relative =
        activeFilters.coverageStartDate.relative === 'before'
          ? 'before'
          : 'after'
      const dateLabel = `${relative} ${activeFilters.coverageStartDate.date}`
      tags.push({
        key: 'coverageStartDate',
        label: `${filterLabels.coverageStartDate}: ${dateLabel}`,
      })
    }

    // Coverage End Date
    if (
      activeFilters.coverageEndDate.date &&
      activeFilters.coverageEndDate.relative
    ) {
      const relative =
        activeFilters.coverageEndDate.relative === 'before' ? 'before' : 'after'
      const dateLabel = `${relative} ${activeFilters.coverageEndDate.date}`
      tags.push({
        key: 'coverageEndDate',
        label: `${filterLabels.coverageEndDate}: ${dateLabel}`,
      })
    }

    // Setup Completion
    if (
      activeFilters.setupCompletion.date &&
      activeFilters.setupCompletion.relative
    ) {
      const relative =
        activeFilters.setupCompletion.relative === 'before' ? 'before' : 'after'
      const dateLabel = `${relative} ${activeFilters.setupCompletion.date}`
      tags.push({
        key: 'setupCompletion',
        label: `${filterLabels.setupCompletion}: ${dateLabel}`,
      })
    }

    return tags
  }

  const activeTags = getActiveTags()

  if (activeTags.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-2">
      {activeTags.map((tag, index) => (
        <Tag
          key={`${tag.key}-${tag.value || 'single'}-${index}`}
          onClose={() => onRemoveFilter(tag.key)}
        >
          {tag.label}
        </Tag>
      ))}
    </div>
  )
}

export default CoveragePeriodsActiveTags
