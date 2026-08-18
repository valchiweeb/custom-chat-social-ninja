import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'

interface HomeDashboardProps {
  onOpenBuilder: () => void
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ onOpenBuilder }) => {
  const [sessionId, setSessionId] = useState('')

  const handleCopy = (type: string) => {
    if (!sessionId) {
      alert('Masukkan Session ID Social Stream Ninja terlebih dahulu!')
      return
    }

    let url = ''
    if (type === 'chat') {
      url = `http://localhost:3333/overlay?session=${sessionId}&popout=`
    } else {
      url = `http://localhost:3333/overlay?session=${sessionId}&type=${type}`
    }

    navigator.clipboard.writeText(url)
    alert(`Link berhasil di-copy! Paste di OBS Browser Source.`)
  }

  const handleOpenDock = () => {
    if (!sessionId) {
      alert('Masukkan Session ID Social Stream Ninja terlebih dahulu!')
      return
    }
    // @ts-ignore
    if (window.electron) {
      // @ts-ignore
      window.electron.ipcRenderer.send('open-external', `https://socialstream.ninja/dock.html?session=${sessionId}`)
    } else {
      window.open(`https://socialstream.ninja/dock.html?session=${sessionId}`, '_blank')
    }
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f172a',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: '#1e293b',
        padding: '30px',
        borderRadius: '16px',
        width: '450px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '24px', fontSize: '20px' }}>
          Overlay Ruang Visual
        </h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}>
            Session ID Social Stream Ninja
          </label>
          <input
            type="text"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="Contoh: PsGCudEbvR"
            style={{
              width: '100%',
              padding: '12px',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button 
          onClick={handleOpenDock}
          style={{
            width: '100%',
            padding: '12px',
            background: '#fbbf24',
            color: '#1e293b',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '24px',
            transition: 'background 0.2s'
          }}
        >
          Open Dock Comment
        </button>

        <div style={{ marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}>
              Chat Overlay
            </label>
            <select style={{
              width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155',
              borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none'
            }}>
              <option>Custom Style Builder</option>
              <option>AI Style New!</option>
            </select>
          </div>
          <button 
            onClick={() => handleCopy('chat')}
            style={{
              padding: '12px 24px', background: '#fbbf24', color: '#1e293b',
              border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Copy
          </button>
        </div>

        <div style={{ marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}>
              Dock Vertical
            </label>
            <select style={{
              width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155',
              borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none'
            }}>
              <option>Black Purple</option>
            </select>
          </div>
          <button 
            onClick={() => handleCopy('dock-vertical')}
            style={{
              padding: '12px 24px', background: '#fbbf24', color: '#1e293b',
              border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Copy
          </button>
        </div>

        <div style={{ marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}>
              Dock Horizontal
            </label>
            <select style={{
              width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155',
              borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none'
            }}>
              <option>Minimalist Border Style 1</option>
            </select>
          </div>
          <button 
            onClick={() => handleCopy('dock-horizontal')}
            style={{
              padding: '12px 24px', background: '#fbbf24', color: '#1e293b',
              border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Copy
          </button>
        </div>

        <button 
          onClick={onOpenBuilder}
          style={{
            width: '100%',
            padding: '12px',
            background: '#fbbf24',
            color: '#1e293b',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={16} /> Bikin Style Sendiri
        </button>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '10px', marginTop: '24px' }}>
          © Amik Ruang Visual<br/><br/>
          Note: Jika belum punya akses segera hubungi kreator dengan menunjukan bukti pembelian
        </p>
      </div>
    </div>
  )
}

export default HomeDashboard
