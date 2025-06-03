import { Check } from 'lucide-react'

interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  'aria-label'?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className = '',
  id,
  name,
  'aria-label': ariaLabel,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked)
    }
  }

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="relative inline-block">
      <input
        type="checkbox"
        id={checkboxId}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
      />
      <label
        htmlFor={checkboxId}
        className={`
          w-6 h-6 border-2 rounded flex items-center justify-center cursor-pointer
          ${checked ? 'bg-ideon-primary-200 border-ideon-primary-200' : 'border-gray-300'}
          ${disabled && 'opacity-50 cursor-not-allowed'}
          focus-within:ring-2 focus-within:ring-ideon-primary-200 focus-within:ring-opacity-50
          ${className}
        `}
      >
        {checked && <Check size={14} className="text-white" />}
      </label>
    </div>
  )
}

export default Checkbox
