import { describe, it, expect } from 'vitest'
import {
  filterCoveragePeriodsData,
  DistributionFormat,
  type CoveragePeriodsFiltersForm,
} from '~/utils'

const mockTestData = [
  {
    uuid: 'test1',
    organizationName: 'Organization A',
    group: 'Group 1',
    carrier: 'Carrier A',
    account: 'Normal Account',
    deliveryConfiguration: '01.01.2024',
    state: 'Active',
    DistributionFormat: 'Edi' as const,
    coverageStartDate: '01.01.2024',
    coverageEndDate: '31.12.2024',
    SetupCompleteAt: '15.01.2024',
  },
  {
    uuid: 'test2',
    organizationName: 'Organization B',
    group: 'Group 2',
    carrier: 'Carrier B',
    account: 'Normal Account',
    deliveryConfiguration: '01.06.2024',
    state: 'Inactive',
    DistributionFormat: 'Api' as const,
    coverageStartDate: '01.06.2024',
    coverageEndDate: '30.06.2024',
    SetupCompleteAt: '10.06.2024',
  },
  {
    uuid: 'test3',
    organizationName: 'Organization A',
    group: 'Group 1',
    carrier: 'Carrier C',
    account: 'Normal Account',
    deliveryConfiguration: '01.03.2024',
    state: 'Active',
    DistributionFormat: 'Edi' as const,
    coverageStartDate: '01.03.2024',
    coverageEndDate: '31.03.2024',
    SetupCompleteAt: '05.03.2024',
  },
]

// Helper function to create valid filters
const createFilters = (
  overrides: Partial<CoveragePeriodsFiltersForm> = {}
): CoveragePeriodsFiltersForm => ({
  organization: undefined,
  group: undefined,
  coverageStartDate: { date: undefined, relative: undefined },
  coverageEndDate: { date: undefined, relative: undefined },
  setupCompletion: { date: undefined, relative: undefined },
  distributionFormat: undefined,
  carrier: undefined,
  state: undefined,
  ...overrides,
})

describe('filterCoveragePeriodsData', () => {
  describe('organization filter', () => {
    it('should return all items when no organization filter is applied', () => {
      const filters = createFilters()
      const result = filterCoveragePeriodsData(mockTestData, filters)
      expect(result).toHaveLength(3)
    })

    it('should filter by single organization', () => {
      const filters = createFilters({ organization: ['Organization A'] })
      const result = filterCoveragePeriodsData(mockTestData, filters)
      expect(result).toHaveLength(2)
      expect(
        result.every(item => item.organizationName === 'Organization A')
      ).toBe(true)
    })
  })

  describe('group filter', () => {
    it('should filter by group', () => {
      const filters = createFilters({ group: 'Group 1' })
      const result = filterCoveragePeriodsData(mockTestData, filters)
      expect(result).toHaveLength(2)
      expect(result.every(item => item.group === 'Group 1')).toBe(true)
    })
  })

  describe('state filter', () => {
    it('should filter by state (case insensitive)', () => {
      const filters = createFilters({ state: 'active' })
      const result = filterCoveragePeriodsData(mockTestData, filters)
      expect(result).toHaveLength(2)
      expect(result.every(item => item.state.toLowerCase() === 'active')).toBe(
        true
      )
    })
  })

  describe('distribution format filter', () => {
    it('should filter by EDI distribution format', () => {
      const filters = createFilters({
        distributionFormat: DistributionFormat.Edi,
      })
      const result = filterCoveragePeriodsData(mockTestData, filters)
      expect(result).toHaveLength(2)
      expect(result.every(item => item.DistributionFormat === 'Edi')).toBe(true)
    })
  })

  describe('date filters', () => {
    it('should filter by coverage start date (after)', () => {
      const filters = createFilters({
        coverageStartDate: {
          date: '2024-05-01',
          relative: 'after' as const,
        },
      })
      const result = filterCoveragePeriodsData(mockTestData, filters)
      expect(result).toHaveLength(1)
      expect(result[0].coverageStartDate).toBe('01.06.2024')
    })
  })

  describe('combined filters', () => {
    it('should apply multiple filters simultaneously', () => {
      const filters = createFilters({
        organization: ['Organization A'],
        state: 'Active',
        distributionFormat: DistributionFormat.Edi,
      })
      const result = filterCoveragePeriodsData(mockTestData, filters)
      expect(result).toHaveLength(2)
      expect(
        result.every(
          item =>
            item.organizationName === 'Organization A' &&
            item.state === 'Active' &&
            item.DistributionFormat === 'Edi'
        )
      ).toBe(true)
    })
  })
})
