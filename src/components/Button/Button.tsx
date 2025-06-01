type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'outline'
  className?: string
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className,
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center p-2 rounded-md cursor-pointer ${className} ${
        variant === 'primary'
          ? 'bg-ideon-primary-300 text-white'
          : 'bg-transparent border-ideon-light border'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
