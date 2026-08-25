import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import PreviewPanel from './components/PreviewPanel'
import '../src/assets/main.css'
import '@fontsource/fugaz-one'
import '@fontsource/work-sans'
import { useUIStore } from './hooks/useUIStore'
import HomePage from './pages/Home'
import DefaultLayout from './components/layouts/DefaultLayout'
import BuilderPage from './pages/Builder'

function App(): React.JSX.Element {
  const currentView = useUIStore((state) => state.currentView)

  return (
    <DefaultLayout>
      {currentView === 'home' ? (
        <HomePage />
      ) : (
        <div className="flex w-full h-[100vh] gap-6 bg-white/60 backdrop-blur-md rounded-4xl border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <Sidebar />
          <main className="flex-1 p-6 relative w-full">
            <BuilderPage />
          </main>
        </div>
      )}
    </DefaultLayout>
  )
}

export default App
