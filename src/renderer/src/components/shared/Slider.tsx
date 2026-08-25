interface CustomSliderProps {
  label: string
  value: number
  min?: number
  max?: number
  step?: number
  showTicks?: boolean
  onChange: (value: number) => void
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  showTicks = false,
  onChange
}) => {
  const tickCount = Math.round((max - min) / step) + 1

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-slate-800 tracking-wide">{label}</label>
        <div className="bg-slate-200 px-3 py-1 rounded-md border-2 border-black">
          <span className="text-xs font-mono font-bold text-black">{value}</span>
        </div>
      </div>

      <div className="relative w-full h-3 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            absolute z-10 w-full h-6 bg-slate-200 appearance-none cursor-pointer outline-none border-2 border-black
            overflow-hidden

            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-8
            [&::-webkit-slider-thumb]:bg-[#F4DF9A]
            [&::-webkit-slider-thumb]:shadow-[-10000px_0_0_10000px_#000000]

            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-8
            [&::-moz-range-thumb]:bg-black
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-progress]:bg-[#F4DF9A]
          [&::-moz-range-progress]:h-3
            [&::-moz-range-progress]:rounded-l-full
          "
        />

        {showTicks && (
          <div className="absolute z-20 w-full flex justify-between px-2 pointer-events-none">
            {Array.from({ length: tickCount }).map((_, i) => (
              <div key={i} className="w-[2px] h-1.5 bg-black/20 rounded-full" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomSlider
