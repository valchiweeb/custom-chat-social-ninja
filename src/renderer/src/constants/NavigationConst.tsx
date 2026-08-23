import { NavigationInterface } from '@renderer/interfaces/NavigationInterface'
import { FaHammer } from 'react-icons/fa'
import { MdHomeFilled } from 'react-icons/md'

export const NavigationConst: NavigationInterface[] = [
  { id: 'home', label: 'Home', icon: <MdHomeFilled size={50} /> },
  { id: 'builder', label: 'Builder', icon: <FaHammer size={50} /> }
]
