import React, { useState } from 'react'
// import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import PreviewPanel from './components/PreviewPanel'
import HomeDashboard from './components/HomeDashboard'

function App(): React.JSX.Element {
  const [currentView, setCurrentView] = useState<'home' | 'builder'>('home')

  if (currentView === 'home') {
    return <HomeDashboard onOpenBuilder={() => setCurrentView('builder')} />
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
          ← Back to Home
        </button>
      </main>
    </div>
  )
}

export default App
