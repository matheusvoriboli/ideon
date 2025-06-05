import { vi } from 'vitest'
import { defaultCoveragePeriodsFilters } from '~/utils'

export const mockFiltersStore = {
  activeFilters: defaultCoveragePeriodsFilters,
  setCurrentStep: vi.fn(),
  removeSpecificFilter: vi.fn(),
  resetActiveFilters: vi.fn(),
}

export const useFiltersStore = vi.fn(() => mockFiltersStore)
