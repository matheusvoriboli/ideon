type InputProps = {
  label?: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
  icon?: React.ReactNode
}

const Input = ({ label, value, placeholder, onChange, icon }: InputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full border border-ideon-primary-500 rounded-lg p-2 ${icon ? 'pl-8' : ''}`}
        />
        {icon && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
