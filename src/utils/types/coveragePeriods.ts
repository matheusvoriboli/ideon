import type { DistributionFormat } from '~/utils'

export type DateFilter = {
  date: string
  relative: 'before' | 'after'
}

export type CoveragePeriodsFilters = {
  organization: string[]
  carrier: string
  distributionFormat: DistributionFormat
  coverageStartDate: DateFilter
  coverageEndDate: DateFilter
  setupCompletion: DateFilter
  group: string
  state: string
}
