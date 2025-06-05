import { z } from 'zod'
import { DistributionFormat } from '~/utils'

const dateFilterSchema = z.object({
  date: z.string().optional(),
  relative: z.enum(['before', 'after']).optional(),
})

export const coveragePeriodsFiltersSchema = z.object({
  organization: z.array(z.string()).optional(),
  group: z.string().optional(),
  coverageStartDate: dateFilterSchema,
  coverageEndDate: dateFilterSchema,
  setupCompletion: dateFilterSchema,
  distributionFormat: z.nativeEnum(DistributionFormat).optional(),
  carrier: z.string().optional(),
  state: z.string().optional(),
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
  organization: undefined,
  group: undefined,
  coverageStartDate: { date: undefined, relative: undefined },
  coverageEndDate: { date: undefined, relative: undefined },
  setupCompletion: { date: undefined, relative: undefined },
  distributionFormat: undefined,
  carrier: undefined,
  state: undefined,
}
