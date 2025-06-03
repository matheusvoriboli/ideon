import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search, Check } from 'lucide-react'
import Tag from '../Tag/Tag'
import { Input } from '~/components'

interface DropdownOption {
  value: string | number
  label: string
}

interface DropdownProps {
  value?: (string | number)[] | string | number
  options?: DropdownOption[]
  onChange: (value: (string | number)[] | string | number) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
  searchable?: boolean
  multiple?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  options = [],
  onChange,
  placeholder,
  label,
  disabled = false,
  className = '',
  searchable = false,
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [openUpward, setOpenUpward] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Normalize value to array for internal processing
  const safeValue = multiple
    ? Array.isArray(value)
      ? value
      : value
        ? [value]
        : []
    : value
      ? [value]
      : []

  const filteredOptions = searchable
    ? options?.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    : options || []

  const selectedOptions =
    options?.filter(option => safeValue.includes(option.value)) || []

  // Calculate dropdown position when opening
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const dropdownHeight = 240 // max-h-60 = 240px
      const spaceBelow = windowHeight - rect.bottom
      const spaceAbove = rect.top

      // Open upward if there's not enough space below but enough space above
      setOpenUpward(spaceBelow < dropdownHeight && spaceAbove > dropdownHeight)
    }
  }, [isOpen])

  const handleSelect = (optionValue: string | number) => {
    if (multiple) {
      // Multiple selection logic
      const stringOptionValue = String(optionValue)
      const stringValues = safeValue.map(v => String(v))

      if (stringValues.includes(stringOptionValue)) {
        // Remove if already selected
        const newValue = safeValue.filter(v => String(v) !== stringOptionValue)
        onChange(newValue as (string | number)[])
      } else {
        // Add if not selected
        const newValue = [...safeValue, optionValue]
        onChange(newValue as (string | number)[])
      }
    } else {
      // Single selection logic
      onChange(optionValue)
      setIsOpen(false) // Close dropdown after selection
      setSearchTerm('') // Clear search
    }
  }

  const handleRemoveTag = (optionValue: string | number) => {
    if (multiple) {
      const newValue = safeValue.filter(v => v !== optionValue)
      onChange(newValue as (string | number)[])
    } else {
      onChange('')
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
      setSearchTerm('')
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // For single selection, get the selected option
  const singleSelectedOption =
    !multiple && value ? options?.find(option => option.value === value) : null

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={dropdownRef}>
      {label && <label className="text-sm font-semibold">{label}</label>}

      <div className="relative">
        {/* Main dropdown button */}
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            w-full h-[40px] px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer
            flex items-center justify-between gap-2
            ${disabled && 'bg-gray-50 cursor-not-allowed'}
            ${isOpen ? 'border-blue-500 ring-1 ring-blue-200' : ''}
          `}
        >
          <div className="flex-1 flex items-center gap-1 overflow-hidden">
            {multiple ? (
              // Multiple selection display
              selectedOptions.length === 0 ? (
                <span className="text-gray-500 text-sm">{placeholder}</span>
              ) : (
                <>
                  <div className="flex items-center gap-1 overflow-hidden">
                    {selectedOptions.slice(0, 2).map(option => (
                      <Tag
                        key={option.value}
                        onClose={
                          !disabled
                            ? () => handleRemoveTag(option.value)
                            : undefined
                        }
                        disabled={disabled}
                      >
                        {option.label}
                      </Tag>
                    ))}
                  </div>
                  {selectedOptions.length > 2 && (
                    <span className="text-gray-500 text-xs ml-1 whitespace-nowrap">
                      +{selectedOptions.length - 2} more
                    </span>
                  )}
                </>
              )
            ) : // Single selection display
            singleSelectedOption ? (
              <span className="text-gray-900 text-sm truncate">
                {singleSelectedOption.label}
              </span>
            ) : (
              <span className="text-gray-500 text-sm">{placeholder}</span>
            )}
          </div>

          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {/* Dropdown menu */}
        {isOpen && !disabled && (
          <div
            className={`
            absolute left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden
            ${openUpward ? 'bottom-full mb-1' : 'top-full mt-1'}
          `}
          >
            {searchable && (
              <div className="p-2">
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={value => setSearchTerm(value)}
                  icon={<Search size={16} />}
                />
              </div>
            )}

            <div className="max-h-40 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No options found
                </div>
              ) : (
                filteredOptions.map(option => {
                  const isSelected = safeValue
                    .map(v => String(v))
                    .includes(String(option.value))
                  return (
                    <div
                      key={option.value}
                      onClick={
                        multiple ? undefined : () => handleSelect(option.value)
                      }
                      className={`
                        px-3 py-2 text-sm flex items-center gap-2
                        ${multiple ? '' : 'cursor-pointer hover:bg-gray-50'}
                        ${isSelected && !multiple ? 'bg-ideon-light text-ideon-primary-300 font-bold' : 'text-gray-900'}
                      `}
                    >
                      {multiple ? (
                        // Visual checkbox for multiple selection
                        <div
                          onClick={() => handleSelect(option.value)}
                          className="cursor-pointer hover:bg-gray-50 rounded flex items-center gap-2 flex-1 -mx-3 px-3 py-1"
                        >
                          <div
                            className={`
                              w-6 h-6 border-2 rounded flex items-center justify-center
                              ${isSelected ? 'bg-ideon-primary-200 border-ideon-primary-200' : 'border-gray-300'}
                            `}
                          >
                            {isSelected && (
                              <Check size={14} className="text-white" />
                            )}
                          </div>
                          {option.label}
                        </div>
                      ) : (
                        option.label
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown
