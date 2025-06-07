import { describe, it, expect, beforeEach } from 'vitest'
import { useFiltersStore } from '~/stores'
import { defaultCoveragePeriodsFilters } from '~/utils'

// Helper to reset the store between tests
const resetStore = () => {
  useFiltersStore.getState().resetActiveFilters()
  useFiltersStore.getState().setSavedFilters([])
  useFiltersStore.getState().resetSearchTerm()
}

describe('FiltersStore', () => {
  beforeEach(() => {
    resetStore()
  })

  describe('Initial state', () => {
    it('should have active filters as default', () => {
      const store = useFiltersStore.getState()

      expect(store.activeFilters).toEqual(defaultCoveragePeriodsFilters)
    })

    it('should have empty array of saved filters', () => {
      const store = useFiltersStore.getState()

      expect(store.savedFilters).toEqual([])
    })

    it('should have initial step as filters', () => {
      const store = useFiltersStore.getState()

      expect(store.currentStep).toBe('filters')
    })

    it('should have filterToSave as null', () => {
      const store = useFiltersStore.getState()

      expect(store.filterToSave).toBeNull()
    })

    it('should have searchTerm as empty string', () => {
      const store = useFiltersStore.getState()

      expect(store.searchTerm).toBe('')
    })
  })

  describe('Active filters management', () => {
    it('should define active filters', () => {
      const newFilters = {
        ...defaultCoveragePeriodsFilters,
        organization: ['Test Org'],
        group: 'Test Group',
      }

      useFiltersStore.getState().setActiveFilters(newFilters)

      expect(useFiltersStore.getState().activeFilters).toEqual(newFilters)
    })

    it('should reset active filters to default', () => {
      // First define custom filters
      const customFilters = {
        ...defaultCoveragePeriodsFilters,
        organization: ['Test Org'],
      }
      useFiltersStore.getState().setActiveFilters(customFilters)

      // Then reset
      useFiltersStore.getState().resetActiveFilters()

      expect(useFiltersStore.getState().activeFilters).toEqual(
        defaultCoveragePeriodsFilters
      )
    })

    it('should remove specific filter', () => {
      // Define filters with organization
      const customFilters = {
        ...defaultCoveragePeriodsFilters,
        organization: ['Test Org'],
        group: 'Test Group',
      }
      useFiltersStore.getState().setActiveFilters(customFilters)

      // Remove only organization
      useFiltersStore.getState().removeSpecificFilter('organization')

      const updatedFilters = useFiltersStore.getState().activeFilters
      expect(updatedFilters.organization).toEqual(
        defaultCoveragePeriodsFilters.organization
      )
      expect(updatedFilters.group).toBe('Test Group') // Other filters kept
    })
  })

  describe('Search term management', () => {
    it('should set search term', () => {
      useFiltersStore.getState().setSearchTerm('test search')

      expect(useFiltersStore.getState().searchTerm).toBe('test search')
    })

    it('should reset search term', () => {
      // First set a search term
      useFiltersStore.getState().setSearchTerm('test search')

      // Then reset
      useFiltersStore.getState().resetSearchTerm()

      expect(useFiltersStore.getState().searchTerm).toBe('')
    })
  })

  describe('Saved filters management', () => {
    it('should add saved filter', () => {
      const filterToSave = {
        ...defaultCoveragePeriodsFilters,
        organization: ['Saved Org'],
      }

      useFiltersStore.getState().addSavedFilter('My Filter', filterToSave)

      const savedFilters = useFiltersStore.getState().savedFilters
      expect(savedFilters).toHaveLength(1)
      expect(savedFilters[0].name).toBe('My Filter')
      expect(savedFilters[0].filters).toEqual(filterToSave)
      expect(savedFilters[0].isDefault).toBe(false)
    })

    it('should add saved filter as default', () => {
      const filterToSave = {
        ...defaultCoveragePeriodsFilters,
        organization: ['Default Org'],
      }

      useFiltersStore
        .getState()
        .addSavedFilter('Default Filter', filterToSave, true)

      const savedFilters = useFiltersStore.getState().savedFilters
      expect(savedFilters[0].isDefault).toBe(true)
    })

    it('should remove saved filter', () => {
      // Add two filters
      useFiltersStore
        .getState()
        .addSavedFilter('Filter 1', defaultCoveragePeriodsFilters)
      useFiltersStore
        .getState()
        .addSavedFilter('Filter 2', defaultCoveragePeriodsFilters)

      const savedFilters = useFiltersStore.getState().savedFilters
      const firstFilterId = savedFilters[0].id

      // Remove the first one
      useFiltersStore.getState().removeSavedFilter(firstFilterId)

      const updatedFilters = useFiltersStore.getState().savedFilters
      expect(updatedFilters).toHaveLength(1)
      expect(updatedFilters[0].name).toBe('Filter 2')
    })

    it('should define filter as default', () => {
      // Add two filters
      useFiltersStore
        .getState()
        .addSavedFilter('Filter 1', defaultCoveragePeriodsFilters)
      useFiltersStore
        .getState()
        .addSavedFilter('Filter 2', defaultCoveragePeriodsFilters, true)

      const savedFilters = useFiltersStore.getState().savedFilters
      const firstFilterId = savedFilters[0].id

      // Define the first one as default
      useFiltersStore.getState().setDefaultFilter(firstFilterId)

      const updatedFilters = useFiltersStore.getState().savedFilters
      expect(updatedFilters[0].isDefault).toBe(true)
      expect(updatedFilters[1].isDefault).toBe(false)
    })
  })

  describe('Navigation between steps', () => {
    it('should define current step', () => {
      useFiltersStore.getState().setCurrentStep('saved-filters')

      expect(useFiltersStore.getState().currentStep).toBe('saved-filters')
    })

    it('should start saving filter process', () => {
      const filtersToSave = {
        ...defaultCoveragePeriodsFilters,
        organization: ['Org to save'],
      }

      useFiltersStore.getState().startSavingFilter(filtersToSave)

      expect(useFiltersStore.getState().filterToSave).toEqual(filtersToSave)
      expect(useFiltersStore.getState().currentStep).toBe('name-filter')
    })

    it('should cancel saving filter process', () => {
      // First start the process
      useFiltersStore
        .getState()
        .startSavingFilter(defaultCoveragePeriodsFilters)

      // Then cancel
      useFiltersStore.getState().cancelSavingFilter()

      expect(useFiltersStore.getState().filterToSave).toBeNull()
      expect(useFiltersStore.getState().currentStep).toBe('filters')
    })
  })

  describe('Utilities', () => {
    it('should return default filter when exists', () => {
      useFiltersStore
        .getState()
        .addSavedFilter('Default Filter', defaultCoveragePeriodsFilters, true)

      const defaultFilter = useFiltersStore.getState().getDefaultFilter()

      expect(defaultFilter).not.toBeNull()
      expect(defaultFilter?.isDefault).toBe(true)
      expect(defaultFilter?.name).toBe('Default Filter')
    })

    it('should return null when there is no default filter', () => {
      useFiltersStore
        .getState()
        .addSavedFilter('Regular Filter', defaultCoveragePeriodsFilters)

      const defaultFilter = useFiltersStore.getState().getDefaultFilter()

      expect(defaultFilter).toBeNull()
    })

    it('should apply saved filter', () => {
      const filterToApply = {
        ...defaultCoveragePeriodsFilters,
        organization: ['Applied Org'],
      }

      useFiltersStore
        .getState()
        .addSavedFilter('Filter to Apply', filterToApply)
      const savedFilter = useFiltersStore.getState().savedFilters[0]

      useFiltersStore.getState().applyFilter(savedFilter)

      expect(useFiltersStore.getState().activeFilters).toEqual(filterToApply)
      expect(useFiltersStore.getState().currentStep).toBe('filters')
    })
  })
})
