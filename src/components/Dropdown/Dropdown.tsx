import React from 'react'
import { ChevronDown } from 'lucide-react'

interface DropdownOption {
  value: string | number
  label: string
}

interface DropdownProps {
  value: string | number
  options: DropdownOption[]
  onChange: (value: string | number) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-sm">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg
            appearance-none cursor-pointer pr-8
            ${disabled ? 'text-gray-400' : 'text-gray-900'}
          `}
        >
          {placeholder && value === '' && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown
            size={16}
            className={disabled ? 'text-gray-400' : 'text-gray-500'}
          />
        </div>
      </div>
    </div>
  )
}

export default Dropdown
