interface RadioButtonProps {
  checked?: boolean
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
  label?: string
  name?: string
  value?: string
}

const RadioButton: React.FC<RadioButtonProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className = '',
  label,
  name,
  value,
}) => {
  const inputId =
    name && value
      ? `${name}-${value}`
      : `radio-${Math.random().toString(36).substr(2, 9)}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the radio button is checked, call the onChange function
    if (onChange && e.target.checked) {
      onChange(e.target.value)
    }
  }

  // This is a workaround to allow the radio button to be clicked when the label is clicked
  const handleDivClick = () => {
    if (!disabled) {
      const input = document.getElementById(inputId) as HTMLInputElement
      if (input) {
        input.click()
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          id={inputId}
          type="radio"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          name={name}
          value={value}
          className="sr-only peer"
        />
        <div
          onClick={handleDivClick}
          className={`
            w-6 h-6 border-2 rounded-full flex items-center justify-center cursor-pointer bg-white dark:bg-ideon-dark-100
            peer-checked:bg-ideon-primary-200 dark:peer-checked:bg-ideon-primary-400 peer-checked:border-ideon-primary-200 dark:peer-checked:border-ideon-primary-400
            peer-focus:ring-2 peer-focus:ring-ideon-primary-200 dark:peer-focus:ring-ideon-primary-400 peer-focus:ring-offset-1
            ${!checked && 'border-ideon-primary-500 dark:border-gray-600'}
            ${disabled && 'opacity-50 cursor-not-allowed'}
            ${className}
          `}
        >
          {checked && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
        </div>
      </div>
      {label && (
        <label
          htmlFor={inputId}
          className={`cursor-pointer text-ideon-dark dark:text-gray-300 ${disabled && 'opacity-50 cursor-not-allowed'}`}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default RadioButton
