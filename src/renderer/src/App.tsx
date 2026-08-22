import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import PreviewPanel from './components/PreviewPanel'
import '../src/assets/main.css'
import '@fontsource/fugaz-one'
import '@fontsource/work-sans'
import { useUIStore } from './hooks/useUIStore'
import HomePage from './pages/Home'

function App(): React.JSX.Element {
  const currentView = useUIStore((state) => state.currentView)
  const setCurrentView = useUIStore((state) => state.setCurrentView)

  if (currentView === 'home') {
    return <HomePage />
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <PreviewPanel />
        <button
          onClick={() => setCurrentView('home')}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid var(--border-color)',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 100
          }}
        >
          Back to Home
        </button>
      </main>
    </div>
  )
}

export default App
