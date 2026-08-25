export type DecorationType = {
  id: number
  type: 'im-cross' | 'lucide-x' | 'lucide-cross' // <-- NEW!
  size: number
  top?: string
  bottom?: string
  left?: string
  right?: string
  speed: number
  opacity: string
}
