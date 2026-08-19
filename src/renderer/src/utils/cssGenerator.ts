import { ThemeConfig } from '@renderer/interfaces/ThemeInterface'

/**
 * Returns React inline style variables mapped from the theme config
 */
export const getThemeCSSVariables = (theme: ThemeConfig): Record<string, string> => {
  return {
    '--rv-bg-color': hexToRgba(theme.backgroundColor, theme.backgroundOpacity),
    '--rv-border-radius': `${theme.borderRadius}px`,
    '--rv-border-color': theme.borderColor,
    '--rv-border-width': `${theme.borderWidth}px`,
    '--rv-glow-color': theme.glowColor,
    '--rv-glow-radius': `${theme.glowRadius}px`,

    '--rv-font-family': theme.fontFamily,
    '--rv-font-size': `${theme.fontSize}px`,
    '--rv-text-color': theme.textColor,
    '--rv-author-color': theme.authorColor,

    '--rv-avatar-size': `${theme.avatarSize}px`,

    '--rv-vip-color': theme.vipColor,
    '--rv-mod-color': theme.modColor,
    '--rv-member-color': theme.memberColor,

    '--rv-donation-bg': theme.donationBackgroundColor,
    '--rv-donation-text': theme.donationTextColor,

    '--rv-text-lines': theme.textLimitMode ? theme.textLimitLines.toString() : '999',

    '--rv-anim-speed': `${theme.animationSpeed}ms`
  }
}

/**
 * Helper to convert HEX + opacity to rgba()
 */
const hexToRgba = (hex: string, opacity: number): string => {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (isNaN(r)) {
    // 3 digit hex
    r = parseInt(hex.slice(1, 2) + hex.slice(1, 2), 16)
    g = parseInt(hex.slice(2, 3) + hex.slice(2, 3), 16)
    b = parseInt(hex.slice(3, 4) + hex.slice(3, 4), 16)
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * Generates the raw Custom CSS string that users can inject into OBS/Social Stream Ninja.
 * This overrides Social Stream Ninja's default chat classes.
 */
export const generateCSS = (theme: ThemeConfig): string => {
  const vars = getThemeCSSVariables(theme)

  // Format variables into string
  const cssVars = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')

  return `/*
* Custom Chat Overlay - Ruang Visual
* Generated for Social Stream Ninja
*/

:root {
${cssVars}
  /* SSN Native Fallback Variables */
  --comment-color: var(--rv-text-color) !important;
  --comment-bg-color: var(--rv-bg-color) !important;
  --comment-border-radius: var(--rv-border-radius) !important;
  --comment-font-size: var(--rv-font-size) !important;
  --author-bg-color: transparent !important;
  --author-font-size: calc(var(--rv-font-size) - 1px) !important;
  --author-color: var(--rv-author-color) !important;
  --font-family: var(--rv-font-family) !important;
}

/* Base resets for SSN chat container */
body {
  background-color: transparent !important;
  overflow: hidden;
  margin: 0;
  padding: 10px;
}

#chat-container, .chat-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

/* Bubble Wrapper (SSN Outer Container) */
.chat-bubble, .chat-item, .hl-message, .message-donation, .is-donation, #highlighted-message-container, #highlighted-message {
  background: var(--rv-bg-color) !important;
  border: var(--rv-border-width) solid var(--rv-border-color) !important;
  border-radius: var(--rv-border-radius) !important;
  box-shadow: 0 0 var(--rv-glow-radius) var(--rv-glow-color) !important;
  padding: 12px 16px !important;
  margin-bottom: 12px !important;
  display: flex !important;
  flex-direction: column !important;
  position: relative !important;
  box-sizing: border-box !important;
  width: auto !important;
  max-width: fit-content !important;
  overflow: visible !important;
  animation: rvAnim var(--rv-anim-speed) ease-out forwards;
}

/* Reset SSN native inner backgrounds */
.hl-message, .hl-firstline {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* Header Container */
.chat-header, .hl-firstline, .message-header {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  margin-bottom: 4px !important;
}

/* Author Name */
.chat-author, .author-name, .hl-name, .message-name {
  color: var(--rv-author-color) !important;
  font-weight: 700 !important;
  font-size: calc(var(--rv-font-size) - 1px) !important;
  letter-spacing: 0.2px !important;
  margin: 0 !important;
}

/* Message Text */
.chat-text, .hl-message {
  color: var(--rv-text-color) !important;
  font-size: var(--rv-font-size) !important;
  line-height: 1.4 !important;
  word-break: break-word !important;
}

/* Avatars */
.chat-avatar, .chat-item img.avatar, .chat-item img.profile-pic, .hl-profile-pic, #hl-profile-pic, img.profile-pic, img.avatar, .chat-avatar img {
  width: var(--rv-avatar-size) !important;
  height: var(--rv-avatar-size) !important;
  max-width: var(--rv-avatar-size) !important;
  max-height: var(--rv-avatar-size) !important;
  border-radius: 50% !important;
  object-fit: cover !important;
  flex-shrink: 0 !important;
  display: block !important;
}
.chat-avatar {
  overflow: hidden !important;
}

${
  theme.avatarPosition === 'hidden'
    ? `
.chat-avatar, .chat-item img.avatar, .chat-item img.profile-pic {
  display: none !important;
}
`
    : ''
}

${
  theme.avatarPosition === 'left'
    ? `
body { padding-left: ${theme.avatarSize + 30}px !important; }
.chat-avatar, .chat-item img.avatar, .chat-item img.profile-pic, .hl-profile-pic, #hl-profile-pic, img.profile-pic, img.avatar, .chat-avatar img {
  position: absolute !important;
  left: -${theme.avatarSize + 10}px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
}
.chat-bubble::before, .chat-item::before, #highlighted-message-container::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid var(--rv-bg-color);
}
/* Disable absolute positioning and tail for donations so it forms a neat capsule */
.is-donation .chat-avatar, .is-donation img.avatar, .is-donation img.profile-pic, .message-donation img, .is-donation .chat-avatar img {
  position: static !important;
  transform: none !important;
  margin-right: 10px !important;
}
.is-donation::before, .message-donation::before {
  display: none !important;
}
.chat-bubble, .chat-item, .hl-message, .message-donation, .is-donation, #highlighted-message-container, #highlighted-message {
  margin-left: ${theme.avatarSize + 20}px !important;
}
`
    : ''
}

${
  theme.avatarPosition === 'right'
    ? `
