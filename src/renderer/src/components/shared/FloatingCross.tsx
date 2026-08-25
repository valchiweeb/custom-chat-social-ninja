import { DecorationType } from '@renderer/types/Decoration'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { Cross, X } from 'lucide-react'
import { ImCross } from 'react-icons/im'
const FloatingCross = ({ item, mouseX }: { item: DecorationType; mouseX: MotionValue<number> }) => {
  const rotation = useTransform(mouseX, (x) => x / item.speed)

  const renderIcon = () => {
    switch (item.type) {
      case 'lucide-x':
        return <X size={item.size} strokeWidth={2.75} absoluteStrokeWidth />
      case 'lucide-cross':
        return <Cross size={item.size} strokeWidth={1} absoluteStrokeWidth />
      case 'im-cross':
      default:
        return <ImCross size={item.size} />
    }
  }

  return (
    <motion.div
      className={`absolute  ${item.opacity}`}
      style={{
        top: item.top,
        right: item.right,
        left: item.left,
        bottom: item.bottom,
        rotate: rotation
      }}
    >
      {renderIcon()}
    </motion.div>
  )
}

export default FloatingCross
