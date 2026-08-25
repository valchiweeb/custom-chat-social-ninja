import { ThemeConfig } from './ThemeInterface'

export interface BuilderControl {
  type: 'color' | 'slider' | 'select' | 'checkbox'
  label: string
  key: keyof ThemeConfig
  min?: number
  max?: number
  step?: number
  showTicks?: boolean
  options?: { id: number; label: string; value: string }[]
  icon?: React.ReactNode

  condition?: (theme: ThemeConfig) => boolean
}

export interface BuilderSection {
  title: string
  icon: React.ReactNode
  controls: BuilderControl[]
}
