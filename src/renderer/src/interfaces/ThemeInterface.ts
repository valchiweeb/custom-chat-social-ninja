import { AnimationType, AvatarPosition } from '@renderer/context/ThemeContext'

export interface ThemeConfig {
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
  animationSpeed: number

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

export interface ThemeStoreType {
  theme: ThemeConfig
  updateTheme: (updates: Partial<ThemeConfig>) => void
  exportTheme: () => string
  importTheme: (jsonStr: string) => void
  resetTheme: () => void
}
