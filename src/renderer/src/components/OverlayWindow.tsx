import React, { useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { generateCSS } from '../utils/cssGenerator'

interface OverlayWindowProps {
  style?: React.CSSProperties
}

const OverlayWindow: React.FC<OverlayWindowProps> = ({ style }) => {
  const { theme } = useTheme()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const injectCSS = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document
        if (doc) {
          // Remove existing injected style if any
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

    const handleLoad = () => injectCSS()
    iframe.addEventListener('load', handleLoad)
    
    // Attempt injection immediately in case it's already loaded
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
      style={{ width: '100%', height: '100%', background: 'transparent', display: 'flex', border: 'none', ...style }}
      allow="autoplay; fullscreen"
    />
  )
}

export default OverlayWindow
