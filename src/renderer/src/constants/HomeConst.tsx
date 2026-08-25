import { OverlayConfig } from '@renderer/interfaces/OverlayInterface'
import { DecorationType } from '@renderer/types/Decoration'
import { FaGripHorizontal, FaGripVertical } from 'react-icons/fa'
import { IoMdChatbubbles } from 'react-icons/io'

export const overlayConfigs: OverlayConfig[] = [
  {
    id: 'chat',
    label: 'Chat Overlay',
    options: [
      { value: 'builder', label: 'Custom CSS Builder' },
      { value: 'ai', label: 'AI Style New!' }
    ],
    rightIcon: <IoMdChatbubbles />
  },
  {
    id: 'dock-vertical',
    label: 'Dock Vertical',
    options: [{ value: 'black-purple', label: 'Black Purple' }],
    rightIcon: <FaGripVertical />
  },
  {
    id: 'dock-horizontal',
    label: 'Dock Horizontal',
    options: [{ value: 'minimalist-1', label: 'Minimalist Border Style 1' }],
    rightIcon: <FaGripHorizontal />
  }
]

export const DECORATIONS: DecorationType[] = [
  {
    id: 1,
    type: 'im-cross',
    size: 100,
    top: '10%',
    right: '24%',
    speed: 70,
    opacity: 'opacity-100'
  },
  {
    id: 2,
    type: 'lucide-x',
    size: 60,
    top: '75%',
    left: '55%',
    speed: -40,
    opacity: 'opacity-100'
  },
  {
    id: 3,
    type: 'lucide-cross',
    size: 25,
    bottom: '20%',
    right: '30%',
    speed: 90,
    opacity: 'opacity-100'
  },

  {
    id: 4,
    type: 'im-cross',
    size: 100,
    top: '6%',
    right: '20%',
    speed: 70,
    opacity: 'opacity-10'
  }
]
