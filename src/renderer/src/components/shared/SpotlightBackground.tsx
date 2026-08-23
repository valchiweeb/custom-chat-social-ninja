import { useTransform } from 'motion/react'
import React, { useState, MouseEvent } from 'react'
import { ImCross } from 'react-icons/im'
import { LuCross } from 'react-icons/lu'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import FloatingCross from './FloatingCross'
import { DECORATIONS } from '@renderer/constants/HomeConst'

interface SpotlightBackgroundProps {
  children: React.ReactNode
  className?: string
}

const SpotlightBackground: React.FC<SpotlightBackgroundProps> = ({ children, className = '' }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  const maskImage = useMotionTemplate`radial-gradient(circle 600px at ${mouseX}px ${mouseY}px, black, transparent)`

  return (
    <div onMouseMove={handleMouseMove} className={`relative overflow-hidden ${className}`}>
      <div className="z-1">
        {DECORATIONS.map((item) => (
          <FloatingCross key={item.id} item={item} mouseX={mouseX} />
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #EFEFEF 1.5px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #A9A9A9 1.5px, transparent 0)',
          backgroundSize: '20px 20px',
          maskImage: maskImage,
          WebkitMaskImage: maskImage
        }}
      />

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  )
}

export default SpotlightBackground
