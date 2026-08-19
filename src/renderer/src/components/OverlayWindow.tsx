import React, { useRef, useEffect } from 'react'
// import { useTheme } from '../context/ThemeContext'
import { generateCSS } from '../utils/cssGenerator'
import { useThemeStore } from '@renderer/hooks/useTheme'

interface OverlayWindowProps {
  style?: React.CSSProperties
}

const OverlayWindow: React.FC<OverlayWindowProps> = ({ style }) => {
  // const { theme } = useTheme()
  const { theme } = useThemeStore()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const injectCSS = (): void => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document
        if (doc) {
          const existingStyle = doc.getElementById('rv-injected-style')
          if (existingStyle) {
            existingStyle.remove()
          }

          const styleEl = doc.createElement('style')
          styleEl.id = 'rv-injected-style'
          styleEl.textContent = generateCSS(theme)
          doc.head.appendChild(styleEl)
        }
      } catch (err) {
        console.error('Error injecting CSS into iframe:', err)
      }
    }

    const handleLoad = (): void => injectCSS()
    iframe.addEventListener('load', handleLoad)
    injectCSS()

    return () => {
      iframe.removeEventListener('load', handleLoad)
    }
  }, [theme])

  if (!theme.sessionId) {
    return (
      <div style={{ color: 'white', padding: 20, fontFamily: 'sans-serif' }}>
        Please enter a Session ID in the main app to view the overlay.
      </div>
    )
  }

  return (
    <iframe
      ref={iframeRef}
      src={`https://socialstream.ninja/chat.html?session=${theme.sessionId}`}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
        display: 'flex',
        border: 'none',
        ...style
      }}
      allow="autoplay; fullscreen"
    />
  )
}

export default OverlayWindow
