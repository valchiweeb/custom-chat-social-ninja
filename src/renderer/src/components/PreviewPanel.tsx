import React from 'react'
import { getThemeCSSVariables } from '../utils/cssGenerator'
import { useThemeStore } from '@renderer/hooks/useTheme'

const fakeMessages = [
  {
    id: 1,
    author: 'NinjaStreamer',
    text: 'Welcome to the stream guys! Thanks for tuning in.',
    avatar: 'https://i.pravatar.cc/150?u=1',
    platform: 'tiktok',
    isDonation: false,
    badges: ['MOD']
  },
  {
    id: 2,
    author: 'CoolViewer',
    text: 'This UI looks so clean! 🔥',
    avatar: 'https://i.pravatar.cc/150?u=2',
    platform: 'youtube',
    isDonation: false,
    badges: ['VIP']
  },
  {
    id: 3,
    author: 'BigSupporter',
    text: 'Sent a Rose! Keep up the good work bro!',
    avatar: 'https://i.pravatar.cc/150?u=3',
    platform: 'tiktok',
    isDonation: true,
    badges: []
  },
  {
    id: 4,
    author: 'RandomChatter',
    text: 'Hello from Indonesia! 🇮🇩',
    avatar: 'https://i.pravatar.cc/150?u=4',
    platform: 'twitch',
    isDonation: false,
    badges: ['MEMBER']
  },
  {
    id: 5,
    author: 'SpammerGuy',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    avatar: 'https://i.pravatar.cc/150?u=5',
    platform: 'youtube',
    isDonation: false,
    badges: []
  }
]

const PreviewPanel: React.FC = () => {
  const { theme } = useThemeStore()

  // Apply theme variables dynamically to this container only
  const styleVars = getThemeCSSVariables(theme) as React.CSSProperties

  return (
    <div className="preview-panel" style={styleVars}>
      <div className="preview-header">
        <h3>Live Preview</h3>
        <span className="badge">Simulated Chat</span>
      </div>

      <div className="chat-container">
        {fakeMessages.map((msg, index) => (
          <div
            key={msg.id}
            className={`chat-item animation-${theme.animationType} ${msg.isDonation ? 'is-donation' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="hl-firstline">
              {theme.avatarPosition !== 'hidden' && (
                <img
                  className={`chat-avatar avatar-${theme.avatarPosition}`}
                  src={msg.avatar}
                  alt="avatar"
                />
              )}
              <span className="hl-name">{msg.author}</span>

              {theme.showBadges &&
                msg.badges.map((badge) => (
                  <span key={badge} className={`chat-badge badge-${badge.toLowerCase()}`}>
                    {badge}
                  </span>
                ))}

              {theme.showPlatformIcon && (
                <span className={`platform-icon icon-${msg.platform}`}>
                  {msg.platform === 'tiktok' && '🎵'}
                  {msg.platform === 'youtube' && '▶️'}
                  {msg.platform === 'twitch' && '🟪'}
                </span>
              )}
            </div>

            <div className={theme.textLimitMode ? 'truncate-text' : ''}>
              <div className="hl-message">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PreviewPanel
