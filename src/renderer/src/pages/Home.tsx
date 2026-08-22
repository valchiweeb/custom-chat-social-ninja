import Button from '@renderer/components/shared/Button'
import Select from '@renderer/components/shared/Select'
import { overlayConfigs } from '@renderer/constants/HomeConst'
import { useUIStore } from '@renderer/hooks/useUIStore'
import { Copy, FileCode2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { FaCopy } from 'react-icons/fa'

const HomePage = () => {
  const [sessionId, setSessionId] = useState<string>('')

  const setCurrentView = useUIStore((state) => state.setCurrentView)

  const handleCopy = (tye: string) => {
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
    if (window.electron) {
      window.electron.ipcRenderer.send(
        'open-external',
        `https://socialstream.ninja/dock.html?session=${sessionId}`
      )
    } else {
      window.open(`https://socialstream.ninja/dock.html?session=${sessionId}`, '_blank')
    }
  }

  return (
    <div className=" bg-white p-20">
      <div className="mb-20 w-[45%] border-b border-gray-400 pb-2">
        <h1 className="font-fugaz text-5xl text-black tracking-wide">Ruang Visual</h1>
      </div>

      <div className="flex min-h-screen justify-center items-start ">
        <div className="grid border-2 border-black p-10  grid-cols-1 border-dashed w-full items-center gap-10">
          {/* left section */}
          {overlayConfigs.map((config) => (
            <div key={config.id} className="flex items-end gap-4 w-full">
              <Select
                label={config.label}
                leftIcon={<FileCode2 size={20} />}
                onChange={(e) => console.log(`${config.label} Selected:`, e.target.value)}
              >
                {config.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>

              <Button
                variant="copy"
                onClick={() => handleCopy(config.id)}
                className="bg-[#B26600] border-2 border-black hover:bg-[#8f5200] p-0 w-14 h-14 flex-shrink-0"
              >
                <div className="bg-white border-2 border-black p-2 rounded-md flex items-center justify-center">
                  <FaCopy size={18} className="text-black" />
                </div>
              </Button>
            </div>
          ))}
        </div>

        <div className="">
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}
            >
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
        </div>
        {/* <Button */}
        {/*   className="bg-white" */}
        {/*   fullWidth={true} */}
        {/*   variant="primary" */}
        {/*   onClick={() => setCurrentView('builder')} */}
        {/*   icon={<Sparkles size={16} />} */}
        {/* > */}
        {/*   Bikin Style Sendiri */}
        {/* </Button> */}
        {/**/}
        {/* <p style={{ textAlign: 'center', color: '#64748b', fontSize: '10px', marginTop: '24px' }}> */}
        {/*   © Amik Ruang Visual */}
        {/*   <br /> */}
        {/*   <br /> */}
        {/*   Note: Jika belum punya akses segera hubungi kreator dengan menunjukan bukti pembelian */}
        {/* </p> */}
      </div>
    </div>
  )
}

export default HomePage
