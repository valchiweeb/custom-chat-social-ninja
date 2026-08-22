import { ChevronDown } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  leftIcon?: React.ReactNode
  fullWidth?: boolean
}

const Select: React.FC<SelectProps> = ({
  label,
  leftIcon,
  fullWidth = true,
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && <label className="block text-slate-800 text-xl mb-2 font-sans">{label}</label>}

      <div className="relative flex items-center bg-[#1c1c1c] rounded-xl p-2 border border-black/50 shadow-md">
        {leftIcon && (
          <div className="bg-white text-black rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
            {leftIcon}
          </div>
        )}

        <select
          className={`
            flex-1 appearance-none bg-transparent text-white font-bold text-lg outline-none cursor-pointer py-2
            ${leftIcon ? 'pl-4' : 'pl-2'} pr-14
          `}
          {...props}
        >
          {children}
        </select>

        <div className="absolute right-2 bg-white text-black rounded-lg w-10 h-10 flex items-center justify-center pointer-events-none">
          <ChevronDown size={20} strokeWidth={3} />
        </div>
      </div>
    </div>
  )
}

export default Select
