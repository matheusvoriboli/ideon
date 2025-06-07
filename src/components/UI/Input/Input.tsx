import { useId } from 'react'

type InputProps = {
  label?: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  required?: boolean
  disabled?: boolean
  'data-testid'?: string
}

const Input = ({
  label,
  value,
  placeholder,
  onChange,
  icon,
  required = false,
  disabled = false,
  'data-testid': dataTestId,
}: InputProps) => {
  const inputId = useId()

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-ideon-dark dark:text-gray-300"
        >
          {label}
          {required && (
            <span
              className="text-red-500 dark:text-red-400 ml-1"
              aria-label="required"
            >
              *
            </span>
          )}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          data-testid={dataTestId}
          className={`w-full border border-ideon-primary-500 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-ideon-dark-100 text-ideon-dark dark:text-gray-300 focus:ring-2 focus:ring-ideon-primary-200 dark:focus:ring-ideon-primary-400 focus:border-ideon-primary-300 dark:focus:border-ideon-primary-400 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed ${icon ? 'pl-8' : ''}`}
          aria-describedby={icon ? `${inputId}-icon` : undefined}
        />
        {icon && (
          <div
            id={`${inputId}-icon`}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
