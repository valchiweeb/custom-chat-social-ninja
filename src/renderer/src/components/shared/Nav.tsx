import { useUIStore } from '@renderer/hooks/useUIStore'
import { NavigationInterface } from '@renderer/interfaces/NavigationInterface'
import { motion } from 'motion/react'
import { useState } from 'react'

const Nav: React.FC<NavigationInterface> = ({ id, label, icon }) => {
  const [isHovered, setIsHovered] = useState(false)

  const setCurrentView = useUIStore((state) => state.setCurrentView)

  return (
    <div
      className="bg-white px-5 py-5 rounded-full border-black border-4 cursor-pointer transition-colors hover:bg-slate-100"
      onClick={() => setCurrentView(id as 'home' | 'builder')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <div className="text-3xl shrink-0">{icon}</div>

        <motion.div
          initial={{ width: 0, opacity: 0, marginLeft: 0 }}
          animate={{
            width: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
            marginLeft: isHovered ? '12px' : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 20
          }}
          className="overflow-hidden whitespace-nowrap"
        >
          <h1 className="text-4xl font-semibold font-mono">{label}</h1>
        </motion.div>
      </div>
    </div>
  )
}

export default Nav
