import React from 'react'
import { useTheme, AvatarPosition, AnimationType } from '../context/ThemeContext'
import { Download, Palette, Type, Layout, Image as ImageIcon, Zap, DollarSign } from 'lucide-react'
import { generateCSS } from '../utils/cssGenerator'

const Sidebar: React.FC = () => {
  const { theme, updateTheme, resetTheme } = useTheme()

  const handleCopyCSS = (): void => {
    const css = generateCSS(theme)
    navigator.clipboard.writeText(css)
    alert('Custom CSS copied to clipboard! Paste it into OBS Browser Source.')
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Ruang Visual</h2>
        <p>Custom Chat Overlay Builder</p>
      </div>

      <div className="sidebar-content">
        {/* Bubble Styling */}
        <section className="settings-section">
          <h3>
            <Palette size={16} /> Bubble Styling
          </h3>

          <div className="control-group">
            <label>Background Color</label>
            <div className="color-picker-wrap">
              <input
                type="color"
                value={theme.backgroundColor}
                onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
              />
              <span>{theme.backgroundColor}</span>
            </div>
          </div>

          <div className="control-group">
            <label>Background Opacity ({theme.backgroundOpacity})</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={theme.backgroundOpacity}
              onChange={(e) => updateTheme({ backgroundOpacity: parseFloat(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <label>Border Radius ({theme.borderRadius}px)</label>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={theme.borderRadius}
              onChange={(e) => updateTheme({ borderRadius: parseInt(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <label>Border Color</label>
            <input
              type="color"
              value={theme.borderColor}
              onChange={(e) => updateTheme({ borderColor: e.target.value })}
            />
          </div>

          <div className="control-group">
            <label>Glow Color</label>
            <input
              type="color"
              value={theme.glowColor}
              onChange={(e) => updateTheme({ glowColor: e.target.value })}
            />
          </div>

          <div className="control-group">
            <label>Glow Radius ({theme.glowRadius}px)</label>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={theme.glowRadius}
              onChange={(e) => updateTheme({ glowRadius: parseInt(e.target.value) })}
            />
          </div>
        </section>

        {/* Typography */}
        <section className="settings-section">
          <h3>
            <Type size={16} /> Typography
          </h3>

          <div className="control-group">
            <label>Font Family</label>
            <select
              value={theme.fontFamily}
              onChange={(e) => updateTheme({ fontFamily: e.target.value })}
            >
              <option value="'Inter', sans-serif">Inter</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Outfit', sans-serif">Outfit</option>
              <option value="'Poppins', sans-serif">Poppins</option>
              <option value="'Montserrat', sans-serif">Montserrat</option>
            </select>
          </div>

          <div className="control-group">
            <label>Font Size ({theme.fontSize}px)</label>
            <input
              type="range"
              min="10"
              max="32"
              step="1"
              value={theme.fontSize}
              onChange={(e) => updateTheme({ fontSize: parseInt(e.target.value) })}
            />
          </div>

          <div className="control-group">
            <label>Text Color</label>
            <input
              type="color"
              value={theme.textColor}
              onChange={(e) => updateTheme({ textColor: e.target.value })}
            />
          </div>

          <div className="control-group">
            <label>Author Name Color</label>
            <input
              type="color"
              value={theme.authorColor}
              onChange={(e) => updateTheme({ authorColor: e.target.value })}
            />
          </div>
        </section>

        {/* Layout */}
        <section className="settings-section">
          <h3>
            <Layout size={16} /> Layout
          </h3>

          <div className="control-group">
            <label>Avatar Position</label>
            <select
              value={theme.avatarPosition}
              onChange={(e) => updateTheme({ avatarPosition: e.target.value as AvatarPosition })}
            >
              <option value="left">Left Outside</option>
              <option value="right">Right Outside</option>
              <option value="inside">Inside Bubble</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          <div className="control-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={theme.textLimitMode}
                onChange={(e) => updateTheme({ textLimitMode: e.target.checked })}
              />
              Enable Text Limit (Truncate)
            </label>
          </div>

          {theme.textLimitMode && (
            <div className="control-group">
              <label>Max Lines ({theme.textLimitLines})</label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={theme.textLimitLines}
                onChange={(e) => updateTheme({ textLimitLines: parseInt(e.target.value) })}
              />
            </div>
          )}
        </section>

        {/* Badges & Platforms */}
        <section className="settings-section">
          <h3>
            <ImageIcon size={16} /> Badges & Icons
          </h3>

          <div className="control-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={theme.showPlatformIcon}
                onChange={(e) => updateTheme({ showPlatformIcon: e.target.checked })}
              />
              Show Platform Icon
            </label>
          </div>

          <div className="control-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={theme.showBadges}
                onChange={(e) => updateTheme({ showBadges: e.target.checked })}
              />
              Show User Badges
            </label>
          </div>
        </section>

        {/* Animations */}
        <section className="settings-section">
          <h3>
            <Zap size={16} /> Animations
          </h3>
          <div className="control-group">
            <label>Animation Style</label>
            <select
              value={theme.animationType}
              onChange={(e) => updateTheme({ animationType: e.target.value as AnimationType })}
            >
              <option value="slide">Slide In</option>
              <option value="fade">Fade In</option>
              <option value="pop">Pop In</option>
              <option value="none">None</option>
            </select>
          </div>
        </section>

        {/* Donation */}
        <section className="settings-section">
          <h3>
            <DollarSign size={16} /> Donation Highlight
          </h3>
          <div className="control-group">
            <label>Highlight Background</label>
            <input
              type="color"
              value={theme.donationBackgroundColor}
              onChange={(e) => updateTheme({ donationBackgroundColor: e.target.value })}
            />
          </div>
        </section>
      </div>

      <div className="sidebar-footer">
        <button className="btn btn-secondary" onClick={resetTheme}>
          Reset
        </button>
        <button className="btn btn-primary" onClick={handleCopyCSS}>
          <Download size={16} /> Copy CSS for OBS
        </button>
      </div>
    </div>
  )
}

export default Sidebar
