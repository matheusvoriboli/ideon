import { describe, it, expect } from 'vitest'
import {
  coveragePeriodsFiltersSchema,
  savedFilterSchema,
  defaultCoveragePeriodsFilters,
  type CoveragePeriodsFiltersForm,
  type SavedFilter,
  DistributionFormat,
} from '~/utils'

describe('coveragePeriodsSchema', () => {
  describe('coveragePeriodsFiltersSchema', () => {
    it('deve validar filtros vazios (padrão)', () => {
      const result = coveragePeriodsFiltersSchema.safeParse(
        defaultCoveragePeriodsFilters
      )

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(defaultCoveragePeriodsFilters)
      }
    })

    it('deve validar filtros com organization array', () => {
      const validData: CoveragePeriodsFiltersForm = {
        ...defaultCoveragePeriodsFilters,
        organization: ['Org1', 'Org2', 'Org3'],
      }

      const result = coveragePeriodsFiltersSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.organization).toEqual(['Org1', 'Org2', 'Org3'])
      }
    })

    it('deve validar filtros com group string', () => {
      const validData: CoveragePeriodsFiltersForm = {
        ...defaultCoveragePeriodsFilters,
        group: 'Test Group Name',
      }

      const result = coveragePeriodsFiltersSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.group).toBe('Test Group Name')
      }
    })

    it('deve validar filtros de data com date e relative', () => {
      const validData: CoveragePeriodsFiltersForm = {
        ...defaultCoveragePeriodsFilters,
        coverageStartDate: {
          date: '2024-01-01',
          relative: 'after',
        },
        coverageEndDate: {
          date: '2024-12-31',
          relative: 'before',
        },
      }

      const result = coveragePeriodsFiltersSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.coverageStartDate.date).toBe('2024-01-01')
        expect(result.data.coverageStartDate.relative).toBe('after')
        expect(result.data.coverageEndDate.date).toBe('2024-12-31')
        expect(result.data.coverageEndDate.relative).toBe('before')
      }
    })

    it('deve validar todos os campos preenchidos', () => {
      const validData: CoveragePeriodsFiltersForm = {
        organization: ['Org1', 'Org2'],
        group: 'Test Group',
        coverageStartDate: { date: '2024-01-01', relative: 'after' },
        coverageEndDate: { date: '2024-12-31', relative: 'before' },
        setupCompletion: { date: '2024-06-01', relative: 'after' },
        distributionFormat: DistributionFormat.Edi,
        carrier: 'Test Carrier',
        state: 'CA',
      }

      const result = coveragePeriodsFiltersSchema.safeParse(validData)

      expect(result.success).toBe(true)
    })

    it('deve validar distributionFormat enum', () => {
      const validDataEdi: CoveragePeriodsFiltersForm = {
        ...defaultCoveragePeriodsFilters,
        distributionFormat: DistributionFormat.Edi,
      }

      const validDataApi: CoveragePeriodsFiltersForm = {
        ...defaultCoveragePeriodsFilters,
        distributionFormat: DistributionFormat.Api,
      }

      const resultEdi = coveragePeriodsFiltersSchema.safeParse(validDataEdi)
      const resultApi = coveragePeriodsFiltersSchema.safeParse(validDataApi)

      expect(resultEdi.success).toBe(true)
      expect(resultApi.success).toBe(true)
      if (resultEdi.success) {
        expect(resultEdi.data.distributionFormat).toBe(DistributionFormat.Edi)
      }
      if (resultApi.success) {
        expect(resultApi.data.distributionFormat).toBe(DistributionFormat.Api)
      }
    })

    it('deve rejeitar relative inválido', () => {
      const invalidData = {
        ...defaultCoveragePeriodsFilters,
        coverageStartDate: {
          date: '2024-01-01',
          relative: 'invalid_value', // It should be before or after
        },
      }

      const result = coveragePeriodsFiltersSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
    })

    it('deve aceitar campos opcionais como undefined', () => {
      const validData = {
        organization: undefined,
        group: undefined,
        coverageStartDate: { date: undefined, relative: undefined },
        coverageEndDate: { date: undefined, relative: undefined },
        setupCompletion: { date: undefined, relative: undefined },
        distributionFormat: undefined,
        carrier: undefined,
        state: undefined,
      }

      const result = coveragePeriodsFiltersSchema.safeParse(validData)

      expect(result.success).toBe(true)
    })
  })

  describe('savedFilterSchema', () => {
    it('deve validar filtro salvo válido', () => {
      const validSavedFilter: SavedFilter = {
        id: 'filter-123',
        name: 'My Saved Filter',
        isDefault: false,
        filters: defaultCoveragePeriodsFilters,
        createdAt: new Date('2024-01-01'),
      }

      const result = savedFilterSchema.safeParse(validSavedFilter)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.id).toBe('filter-123')
        expect(result.data.name).toBe('My Saved Filter')
        expect(result.data.isDefault).toBe(false)
      }
    })

    it('deve validar filtro salvo como padrão', () => {
      const validSavedFilter: SavedFilter = {
        id: 'default-filter-456',
        name: 'Default Filter',
        isDefault: true,
        filters: {
          ...defaultCoveragePeriodsFilters,
          organization: ['Default Org'],
        },
        createdAt: new Date('2024-01-15'),
      }

      const result = savedFilterSchema.safeParse(validSavedFilter)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.isDefault).toBe(true)
        expect(result.data.filters.organization).toEqual(['Default Org'])
      }
    })

    it('deve rejeitar filtro salvo com campos obrigatórios faltando', () => {
      const invalidSavedFilter = {
        name: 'Incomplete Filter',
        isDefault: false,
        filters: defaultCoveragePeriodsFilters,
        createdAt: new Date(),
      }

      const result = savedFilterSchema.safeParse(invalidSavedFilter)

      expect(result.success).toBe(false)
    })

    it('deve rejeitar filtro salvo com tipos incorretos', () => {
      const invalidSavedFilter = {
        id: 'filter-123',
        name: 'Valid Name',
        isDefault: 'not-a-boolean',
        filters: defaultCoveragePeriodsFilters,
        createdAt: new Date(),
      }

      const result = savedFilterSchema.safeParse(invalidSavedFilter)

      expect(result.success).toBe(false)
    })
  })

  describe('defaultCoveragePeriodsFilters', () => {
    it('deve ter estrutura correta', () => {
      expect(defaultCoveragePeriodsFilters).toEqual({
        organization: undefined,
        group: undefined,
        coverageStartDate: { date: undefined, relative: undefined },
        coverageEndDate: { date: undefined, relative: undefined },
        setupCompletion: { date: undefined, relative: undefined },
        distributionFormat: undefined,
        carrier: undefined,
        state: undefined,
      })
    })

    it('deve ser válido contra o schema', () => {
      const result = coveragePeriodsFiltersSchema.safeParse(
        defaultCoveragePeriodsFilters
      )

      expect(result.success).toBe(true)
    })

    it('deve ter todas as propriedades necessárias', () => {
      const requiredProperties = [
        'organization',
        'group',
        'coverageStartDate',
        'coverageEndDate',
        'setupCompletion',
        'distributionFormat',
        'carrier',
        'state',
      ]

      requiredProperties.forEach(property => {
        expect(defaultCoveragePeriodsFilters).toHaveProperty(property)
      })
    })

    it('deve ter estrutura de data correta para campos de data', () => {
      const dateFields = [
        'coverageStartDate',
        'coverageEndDate',
        'setupCompletion',
      ]

      dateFields.forEach(field => {
        const dateField =
          defaultCoveragePeriodsFilters[
            field as keyof typeof defaultCoveragePeriodsFilters
          ]
        expect(dateField).toHaveProperty('date')
        expect(dateField).toHaveProperty('relative')
      })
    })
  })

  describe('Tipos TypeScript', () => {
    it('deve exportar tipos corretos', () => {
      const filters: CoveragePeriodsFiltersForm = defaultCoveragePeriodsFilters
      const savedFilter: SavedFilter = {
        id: 'test',
        name: 'Test Filter',
        isDefault: false,
        filters: defaultCoveragePeriodsFilters,
        createdAt: new Date(),
      }

      expect(filters).toBeDefined()
      expect(savedFilter).toBeDefined()
    })
  })
})
