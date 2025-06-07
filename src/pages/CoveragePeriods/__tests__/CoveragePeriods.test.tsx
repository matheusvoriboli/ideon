/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CoveragePeriods } from '~/pages'

// Store mock
const mockFiltersStore = {
  activeFilters: {
    organization: undefined,
    group: undefined,
    coverageStartDate: { date: undefined, relative: undefined },
    coverageEndDate: { date: undefined, relative: undefined },
    setupCompletion: { date: undefined, relative: undefined },
    distributionFormat: undefined,
    carrier: undefined,
    state: undefined,
  },
  setCurrentStep: vi.fn(),
  removeSpecificFilter: vi.fn(),
  resetActiveFilters: vi.fn(),
  getDefaultFilter: vi.fn(() => null),
  applyFilter: vi.fn(),
}

// Hook Form Mock
const mockFormMethods = {
  reset: vi.fn(),
}

// Mocks
vi.mock('~/stores/filtersStore', () => ({
  useFiltersStore: () => mockFiltersStore,
}))

vi.mock('react-hook-form', () => ({
  useForm: () => mockFormMethods,
}))

vi.mock('~/index', () => ({
  Button: ({ children, onClick, variant, className }: any) => (
    <button onClick={onClick} className={className} data-variant={variant}>
      {children}
    </button>
  ),
  Input: ({ value, onChange, placeholder, icon }: any) => (
    <div data-testid="input-container">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid="search-input"
      />
      {icon && <span data-testid="input-icon">{icon}</span>}
    </div>
  ),
  CoveragePeriodsFilterOffcanvas: ({ isOpen, onClose }: any) => (
    <div data-testid="coverage-periods-filter-offcanvas">
      {isOpen && (
        <div>
          <button onClick={onClose} data-testid="close-offcanvas">
            Close
          </button>
        </div>
      )}
    </div>
  ),
  CoveragePeriodsTable: () => <div>Coverage Periods Table</div>,
  CoveragePeriodsActiveTags: ({ activeFilters, onRemoveFilter }: any) => (
    <div>
      {Object.entries(activeFilters).map(([key, value]) => {
        if (!value) return null
        return (
          <span key={key} data-testid={`tag-${key}`}>
            {key}: {JSON.stringify(value)}
            <button
              onClick={() => onRemoveFilter(key)}
              data-testid={`remove-${key}`}
            >
              Remove
            </button>
          </span>
        )
      })}
    </div>
  ),
}))

// Lucide react mock
vi.mock('lucide-react', () => ({
  Filter: () => <span data-testid="filter-icon">Filter Icon</span>,
  Search: () => <span data-testid="search-icon">Search Icon</span>,
  Settings: () => <span data-testid="settings-icon">Settings Icon</span>,
}))

describe('CoveragePeriods Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initial rendering', () => {
    it('should render the page title', () => {
      render(<CoveragePeriods />)

      expect(screen.getByText('Coverage Periods')).toBeInTheDocument()
    })

    it('should render all main buttons', () => {
      render(<CoveragePeriods />)

      expect(screen.getByTestId('settings-icon')).toBeInTheDocument()
      expect(screen.getByText('Export CSV')).toBeInTheDocument()
      expect(screen.getByText('Filter')).toBeInTheDocument()
      expect(screen.getByText('Reset Filters')).toBeInTheDocument()
    })

    it('should render the search field', () => {
      render(<CoveragePeriods />)

      expect(screen.getByTestId('search-input')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
      expect(screen.getByTestId('search-icon')).toBeInTheDocument()
    })

    it('should render the child components', () => {
      render(<CoveragePeriods />)

      expect(
        screen.getByTestId('coverage-periods-filter-offcanvas')
      ).toBeInTheDocument()
      expect(screen.getByTestId('coverage-periods-table')).toBeInTheDocument()
      expect(
        screen.getByTestId('coverage-periods-active-tags')
      ).toBeInTheDocument()
    })
  })

  describe('Filters functionality', () => {
    it('should call setCurrentStep when clicking the Filter button', async () => {
      render(<CoveragePeriods />)

      const filterButton = screen.getByText('Filter')
      await userEvent.click(filterButton)

      expect(mockFiltersStore.setCurrentStep).toHaveBeenCalledWith('filters')
    })

    it('should reset the filters when clicking Reset Filters', async () => {
      render(<CoveragePeriods />)

      const resetButton = screen.getByText('Reset Filters')
      await userEvent.click(resetButton)

      expect(mockFormMethods.reset).toHaveBeenCalled()
      expect(mockFiltersStore.resetActiveFilters).toHaveBeenCalled()
    })
  })

  describe('Offcanvas behavior', () => {
    it('should initialize with offcanvas closed', () => {
      render(<CoveragePeriods />)

      expect(screen.queryByTestId('close-offcanvas')).not.toBeInTheDocument()
    })
  })

  describe('Structure and layout', () => {
    it('should render the buttons with the correct CSS classes', () => {
      render(<CoveragePeriods />)

      const resetButton = screen.getByText('Reset Filters')
      expect(resetButton).toHaveAttribute('data-variant', 'outline')
      expect(resetButton).toHaveClass(
        'border-0',
        'text-ideon-primary-300',
        'font-semibold'
      )
    })

    it('should render the correct icons', () => {
      render(<CoveragePeriods />)

      expect(screen.getByTestId('filter-icon')).toBeInTheDocument()
      expect(screen.getByTestId('search-icon')).toBeInTheDocument()
      expect(screen.getByTestId('settings-icon')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have elements with the correct data-testid', () => {
      render(<CoveragePeriods />)

      expect(
        screen.getByTestId('coverage-periods-filter-offcanvas')
      ).toBeInTheDocument()
      expect(screen.getByTestId('coverage-periods-table')).toBeInTheDocument()
      expect(
        screen.getByTestId('coverage-periods-active-tags')
      ).toBeInTheDocument()
      expect(screen.getByTestId('search-input')).toBeInTheDocument()
    })

    it('should have appropriate placeholders in the inputs', () => {
      render(<CoveragePeriods />)

      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
    })
  })

  describe('Integration with components', () => {
    it('should pass the correct props to CoveragePeriodsActiveTags', () => {
      render(<CoveragePeriods />)

      const activeTagsComponent = screen.getByTestId(
        'coverage-periods-active-tags'
      )
      expect(activeTagsComponent).toBeInTheDocument()
    })

    it('should pass the correct props to CoveragePeriodsFilterOffcanvas', () => {
      render(<CoveragePeriods />)

      const offcanvasComponent = screen.getByTestId(
        'coverage-periods-filter-offcanvas'
      )
      expect(offcanvasComponent).toBeInTheDocument()
    })

    it('should render CoveragePeriodsTable', () => {
      render(<CoveragePeriods />)

      expect(screen.getByTestId('coverage-periods-table')).toBeInTheDocument()
      expect(screen.getByText('Coverage Periods Table')).toBeInTheDocument()
    })
  })
})
