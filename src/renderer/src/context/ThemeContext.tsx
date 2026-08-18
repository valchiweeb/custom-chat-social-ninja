/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { generateCSS } from '../utils/cssGenerator'

export type AvatarPosition = 'inside' | 'left' | 'right' | 'hidden'
export type AnimationType = 'fade' | 'slide' | 'pop' | 'none'

export interface ThemeConfig {
  // Bubble Styling
  backgroundColor: string
  backgroundOpacity: number
  borderRadius: number
  borderColor: string
  borderWidth: number
  glowColor: string
  glowRadius: number

  // Typography
  fontFamily: string
  sessionId: string
  fontSize: number
  textColor: string
  authorColor: string

  // Layout
  avatarPosition: AvatarPosition
  avatarSize: number
  textLimitMode: boolean
  textLimitLines: number

  // Labels & Badges
  showBadges: boolean
  vipColor: string
  modColor: string
  memberColor: string

  // Platforms
  showPlatformIcon: boolean

  // Animation
  animationType: AnimationType
  animationSpeed: number // in ms

  // Donation Highlight
  donationBackgroundColor: string
  donationTextColor: string
}

export const defaultTheme: ThemeConfig = {
  backgroundColor: '#ffffff',
  backgroundOpacity: 1,
  borderRadius: 16,
  borderColor: '#ffffff',
  borderWidth: 0,
  glowColor: '#000000',
  glowRadius: 10,

  fontFamily: 'Inter, sans-serif',
  sessionId: '',
  fontSize: 15,
  textColor: '#1f2937',
  authorColor: '#111827',

  avatarPosition: 'left',
  avatarSize: 36,
  textLimitMode: false,
  textLimitLines: 3,

  showBadges: true,
  vipColor: '#fbbf24',
  modColor: '#34d399',
  memberColor: '#60a5fa',

  showPlatformIcon: true,

  animationType: 'slide',
  animationSpeed: 300,

  donationBackgroundColor: '#fbbf24',
  donationTextColor: '#000000'
}

interface ThemeContextType {
  theme: ThemeConfig
  updateTheme: (updates: Partial<ThemeConfig>) => void
  exportTheme: () => string
  importTheme: (jsonStr: string) => void
  resetTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('rv_theme_v2')
    if (saved) {
      try {
        return { ...defaultTheme, ...JSON.parse(saved) }
      } catch {
        return defaultTheme
      }
    }
    return defaultTheme
  })

  useEffect(() => {
    localStorage.setItem('rv_theme_v2', JSON.stringify(theme))

    // Send updated CSS to the main process proxy server
    const css = generateCSS(theme)
    // @ts-ignore
    if (window.electron) {
      // @ts-ignore
      window.electron.ipcRenderer.send('update-css', css)
    }
  }, [theme])

  const updateTheme = (updates: Partial<ThemeConfig>): void => {
    setTheme((prev) => ({ ...prev, ...updates }))
  }

  const exportTheme = (): string => {
    return JSON.stringify(theme, null, 2)
  }

  const importTheme = (jsonStr: string): void => {
    try {
      const parsed = JSON.parse(jsonStr)
      setTheme({ ...defaultTheme, ...parsed })
    } catch {
      console.error('Invalid JSON theme format')
    }
  }

  const resetTheme = (): void => {
    setTheme(defaultTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, exportTheme, importTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
