import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dropdown } from '~/components'

interface MockInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

interface MockTagProps {
  children: React.ReactNode
  onClose?: () => void
}

// Input and tag mocks
vi.mock('~/components', () => ({
  Input: ({ value, onChange, placeholder }: MockInputProps) => (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      data-testid="dropdown-search"
    />
  ),
  Tag: ({ children, onClose }: MockTagProps) => (
    <span data-testid="dropdown-tag">
      {children}
      {onClose && (
        <button onClick={onClose} data-testid="tag-close">
          X
        </button>
      )}
    </span>
  ),
}))

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
]

describe('Dropdown Component', () => {
  const defaultProps = {
    options: mockOptions,
    onChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic rendering', () => {
    it('should render with placeholder', () => {
      render(<Dropdown {...defaultProps} placeholder="Select option" />)

      expect(screen.getByText('Select option')).toBeInTheDocument()
    })

    it('should render with label', () => {
      render(<Dropdown {...defaultProps} label="Test Label" />)

      expect(screen.getByText('Test Label')).toBeInTheDocument()
    })

    it('should be disabled when disabled prop is true', () => {
      render(<Dropdown {...defaultProps} disabled />)

      const button = screen.getByRole('combobox')
      expect(button).toHaveClass('bg-gray-50', 'cursor-not-allowed')
    })
  })

  describe('Single selection', () => {
    it('should open dropdown when clicked', async () => {
      render(<Dropdown {...defaultProps} />)

      const button = screen.getByRole('combobox')
      await userEvent.click(button)

      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })

    it('should select option and close dropdown', async () => {
      const onChange = vi.fn()
      render(<Dropdown {...defaultProps} onChange={onChange} />)

      const button = screen.getByRole('combobox')
      await userEvent.click(button)

      const option = screen.getByText('Option 1')
      await userEvent.click(option)

      expect(onChange).toHaveBeenCalledWith('1')
    })

    it('should display selected value', () => {
      render(<Dropdown {...defaultProps} value="1" />)

      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })
  })

  describe('Multiple selection', () => {
    it('should display multiple selected values as tags', () => {
      render(<Dropdown {...defaultProps} multiple value={['1', '2']} />)

      expect(screen.getAllByTestId('dropdown-tag')).toHaveLength(2)
    })

    it('should show "+X mais" when more than 2 options selected', () => {
      render(<Dropdown {...defaultProps} multiple value={['1', '2', '3']} />)

      expect(screen.getByText('+1 mais')).toBeInTheDocument()
    })

    it('should remove tag when close button is clicked', async () => {
      const onChange = vi.fn()
      render(
        <Dropdown
          {...defaultProps}
          multiple
          value={['1']}
          onChange={onChange}
        />
      )

      const closeButton = screen.getByTestId('tag-close')
      await userEvent.click(closeButton)

      expect(onChange).toHaveBeenCalledWith([])
    })
  })

  describe('Searchable functionality', () => {
    it('should show search input when searchable', async () => {
      render(<Dropdown {...defaultProps} searchable />)

      const button = screen.getByRole('combobox')
      await userEvent.click(button)

      expect(screen.getByTestId('dropdown-search')).toBeInTheDocument()
    })
  })

  describe('Keyboard navigation', () => {
    it('should open dropdown with Enter key', async () => {
      render(<Dropdown {...defaultProps} />)

      const button = screen.getByRole('combobox')
      button.focus()
      await userEvent.keyboard('{Enter}')

      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    it('should close dropdown with Escape key', async () => {
      render(<Dropdown {...defaultProps} />)

      const button = screen.getByRole('combobox')
      await userEvent.click(button)
      await userEvent.keyboard('{Escape}')

      expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    })
  })

  describe('Click outside behavior', () => {
    it('should close dropdown when clicking outside', async () => {
      render(
        <div>
          <Dropdown {...defaultProps} />
          <div data-testid="outside">Outside</div>
        </div>
      )

      const button = screen.getByRole('combobox')
      await userEvent.click(button)

      expect(screen.getByText('Option 1')).toBeInTheDocument()

      const outside = screen.getByTestId('outside')
      fireEvent.mouseDown(outside)

      expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have correct ARIA attributes', () => {
      render(<Dropdown {...defaultProps} aria-label="Test dropdown" />)

      const button = screen.getByRole('combobox')
      expect(button).toHaveAttribute('aria-expanded', 'false')
      expect(button).toHaveAttribute('aria-haspopup', 'listbox')
      expect(button).toHaveAttribute('aria-label', 'Test dropdown')
    })

    it('should update aria-expanded when opened', async () => {
      render(<Dropdown {...defaultProps} />)

      const button = screen.getByRole('combobox')
      await userEvent.click(button)

      expect(button).toHaveAttribute('aria-expanded', 'true')
    })
  })
})
