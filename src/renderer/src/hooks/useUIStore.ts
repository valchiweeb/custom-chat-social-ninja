import { create } from 'zustand'

interface UIStore {
  currentView: 'home' | 'builder'
  setCurrentView: (view: 'home' | 'builder') => void
}
export const useUIStore = create<UIStore>()((set) => ({
  currentView: 'home',
  setCurrentView: (view) => set({ currentView: view })
}))
