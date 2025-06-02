type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'outline'
  className?: string
  disabled?: boolean
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center p-2 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 ${className} ${
        variant === 'primary'
          ? 'bg-ideon-primary-300 text-white'
          : 'bg-transparent border-gray-200 border'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
