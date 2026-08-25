import React from 'react'
import { Download, Image as ImageIcon, Zap, DollarSign } from 'lucide-react'
import { generateCSS } from '../utils/cssGenerator'
import { useThemeStore } from '@renderer/hooks/useTheme'
import ThemeBuilderPanel from './ThemeBuilderPanel'
import Button from './shared/Button'

const Sidebar: React.FC = () => {
  const { theme, updateTheme, resetTheme } = useThemeStore()

  const handleCopyCSS = (): void => {
    const css = generateCSS(theme)
    navigator.clipboard.writeText(css)
    alert('Custom CSS copied to clipboard! Paste it into OBS Browser Source.')
  }

  return (
    <div className="p-10 h-full  overflow-y-auto flex flex-col">
      <ThemeBuilderPanel />

      <div className="flex flex-col items-center gap-3 p-5 border-t-2 border-black">
        <Button className="text-red-800 bg-white border-2" onClick={resetTheme}>
          Reset
        </Button>
        <Button
          icon={<Download size={20} />}
          className="bg-black text-white border-2 border-black py-5 px-10 text-xl"
          onClick={handleCopyCSS}
        >
          Copy CSS for OBS
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
