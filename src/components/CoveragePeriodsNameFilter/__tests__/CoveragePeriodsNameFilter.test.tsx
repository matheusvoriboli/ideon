import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CoveragePeriodsNameFilter from '../CoveragePeriodsNameFilter'
import { UseFormReturn } from 'react-hook-form'
import { CoveragePeriodsFiltersForm } from '~/utils'

interface MockInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}

interface MockCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

interface MockButtonProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
  disabled?: boolean
}

vi.mock('~/index', () => ({
  Button: ({ children, onClick, className, disabled }: MockButtonProps) => (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      data-testid="mock-button"
    >
      {children}
    </button>
  ),
  Input: ({ label, value, onChange, placeholder }: MockInputProps) => (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid="filter-name-input"
      />
    </div>
  ),
  Checkbox: ({ checked, onChange }: MockCheckboxProps) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      data-testid="default-checkbox"
    />
  ),
}))

const mockFiltersStore = {
  filterToSave: {
    organization: ['Test Org'],
    group: 'Test Group',
  },
  addSavedFilter: vi.fn(),
  setCurrentStep: vi.fn(),
}

vi.mock('~/stores/filtersStore', () => ({
  useFiltersStore: () => mockFiltersStore,
}))

vi.mock('~/utils', () => ({
  showSuccess: vi.fn(),
}))

describe('CoveragePeriodsNameFilter Component', () => {
  const mockMethods = {
    reset: vi.fn(),
  } as unknown as UseFormReturn<CoveragePeriodsFiltersForm>

  const defaultProps = {
    methods: mockMethods,
    closeOffcanvas: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic rendering', () => {
    it('should render filter name input', () => {
      render(<CoveragePeriodsNameFilter {...defaultProps} />)

      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByTestId('filter-name-input')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Initial and Paused')
      ).toBeInTheDocument()
    })

    it('should render default filter checkbox', () => {
      render(<CoveragePeriodsNameFilter {...defaultProps} />)

      expect(screen.getByText('Set as default filter')).toBeInTheDocument()
      expect(screen.getByTestId('default-checkbox')).toBeInTheDocument()
      expect(
        screen.getByText(
          'This filter will be applied by default when you visit this page'
        )
      ).toBeInTheDocument()
    })

    it('should render save button', () => {
      render(<CoveragePeriodsNameFilter {...defaultProps} />)

      const saveButton = screen.getByText('Save Filter')
      expect(saveButton).toBeInTheDocument()
    })

    it('should have save button disabled initially', () => {
      render(<CoveragePeriodsNameFilter {...defaultProps} />)

      const saveButton = screen.getByText('Save Filter')
      expect(saveButton).toBeDisabled()
    })
  })

  describe('User interactions', () => {
    it('should enable save button when filter name is entered', async () => {
      render(<CoveragePeriodsNameFilter {...defaultProps} />)

      const input = screen.getByTestId('filter-name-input')
      await userEvent.type(input, 'My Filter')

      const saveButton = screen.getByText('Save Filter')
      expect(saveButton).not.toBeDisabled()
    })

    it('should toggle default checkbox', async () => {
      render(<CoveragePeriodsNameFilter {...defaultProps} />)

      const checkbox = screen.getByTestId('default-checkbox')
      expect(checkbox).not.toBeChecked()

      await userEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    it('should call addSavedFilter with correct params when save is clicked', async () => {
      render(<CoveragePeriodsNameFilter {...defaultProps} />)

      const input = screen.getByTestId('filter-name-input')
      await userEvent.type(input, 'Test Filter')

      const checkbox = screen.getByTestId('default-checkbox')
      await userEvent.click(checkbox)

      const saveButton = screen.getByText('Save Filter')
      await userEvent.click(saveButton)

      expect(mockFiltersStore.addSavedFilter).toHaveBeenCalledWith(
        'Test Filter',
        mockFiltersStore.filterToSave,
        true
      )
    })

    it('should call form reset after saving', async () => {
      render(<CoveragePeriodsNameFilter {...defaultProps} />)

      const input = screen.getByTestId('filter-name-input')
      await userEvent.type(input, 'Test Filter')

      const saveButton = screen.getByText('Save Filter')
      await userEvent.click(saveButton)

      expect(mockMethods.reset).toHaveBeenCalled()
    })

    it('should navigate to saved-filters step after saving', async () => {
      render(<CoveragePeriodsNameFilter {...defaultProps} />)

      const input = screen.getByTestId('filter-name-input')
      await userEvent.type(input, 'Test Filter')

      const saveButton = screen.getByText('Save Filter')
      await userEvent.click(saveButton)

      expect(mockFiltersStore.setCurrentStep).toHaveBeenCalledWith(
        'saved-filters'
      )
    })

    it('should close offcanvas after saving', async () => {
      const closeOffcanvas = vi.fn()
      render(
        <CoveragePeriodsNameFilter
          {...defaultProps}
          closeOffcanvas={closeOffcanvas}
        />
      )

      const input = screen.getByTestId('filter-name-input')
      await userEvent.type(input, 'Test Filter')

      const saveButton = screen.getByText('Save Filter')
      await userEvent.click(saveButton)

      expect(closeOffcanvas).toHaveBeenCalled()
    })

    it('should not save if filter name is empty', async () => {
      render(<CoveragePeriodsNameFilter {...defaultProps} />)

      const saveButton = screen.getByText('Save Filter')
      expect(saveButton).toBeDisabled()

      // Even if we try to click, it shouldn't call the save function
      await userEvent.click(saveButton)
      expect(mockFiltersStore.addSavedFilter).not.toHaveBeenCalled()
    })
  })

  describe('Layout and styling', () => {
    it('should have correct layout structure', () => {
      const { container } = render(
        <CoveragePeriodsNameFilter {...defaultProps} />
      )

      const mainContainer = container.querySelector('.h-full.flex.flex-col')
      expect(mainContainer).toBeInTheDocument()

      const footer = container.querySelector('.pt-4.border-t')
      expect(footer).toBeInTheDocument()
    })

    it('should have save button with full width', () => {
      render(<CoveragePeriodsNameFilter {...defaultProps} />)

      const saveButton = screen.getByText('Save Filter')
      expect(saveButton).toHaveClass('w-full')
    })
  })
})
