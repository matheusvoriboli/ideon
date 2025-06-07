import { forwardRef } from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'outline'
  className?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
  'aria-describedby'?: string
  'data-testid'?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      variant = 'primary',
      className,
      disabled,
      size = 'md',
      type = 'button',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'data-testid': dataTestId,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`flex items-center justify-center rounded-lg gap-2 cursor-pointer text-nowrap disabled:cursor-not-allowed hover:opacity-80 disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-ideon-primary-200 dark:focus:ring-ideon-primary-400 ${className} 
      ${size === 'sm' && 'p-1.5 text-sm'}
      ${size === 'md' && 'p-2 text-sm'}
      ${size === 'lg' && 'p-2.5 text-base'}
      } ${
        variant === 'primary'
          ? 'bg-ideon-primary-300 dark:bg-ideon-primary-400 text-white focus:ring-ideon-primary-300 dark:focus:ring-ideon-primary-400'
          : 'bg-transparent border-ideon-primary-500 dark:border-gray-600 border focus:ring-ideon-primary-500 dark:focus:ring-ideon-primary-500 dark:text-ideon-light'
      }`}
        onClick={onClick}
        disabled={disabled}
        type={type}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        data-testid={dataTestId}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
