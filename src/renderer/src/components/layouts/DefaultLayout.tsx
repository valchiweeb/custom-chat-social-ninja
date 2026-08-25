import { NavigationConst } from '@renderer/constants/NavigationConst'
import SpotlightBackground from '../shared/SpotlightBackground'
import Nav from '../shared/Nav'

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <SpotlightBackground className="min-h-screen flex flex-col bg-slate-50 p-16">
      <div className="flex justify-between items-start mb-10 w-full mx-auto">
        <div className="pb-2 space-y-2 cursor-default">
          <h1 className="font-fugaz text-5xl text-black tracking-wide">Visual Room</h1>
          <h1 className="font-fugaz text-9xl text-gray-200 tracking-wide">Visual Room</h1>
        </div>

        <div className="flex gap-5 z-50">
          {NavigationConst.map((nav) => (
            <Nav key={nav.id} id={nav.id} label={nav.label} icon={nav.icon} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex justify-between h-full items-start gap-6 w-full mx-auto">
        {children}
      </div>
    </SpotlightBackground>
  )
}

export default DefaultLayout
