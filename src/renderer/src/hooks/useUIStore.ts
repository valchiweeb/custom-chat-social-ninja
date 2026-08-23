import { ViewState } from '@renderer/types/View'
import { create } from 'zustand'

interface UIStore {
  currentView: ViewState
  setCurrentView: (view: ViewState) => void
}
export const useUIStore = create<UIStore>()((set) => ({
  currentView: 'home',
  setCurrentView: (view) => set({ currentView: view })
}))
