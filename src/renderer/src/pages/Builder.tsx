import { fakeMessages } from '@renderer/constants/BuilderConst'
import { useThemeStore } from '@renderer/hooks/useTheme'
import { getThemeCSSVariables } from '@renderer/utils/cssGenerator'

const BuilderPage: React.FC = () => {
  const { theme } = useThemeStore()

  const styleVars = getThemeCSSVariables(theme) as React.CSSProperties

  return (
    <div className="w-full h-full space-y-10" style={styleVars}>
      <div className="border-black border-2 p-5 rounded-3xl">
        <span className="font-sans font-medium">Simulated Chat</span>
      </div>

      <div className="p-5 border-4 border-black rounded-2xl px-20 gap-2 flex flex-col">
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

export default BuilderPage
