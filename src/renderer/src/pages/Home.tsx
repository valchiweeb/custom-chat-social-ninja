import Button from '@renderer/components/shared/Button'
import Nav from '@renderer/components/shared/Nav'
import Select from '@renderer/components/shared/Select'
import SpotlightBackground from '@renderer/components/shared/SpotlightBackground'
import { overlayConfigs } from '@renderer/constants/HomeConst'
import { NavigationConst } from '@renderer/constants/NavigationConst'
import { useUIStore } from '@renderer/hooks/useUIStore'
import { Copy, FileCode2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { BiSolidCommentDetail } from 'react-icons/bi'
import { FaCopy } from 'react-icons/fa'
import { PiMonitorFill } from 'react-icons/pi'

const HomePage = () => {
  const [sessionId, setSessionId] = useState<string>('')

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
    <SpotlightBackground className=" min-h-screen gap-15 flex flex-col bg-slate-50 p-16 ">
      <div className=" pb-2 space-y-2 mb-10">
        <h1 className="font-fugaz text-5xl text-black tracking-wide">Ruang Visual</h1>
        <h1 className="font-fugaz text-5xl text-olive-200 tracking-wide">Visual Room</h1>
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

      <div className="flex-1 flex justify-between h-full items-start gap-6 w-full  mx-auto">
        <div className="grid   grid-cols-1 w-full items-center gap-5">
          {/* left section */}
          {overlayConfigs.map((config) => (
            <div
              key={config.id}
              className="flex flex-col items-end gap-10 w-full  border-l-2 border-white/50 bg-[#FB844C]  p-10 rounded-4xl"
            >
              <div className="flex justify-between w-full items-start">
                <label className="block text-slate-800 text-xl mb-2  bg-[#ED743B]  font-sans px-6 py-4 rounded-4xl font-medium">
                  {config.label}
                </label>

                <div className="bg-[#ED743B] p-8 border-black border-4 rounded-full text-black">
                  {config.rightIcon}
                </div>
              </div>

              <div className="flex items-center w-full gap-5">
                <Select
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
                  className="bg-[#FFB54A] border-2 border-black hover:bg-[#8f5200] p-0 w-14 h-14 flex-shrink-0"
                >
                  <div className="bg-white border-2 border-black p-2 rounded-md flex items-center justify-center">
                    <FaCopy size={18} className="text-black" />
                  </div>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full justify-between items-end gap-20">
          <div className="flex gap-5">
            {NavigationConst.map((nav) => (
              <Nav key={nav.id} id={nav.id} label={nav.label} icon={nav.icon} />
            ))}
          </div>

          <div className="flex p-10 gap-12 border-white/40 border-r-2 flex-col w-full   bg-[#F5ED30] rounded-4xl">
            <div className="flex justify-between items-center">
              <label className="block text-slate-800 text-xl bg-[#EAE62C] px-6 py-4 rounded-4xl font-medium font-sans">
                Session ID Social Stream Ninja
              </label>
              <div className="bg-[#EAE62C] p-8 border-black border-4 rounded-full text-black">
                <PiMonitorFill size={25} />
              </div>
            </div>
            <div className="w-full space-y-3">
              <input
                type="text"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className=" border-2 border-black p-5 text-black w-full   bg-[#EAE62C] rounded-3xl"
                placeholder="Contoh: PsGCudEbvR"
              />

              <Button
                variant="primary"
                onClick={handleOpenDock}
                className="border-2 border-black bg-black p-2 w-full text-white rounded-full"
              >
                <div className="bg-white border-2 border-black p-2 rounded-md flex items-center justify-center">
                  <BiSolidCommentDetail size={18} className="text-black" />
                </div>
                Open Dock Comment
              </Button>
            </div>
          </div>
        </div>

        {/* <p style={{ textAlign: 'center', color: '#64748b', fontSize: '10px', marginTop: '24px' }}> */}
        {/*   © Amik Ruang Visual */}
        {/*   <br /> */}
        {/*   <br /> */}
        {/*   Note: Jika belum punya akses segera hubungi kreator dengan menunjukan bukti pembelian */}
        {/* </p> */}
      </div>
    </SpotlightBackground>
  )
}

export default HomePage
