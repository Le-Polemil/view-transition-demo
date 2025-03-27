import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

export const CARDS = [
  {
    id: 'saphira',
    name: 'Saphira',
    image: viteLogo,
    bg: 'bg-blue-500',
  },
  {
    id: 'thorn',
    name: 'Thorn',
    image: reactLogo,
    bg: 'bg-red-500',
  },
  {
    id: 'firnen',
    name: 'Fírnen',
    image: viteLogo,
    bg: 'bg-green-500',
  },
  {
    id: 'glaedr',
    name: 'Glaedr',
    image: reactLogo,
    bg: 'bg-yellow-500',
  },
  {
    id: 'iormungr',
    name: 'Iormúngr',
    image: viteLogo,
    bg: 'bg-slate-300',
  },
  {
    id: 'shruikan',
    name: 'Shruikan',
    image: reactLogo,
    bg: 'bg-stone-900',
  }
] as const