body { padding-right: ${theme.avatarSize + 30}px !important; }
.chat-avatar, .chat-item img.avatar, .chat-item img.profile-pic, .hl-profile-pic, #hl-profile-pic, img.profile-pic, img.avatar, .chat-avatar img {
  position: absolute !important;
  right: -${theme.avatarSize + 10}px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
}
.chat-bubble, .chat-item, .hl-message, .message-donation, .is-donation, #highlighted-message-container, #highlighted-message {
  margin-right: ${theme.avatarSize + 20}px !important;
}
`
    : ''
}

${
  theme.avatarPosition === 'inside'
    ? `
/* No extra positioning needed, flex handles it */
`
    : ''
}

/* Text Truncate */
${
  theme.textLimitMode
    ? `
.truncate-text .chat-text, .truncate-text .hl-message {
  display: -webkit-box !important;
  -webkit-line-clamp: ${theme.textLimitLines} !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
`
    : ''
}

/* Badges */
.chat-badge, .badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
}

.badge-vip { background: var(--rv-vip-color); color: #000; }
.badge-mod { background: var(--rv-mod-color); color: #000; }
.badge-member { background: var(--rv-member-color); color: #000; }

${
  !theme.showBadges
    ? `
.chat-badge, .badge { display: none !important; }
`
    : ''
}
${
  !theme.showPlatformIcon
    ? `
.platform-icon, img.chat-icon, .icon { display: none !important; }
`
    : `
.platform-icon, img.chat-icon, .icon {
  width: 16px !important;
  height: 16px !important;
  border-radius: 0 !important;
  position: absolute !important;
  top: 12px !important;
  right: 12px !important;
  transform: none !important;
}
`
}

/* Donation Highlights */
.is-donation, .message-donation, .is-donation .chat-bubble {
  background: var(--rv-donation-bg) !important;
  border-color: var(--rv-donation-bg) !important;
  border-radius: 999px !important;
  flex-direction: row !important;
  align-items: center !important;
  padding: 8px 16px !important;
}
.is-donation .chat-text, .is-donation .chat-author, .message-donation .chat-text, .message-donation .chat-author, .message-donation .hl-message, .message-donation .hl-name {
  color: var(--rv-donation-text) !important;
}

/* Animations */
@keyframes rvAnim {
  0% {
    opacity: 0;
    ${theme.animationType === 'slide' ? 'transform: translateX(30px);' : ''}
    ${theme.animationType === 'pop' ? 'transform: scale(0.8);' : ''}
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
`
}
