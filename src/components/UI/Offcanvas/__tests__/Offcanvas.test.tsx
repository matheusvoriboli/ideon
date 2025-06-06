import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Offcanvas from '../Offcanvas'

interface MockButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: string
  className?: string
  'aria-label'?: string
}

vi.mock('~/index', () => ({
  Button: ({
    children,
    onClick,
    variant,
    className,
    'aria-label': ariaLabel,
  }: MockButtonProps) => (
    <button
      onClick={onClick}
      data-variant={variant}
      className={className}
      aria-label={ariaLabel}
      data-testid="mock-button"
    >
      {children}
    </button>
  ),
}))

vi.mock('lucide-react', () => ({
  X: () => <span data-testid="x-icon">X</span>,
  ChevronLeft: () => <span data-testid="chevron-left-icon">←</span>,
}))

describe('Offcanvas Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div data-testid="offcanvas-content">Test Content</div>,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic rendering', () => {
    it('should render when open', () => {
      render(<Offcanvas {...defaultProps} />)

      expect(screen.getByTestId('offcanvas-content')).toBeInTheDocument()
      expect(screen.getByText('Select Filters')).toBeInTheDocument()
    })

    it('should not render when closed', () => {
      render(<Offcanvas {...defaultProps} isOpen={false} />)

      expect(screen.queryByTestId('offcanvas-content')).not.toBeInTheDocument()
    })

    it('should render with custom title', () => {
      render(<Offcanvas {...defaultProps} title="Custom Title" />)

      expect(screen.getByText('Custom Title')).toBeInTheDocument()
    })

    it('should render close button', () => {
      render(<Offcanvas {...defaultProps} />)

      expect(screen.getByTestId('x-icon')).toBeInTheDocument()
    })
  })

  describe('Back button functionality', () => {
    it('should show back button when showBackButton is true', () => {
      const onBack = vi.fn()
      render(
        <Offcanvas {...defaultProps} showBackButton={true} onBack={onBack} />
      )

      expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument()
    })

    it('should not show back button when showBackButton is false', () => {
      render(<Offcanvas {...defaultProps} showBackButton={false} />)

      expect(screen.queryByTestId('chevron-left-icon')).not.toBeInTheDocument()
    })

    it('should call onBack when back button is clicked', async () => {
      const onBack = vi.fn()
      render(
        <Offcanvas {...defaultProps} showBackButton={true} onBack={onBack} />
      )

      const backButtons = screen.getAllByTestId('mock-button')
      const backButton = backButtons.find(button =>
        button.querySelector('[data-testid="chevron-left-icon"]')
      )

      expect(backButton).toBeInTheDocument()
      if (backButton) {
        await userEvent.click(backButton)
        expect(onBack).toHaveBeenCalledOnce()
      }
    })
  })

  describe('Close functionality', () => {
    it('should call onClose when close button is clicked', async () => {
      const onClose = vi.fn()
      render(<Offcanvas {...defaultProps} onClose={onClose} />)

      const closeButtons = screen.getAllByTestId('mock-button')
      const closeButton = closeButtons.find(button =>
        button.querySelector('[data-testid="x-icon"]')
      )

      expect(closeButton).toBeInTheDocument()
      if (closeButton) {
        await userEvent.click(closeButton)
        expect(onClose).toHaveBeenCalledOnce()
      }
    })

    it('should call onClose when clicking backdrop', async () => {
      const onClose = vi.fn()
      render(<Offcanvas {...defaultProps} onClose={onClose} />)

      const backdrop = screen.getByRole('dialog')
      await userEvent.click(backdrop)

      expect(onClose).toHaveBeenCalledOnce()
    })

    it('should not call onClose when clicking inside offcanvas content', async () => {
      const onClose = vi.fn()
      render(<Offcanvas {...defaultProps} onClose={onClose} />)

      const content = screen.getByTestId('offcanvas-content')
      await userEvent.click(content)

      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have correct ARIA attributes', () => {
      render(<Offcanvas {...defaultProps} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')
      expect(dialog).toHaveAttribute('aria-labelledby', 'offcanvas-title')
    })

    it('should have proper title id', () => {
      render(<Offcanvas {...defaultProps} />)

      const title = screen.getByText('Select Filters')
      expect(title).toHaveAttribute('id', 'offcanvas-title')
    })

    it('should have content with proper role', () => {
      render(<Offcanvas {...defaultProps} />)

      const content = screen.getByRole('document')
      expect(content).toHaveAttribute('aria-label', 'Offcanvas content')
    })
  })

  describe('CSS classes and styling', () => {
    it('should apply correct base classes', () => {
      render(<Offcanvas {...defaultProps} />)

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass('fixed', 'inset-0', 'bg-black/50', 'z-[1000]')
    })

    it('should apply transform classes for animation', () => {
      const { container } = render(<Offcanvas {...defaultProps} />)

      const offcanvasPanel = container.querySelector('.transform')
      expect(offcanvasPanel).toHaveClass('translate-x-0')
    })
  })
})
