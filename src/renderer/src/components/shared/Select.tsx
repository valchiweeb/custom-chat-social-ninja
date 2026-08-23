import { ChevronDown } from 'lucide-react'
import { PiMonitorFill } from 'react-icons/pi'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  leftIcon?: React.ReactNode
  labelIcon?: React.ReactNode
  fullWidth?: boolean
}

const Select: React.FC<SelectProps> = ({
  label,
  leftIcon,
  labelIcon,
  fullWidth = true,
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''} ${className}`}>
      <div className="flex justify-between w-full items-start">
        {label && (
          <label className="block text-slate-800 text-xl mb-2  bg-[#ED743B]  font-sans px-6 py-4 rounded-4xl font-medium">
            {label}
          </label>
        )}

        {labelIcon && (
          <div className="bg-[#ED743B] p-8 border-black border-4 rounded-full text-black">
            {labelIcon}
          </div>
        )}
      </div>
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
