import { defaultTheme, ThemeConfig } from '@renderer/interfaces/ThemeInterface'
import { generateCSS } from '@renderer/utils/cssGenerator'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ThemeStore {
  theme: ThemeConfig
  updateTheme: (updates: Partial<ThemeConfig>) => void
  exportTheme: () => string
  importTheme: (jsonStr: string) => void
  resetTheme: () => void
}
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: defaultTheme,

      updateTheme: (updates) =>
        set((state) => ({
          theme: { ...state.theme, ...updates }
        })),

      exportTheme: () => {
        return JSON.stringify(get().theme, null, 2)
      },

      importTheme: (jsonStr: string) => {
        try {
          const parsed = JSON.parse(jsonStr)
          set({ theme: { ...defaultTheme, ...parsed } })
          return true
        } catch (err) {
          console.error('Invalid JSON theme format:', err)
          return false
        }
      },

      resetTheme: () => set({ theme: defaultTheme })
    }),
    {
      name: 'rv_theme_v2',
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<ThemeStore> | undefined
        return {
          ...currentState,
          ...persisted,
          theme: {
            ...defaultTheme,
            ...(persisted?.theme || {})
          }
        }
      }
    }
  )
)

useThemeStore.subscribe((state) => {
  const css = generateCSS(state.theme)
  if (window.electron?.ipcRenderer) {
    window.electron.ipcRenderer.send('update-css', css)
  }
})
