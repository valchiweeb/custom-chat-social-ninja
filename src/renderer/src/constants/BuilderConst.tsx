import { BuilderSection } from '@renderer/interfaces/BuilderInterface'
import { DollarSign, ImageIcon, Layout, Palette, Type, Zap } from 'lucide-react'
import { FaTextHeight } from 'react-icons/fa'
import { HiMiniSquare3Stack3D } from 'react-icons/hi2'
import { MdBadge } from 'react-icons/md'

export const fakeMessages = [
  {
    id: 1,
    author: 'NinjaStreamer',
    text: 'Welcome to the stream guys! Thanks for tuning in.',
    avatar: 'https://i.pravatar.cc/150?u=1',
    platform: 'tiktok',
    isDonation: false,
    badges: ['MOD']
  },
  {
    id: 2,
    author: 'CoolViewer',
    text: 'This UI looks so clean! 🔥',
    avatar: 'https://i.pravatar.cc/150?u=2',
    platform: 'youtube',
    isDonation: false,
    badges: ['VIP']
  },
  {
    id: 3,
    author: 'BigSupporter',
    text: 'Sent a Rose! Keep up the good work bro!',
    avatar: 'https://i.pravatar.cc/150?u=3',
    platform: 'tiktok',
    isDonation: true,
    badges: []
  },
  {
    id: 4,
    author: 'RandomChatter',
    text: 'Hello from Indonesia! 🇮🇩',
    avatar: 'https://i.pravatar.cc/150?u=4',
    platform: 'twitch',
    isDonation: false,
    badges: ['MEMBER']
  },
  {
    id: 5,
    author: 'SpammerGuy',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    avatar: 'https://i.pravatar.cc/150?u=5',
    platform: 'youtube',
    isDonation: false,
    badges: []
  }
]

export const optionValuesFontFamily = [
  { id: 1, label: 'Inter', value: "'Inter', sans-serif" },
  { id: 2, label: 'Outfit', value: "'Outfit', sans-serif" },
  { id: 3, label: 'Roboto', value: "'Roboto', sans-serif" },
  { id: 4, label: 'Poppins', value: "'Poppins', sans-serif" },
  { id: 5, label: 'Montserrat', value: "'Montserrat', sans-serif" }
]

export const optionValuesAvatarPosition = [
  { id: 1, label: 'Left Outside', value: 'left' },
  { id: 2, label: 'Right Outside', value: 'right' },
  { id: 3, label: 'Inside Bubble', value: 'inside' },
  { id: 4, label: 'Hidden', value: 'hidden' }
]

export const optionValuesAnimation = [
  { id: 1, label: 'Slide In', value: 'slide' },
  { id: 2, label: 'Fade In', value: 'fade' },
  { id: 3, label: 'Pop In', value: 'pop' },
  { id: 4, label: 'None', value: 'none' }
]

export const BUILDER_SECTIONS: BuilderSection[] = [
  {
    title: 'Bubble Styling',
    icon: <Palette size={50} />,
    controls: [
      { type: 'color', label: 'Background Color', key: 'backgroundColor' },
      {
        type: 'slider',
        label: 'Background Opacity',
        key: 'backgroundOpacity',
        min: 0,
        max: 1,
        step: 0.05,
        showTicks: true
      },
      {
        type: 'slider',
        label: 'Border Radius (px)',
        key: 'borderRadius',
        min: 0,
        max: 40,
        step: 1
      },
      { type: 'color', label: 'Border Color', key: 'borderColor' },
      { type: 'color', label: 'Glow Color', key: 'glowColor' },
      { type: 'slider', label: 'Glow Radius (px)', key: 'glowRadius', min: 0, max: 40, step: 1 }
    ]
  },
  {
    title: 'Typography',
    icon: <Type size={50} />,
    controls: [
      { type: 'select', label: 'Font Family', key: 'fontFamily', options: optionValuesFontFamily },
      { type: 'slider', label: 'Font Size (px)', key: 'fontSize', min: 0, max: 40, step: 1 },
      { type: 'color', label: 'Text Color', key: 'textColor' },
      { type: 'color', label: 'Author Name Color', key: 'authorColor' }
    ]
  },
  {
    title: 'Layout',
    icon: <Layout size={50} />,
    controls: [
      {
        type: 'select',
        label: 'Avatar Position',
        key: 'avatarPosition',
        options: optionValuesAvatarPosition
      },
      { type: 'checkbox', label: 'Text Limit Mode', key: 'textLimitMode', icon: <FaTextHeight /> },
      {
        type: 'slider',
        label: 'Max Lines',
        key: 'textLimitLines',
        min: 1,
        max: 10,
        step: 1,
        showTicks: true,
        condition: (theme) => theme.textLimitMode === true
      }
    ]
  },
  {
    title: 'Badges & Icons',
    icon: <ImageIcon size={50} />,
    controls: [
      {
        type: 'checkbox',
        label: 'Show Platform Icon',
        key: 'showPlatformIcon',
        icon: <HiMiniSquare3Stack3D />
      },
      { type: 'checkbox', label: 'Show User Badges', key: 'showBadges', icon: <MdBadge /> }
    ]
  },
  {
    title: 'Animations',
    icon: <Zap size={50} />,
    controls: [
      {
        type: 'select',
        label: 'Animation Style',
        key: 'animationType',
        options: optionValuesAnimation
      }
    ]
  },
  {
    title: 'Donation Highlight',
    icon: <DollarSign size={50} />,
    controls: [{ type: 'color', label: 'Highlight Background', key: 'donationBackgroundColor' }]
  }
]
