import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search, Check } from 'lucide-react'
import { Input, Tag } from '~/components'

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
  'aria-label'?: string
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
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [openUpward, setOpenUpward] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

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

  const singleSelectedOption = !multiple ? selectedOptions[0] : null

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

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

  // Reset focus when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1)
    }
  }, [isOpen])

  const handleSelect = (optionValue: string | number) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : value ? [value] : []
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter(v => v !== optionValue))
      } else {
        onChange([...currentValues, optionValue])
      }
    } else {
      onChange(optionValue)
      setIsOpen(false)
    }
  }

  const handleRemoveTag = (optionValue: string | number) => {
    const currentValues = Array.isArray(value) ? value : value ? [value] : []
    onChange(currentValues.filter(v => v !== optionValue))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[focusedIndex].value)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        buttonRef.current?.focus()
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setFocusedIndex(prev =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          )
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          setFocusedIndex(prev =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          )
        }
        break
      case 'Tab':
        if (isOpen) {
          setIsOpen(false)
        }
        break
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={dropdownRef}>
      {label && (
        <label className="text-sm font-semibold" id={`${ariaLabel}-label`}>
          {label}
        </label>
      )}

      <div className="relative">
        {/* Main dropdown button */}
        <div
          ref={buttonRef}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`
            w-full h-[40px] px-3 py-2 bg-white border border-ideon-primary-500 rounded-lg cursor-pointer
            flex items-center justify-between gap-2 focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_rgb(34_197_94)]
            ${disabled && 'bg-gray-50 cursor-not-allowed'}
          `}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={ariaLabel || label}
          aria-labelledby={label ? `${ariaLabel}-label` : undefined}
          tabIndex={disabled ? -1 : 0}
          aria-describedby={`${ariaLabel}-description`}
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
                      +{selectedOptions.length - 2} mais
                    </span>
                  )}
                </>
              )
            ) : singleSelectedOption ? (
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
            aria-hidden="true"
          />
        </div>

        {/* Dropdown menu */}
        {isOpen && !disabled && (
          <div
            ref={listRef}
            className={`
            absolute left-0 right-0 bg-white border border-ideon-primary-500 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden
            ${openUpward ? 'bottom-full mb-1' : 'top-full mt-1'}
          `}
            role="listbox"
            aria-label={`Options for ${ariaLabel || label}`}
            aria-multiselectable={multiple}
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
                <div className="px-3 py-2 text-sm text-gray-500" role="option">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = safeValue
                    .map(v => String(v))
                    .includes(String(option.value))
                  const isFocused = index === focusedIndex

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
                        ${isFocused ? 'bg-gray-100' : ''}
                      `}
                      role="option"
                      aria-selected={isSelected}
                      id={`option-${option.value}`}
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
                              ${isSelected ? 'bg-ideon-primary-200 border-ideon-primary-200' : 'border-ideon-primary-500'}
                            `}
                            role="checkbox"
                            aria-checked={isSelected}
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

      <div id={`${ariaLabel}-description`} className="sr-only">
        {multiple
          ? `Multiple selection. Use the arrows to navigate and Enter to select. ${selectedOptions.length} items selected.`
          : `Use the arrows to navigate and Enter to select. ${singleSelectedOption ? `Selected: ${singleSelectedOption.label}` : 'No item selected'}.`}
      </div>
    </div>
  )
}

export default Dropdown
