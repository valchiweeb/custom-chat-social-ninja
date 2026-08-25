interface CustomCheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  icon?: React.ReactNode
}

const DefaultCheckIcon = () => (
  <svg
    className="w-full h-full p-1"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  icon = <DefaultCheckIcon />
}) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />

        <div className="w-full h-full border-2 border-black rounded-md bg-white peer-checked:bg-black transition-colors duration-200"></div>

        <div className="absolute inset-0 opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center justify-center text-white">
          {icon}
        </div>
      </div>

      <span className="text-sm font-semibold text-slate-800 tracking-wide group-hover:text-black transition-colors">
        {label}
      </span>
    </label>
  )
}

export default CustomCheckbox
