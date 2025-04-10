import saphira from './assets/saphira.png'
import thorn from './assets/thorn.png'
import firnen from './assets/firnen.png'
import glaedr from './assets/glaedr.png'
import iormungr from './assets/iormungr.png'
import shruikan from './assets/shruikan.png'

export const CARDS = [
  {
    id: 'saphira',
    name: 'Saphira',
    image: saphira,
    bg: 'bg-blue-500',
  },
  {
    id: 'glaedr',
    name: 'Glaedr',
    image: glaedr,
    bg: 'bg-yellow-500',
  },
  {
    id: 'thorn',
    name: 'Thorn',
    image: thorn,
    bg: 'bg-red-500',
  },
  {
    id: 'firnen',
    name: 'Fírnen',
    image: firnen,
    bg: 'bg-green-500',
  },
  {
    id: 'shruikan',
    name: 'Shruikan',
    image: shruikan,
    bg: 'bg-stone-900',
  },
  {
    id: 'iormungr',
    name: 'Iormúngr',
    image: iormungr,
    bg: 'bg-amber-600',
  },
] as const