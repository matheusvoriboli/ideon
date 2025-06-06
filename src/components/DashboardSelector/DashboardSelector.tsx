import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

type DashboardOption = {
  id: string
  title: string
  acronym: string
}

type DashboardSelectorProps = {
  options: DashboardOption[]
  selectedId?: string
  onSelect: (option: DashboardOption) => void
}

export const DashboardSelector = ({
  options,
  selectedId,
  onSelect,
}: DashboardSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption =
    options.find(option => option.id === selectedId) || options[0]

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: DashboardOption) => {
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div className="relative mx-4 mb-6" ref={dropdownRef}>
      <div
        className="flex items-center gap-3 p-2 rounded-lg border border-ideon-light cursor-pointer transition-colors"
        onClick={handleToggle}
      >
        <div className="w-8 h-8 bg-ideon-primary-300 rounded flex items-center justify-center text-white font-semibold text-sm">
          {selectedOption.acronym}
        </div>

        <div className="flex-1">
          <span className="text-white font-medium text-sm">
            {selectedOption.title}
          </span>
        </div>

        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Dropdown with Options */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-ideon-dark-100 border border-gray-600 rounded-lg shadow-lg z-50 overflow-hidden">
          {options.map(option => (
            <div
              key={option.id}
              className={`flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-700 transition-colors ${
                selectedOption.id === option.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              <div className="w-6 h-6 bg-ideon-primary-300 rounded flex items-center justify-center text-white font-semibold text-xs">
                {option.acronym}
              </div>

              <span className="text-white text-sm">{option.title}</span>

              {selectedOption.id === option.id && (
                <div className="ml-auto w-2 h-2 bg-ideon-primary-400 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardSelector
