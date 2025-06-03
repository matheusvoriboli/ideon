import { z } from 'zod'
import { DistributionFormat } from '~/utils'

const dateFilterSchema = z.object({
  date: z.string(),
  relative: z.enum(['before', 'after']).optional(),
})

export const coveragePeriodsFiltersSchema = z.object({
  organization: z.array(z.string()),
  group: z.string(),
  coverageStartDate: dateFilterSchema,
  coverageEndDate: dateFilterSchema,
  setupCompletion: dateFilterSchema,
  distributionFormat: z.nativeEnum(DistributionFormat).optional(),
  carrier: z.string(),
  state: z.string(),
})

export const savedFilterSchema = z.object({
  id: z.string(),
  name: z.string(),
  isDefault: z.boolean(),
  filters: coveragePeriodsFiltersSchema,
  createdAt: z.date(),
})

export type CoveragePeriodsFiltersForm = z.infer<
  typeof coveragePeriodsFiltersSchema
>
export type SavedFilter = z.infer<typeof savedFilterSchema>

export const defaultCoveragePeriodsFilters: CoveragePeriodsFiltersForm = {
  organization: [],
  group: '',
  coverageStartDate: { date: '', relative: undefined },
  coverageEndDate: { date: '', relative: undefined },
  setupCompletion: { date: '', relative: undefined },
  distributionFormat: undefined,
  carrier: '',
  state: '',
}
