import { z } from 'zod'
import { DistributionFormat } from '../enums'

// Schema para DateFilter
const dateFilterSchema = z.object({
  date: z.string(),
  relative: z.enum(['before', 'after']),
})

// Schema principal para os filtros
export const coveragePeriodsFiltersSchema = z.object({
  organization: z.array(z.string()),
  group: z.string(),
  coverageStartDate: dateFilterSchema,
  coverageEndDate: dateFilterSchema,
  setupCompletion: dateFilterSchema,
  distributionFormat: z.nativeEnum(DistributionFormat),
  carrier: z.string(),
  state: z.string(),
})

// Tipo inferido do schema
export type CoveragePeriodsFiltersForm = z.infer<
  typeof coveragePeriodsFiltersSchema
>

// Valores padrão
export const defaultCoveragePeriodsFilters: CoveragePeriodsFiltersForm = {
  organization: [],
  group: '',
  coverageStartDate: { date: '', relative: 'before' },
  coverageEndDate: { date: '', relative: 'after' },
  setupCompletion: { date: '', relative: 'before' },
  distributionFormat: DistributionFormat.Edi,
  carrier: '',
  state: '',
}
