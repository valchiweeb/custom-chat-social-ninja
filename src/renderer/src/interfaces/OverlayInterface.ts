export interface OverlayConfig {
  id: string
  label: string
  options: { value: string; label: string }[]
  rightIcon?: React.ReactNode
}
