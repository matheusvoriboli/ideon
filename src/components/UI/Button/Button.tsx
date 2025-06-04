type ButtonProps = {
  children: React.ReactNode
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'outline'
  className?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className,
  disabled,
  size = 'md',
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center rounded-lg gap-2 cursor-pointer text-nowrap disabled:cursor-not-allowed hover:opacity-80 disabled:opacity-50 disabled:bg-gray-100 ${className} 
      ${size === 'sm' && 'p-2 text-sm'}
      ${size === 'md' && 'p-2.5 text-sm'}
      ${size === 'lg' && 'p-3 text-base'}
      } ${
        variant === 'primary'
          ? 'bg-ideon-primary-300 text-white'
          : 'bg-transparent border-ideon-primary-500 border'
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
