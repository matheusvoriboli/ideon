import { vi } from 'vitest'

// CoveragePeriodsFilterOffcanvas mock
export const CoveragePeriodsFilterOffcanvas = vi.fn(({ isOpen, onClose }) => (
  <div data-testid="coverage-periods-filter-offcanvas">
    {isOpen && (
      <div>
        <button onClick={onClose} data-testid="close-offcanvas">
          Close
        </button>
      </div>
    )}
  </div>
))

// CoveragePeriodsTable mock
export const CoveragePeriodsTable = vi.fn(() => (
  <div data-testid="coverage-periods-table">Coverage Periods Table</div>
))

// CoveragePeriodsActiveTags mock
export const CoveragePeriodsActiveTags = vi.fn(
  ({ activeFilters, onRemoveFilter }) => (
    <div data-testid="coverage-periods-active-tags">
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
  )
)

// Button mock
export const Button = vi.fn(
  ({ children, onClick, variant, className, ...props }) => (
    <button
      onClick={onClick}
      className={className}
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  )
)

// Input mock
export const Input = vi.fn(
  ({ value, onChange, placeholder, icon, ...props }) => (
    <div data-testid="input-container">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {icon && <span data-testid="input-icon">{icon}</span>}
    </div>
  )
)
