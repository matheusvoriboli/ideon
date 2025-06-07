import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  type SavedFilter,
  type CoveragePeriodsFiltersForm,
  defaultCoveragePeriodsFilters,
} from '~/utils'

interface FiltersState {
  savedFilters: SavedFilter[]

  activeFilters: CoveragePeriodsFiltersForm
  searchTerm: string

  currentStep: 'filters' | 'saved-filters' | 'name-filter'
  filterToSave: CoveragePeriodsFiltersForm | null

  setSavedFilters: (filters: SavedFilter[]) => void
  addSavedFilter: (
    name: string,
    filters: CoveragePeriodsFiltersForm,
    isDefault?: boolean
  ) => void
  removeSavedFilter: (id: string) => void
  setDefaultFilter: (id: string) => void

  setActiveFilters: (filters: CoveragePeriodsFiltersForm) => void
  resetActiveFilters: () => void
  removeSpecificFilter: (filterKey: keyof CoveragePeriodsFiltersForm) => void

  setSearchTerm: (term: string) => void
  resetSearchTerm: () => void

  setCurrentStep: (step: 'filters' | 'saved-filters' | 'name-filter') => void
  startSavingFilter: (filters: CoveragePeriodsFiltersForm) => void
  cancelSavingFilter: () => void

  getDefaultFilter: () => SavedFilter | null
  applyFilter: (filter: SavedFilter) => void
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set, get) => ({
      savedFilters: [],
      activeFilters: defaultCoveragePeriodsFilters,
      searchTerm: '',
      currentStep: 'filters',
      filterToSave: null,

      setSavedFilters: filters => set({ savedFilters: filters }),

      addSavedFilter: (name, filters, isDefault = false) => {
        const newFilter: SavedFilter = {
          id: `filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name,
          filters,
          isDefault,
          createdAt: new Date(),
        }

        set(state => ({
          savedFilters: isDefault
            ? [
                ...state.savedFilters.map(f => ({ ...f, isDefault: false })),
                newFilter,
              ]
            : [...state.savedFilters, newFilter],
          filterToSave: null,
          currentStep: 'saved-filters',
        }))
      },

      removeSavedFilter: id => {
        set(state => ({
          savedFilters: state.savedFilters.filter(f => f.id !== id),
        }))
      },

      setDefaultFilter: id => {
        set(state => ({
          savedFilters: state.savedFilters.map(filter => ({
            ...filter,
            isDefault: filter.id === id,
          })),
        }))
      },

      setActiveFilters: filters => set({ activeFilters: filters }),

      resetActiveFilters: () =>
        set({ activeFilters: defaultCoveragePeriodsFilters }),

      removeSpecificFilter: filterKey => {
        set(state => {
          // Reset the filters to a default value
          const newFilters = {
            ...state.activeFilters,
            [filterKey]: defaultCoveragePeriodsFilters[filterKey],
          }

          return { activeFilters: newFilters }
        })
      },

      setSearchTerm: term => set({ searchTerm: term }),

      resetSearchTerm: () => set({ searchTerm: '' }),

      setCurrentStep: step => set({ currentStep: step }),

      startSavingFilter: filters => {
        set({
          filterToSave: filters,
          currentStep: 'name-filter',
        })
      },

      cancelSavingFilter: () => {
        set({
          filterToSave: null,
          currentStep: 'filters',
        })
      },

      getDefaultFilter: () => {
        const state = get()
        return state.savedFilters.find(f => f.isDefault) || null
      },

      applyFilter: filter => {
        set({
          activeFilters: filter.filters,
          currentStep: 'filters',
        })
      },
    }),
    {
      name: 'filters-storage',
      partialize: state => ({
        savedFilters: state.savedFilters,
      }),
      onRehydrateStorage: () => state => {
        if (state) {
          state.activeFilters = defaultCoveragePeriodsFilters
        }
      },
    }
  )
)
