import { cn } from '@renderer/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'copy'
  fullWidth?: boolean
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => {
  const baseClasses =
    'flex items-center justify-center gap-2  rounded-lg font-bold cursor-pointer transition-colors duration-200'

  const variantClasses = {
    primary: 'bg-amber-400 hover:bg-amber-500 text-slate-800',
    copy: 'bg-amber-400 hover:bg-amber-500 text-slate-800'
  }

  const sizeClasses = {
    primary: 'p-3 text-sm',
    copy: 'py-3 px-6 text-sm'
  }

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[variant],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}

export default Button
