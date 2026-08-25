import { useThemeStore } from '@renderer/hooks/useTheme'
import CustomSlider from './shared/Slider'
import Select from './shared/Select'
import CustomCheckbox from './shared/CustomCheckbox'
import { BUILDER_SECTIONS } from '@renderer/constants/BuilderConst'
import { BuilderControl } from '@renderer/interfaces/BuilderInterface'
import { ThemeConfig } from '@renderer/interfaces/ThemeInterface'

const ThemeBuilderPanel = () => {
  const { theme, updateTheme } = useThemeStore()

  const renderControl = (control: BuilderControl) => {
    if (control.condition && !control.condition(theme)) return null

    const value = theme[control.key]

    const onChange = (newValue: string | number | boolean) => {
      updateTheme({ [control.key]: newValue } as Partial<ThemeConfig>)
    }

    switch (control.type) {
      case 'color':
        return (
          <div key={control.key} className="flex flex-col gap-2">
            <label className="font-sans font-semibold">{control.label}</label>
            <div className="flex gap-2 items-end">
              <input
                type="color"
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                className="w-10 h-10 cursor-pointer rounded-md"
              />
              <span className="text-sm font-mono">{value as string}</span>
            </div>
          </div>
        )

      case 'slider':
        return (
          <div key={control.key} className="flex flex-col">
            <CustomSlider
              label={control.key === 'textLimitLines' ? `Max Lines ${value}` : control.label}
              min={control.min}
              max={control.max}
              step={control.step}
              showTicks={control.showTicks}
              value={value as number}
              onChange={onChange}
            />
          </div>
        )

      case 'select':
        return (
          <div key={control.key} className="flex flex-col gap-3">
            <label className="font-sans font-semibold">{control.label}</label>
            <Select
              value={value as string}
              onChange={(e) => onChange(e.target.value)}
              className="p-2 border-2 border-black rounded-md outline-none cursor-pointer"
            >
              {control.options?.map((opt) => (
                <option key={opt.id} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
        )

      case 'checkbox':
        return (
          <div key={control.key}>
            <label className="flex items-start gap-3">
              <CustomCheckbox
                icon={control.icon}
                label={control.label}
                // FIX 3: Assert as boolean
                checked={value as boolean}
                onChange={onChange}
              />
            </label>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-10 h-full overflow-y-auto flex flex-col">
      <div className="space-y-10">
        {BUILDER_SECTIONS.map((section, idx) => (
          <section key={idx} className="space-y-10">
            <h3 className="flex items-end gap-5">
              <span className="p-8 border-4 border-black rounded-full text-5xl">
                {section.icon}
              </span>
              <span className="font-sans text-3xl font-semibold">{section.title}</span>
            </h3>

            <div className="border-2 border-black p-5 flex flex-col gap-7 rounded-2xl">
              {section.controls.map((control) => renderControl(control))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ThemeBuilderPanel
