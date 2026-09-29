export const CUSTOMIZER_DATA = {
  face: [
    { id: 'witch', label: 'Pale Witch', image: '/assets/face_witch.jpg', preview: '/assets/photo_01.jpg', tag: 'The Spellcaster' },
    { id: 'skull', label: 'Cursed Skeleton', image: '/assets/face_skull.jpg', preview: '/assets/face_skull.jpg', tag: 'The Departed' },
    { id: 'vampire', label: 'Nocturnal Vampire', image: '/assets/face_vampire.jpg', preview: '/assets/face_vampire.jpg', tag: 'The Aristocrat' },
    { id: 'crone', label: 'Ancient Crone', image: '/assets/photo_02.jpg', preview: '/assets/photo_02.jpg', tag: 'The Harbinger' }
  ],
  head: [
    { id: 'witch_hat', label: 'Witch Hat', icon: 'witch_hat', desc: 'Pointed brim with rusted buckle' },
    { id: 'horns', label: 'Demon Horns', icon: 'horns', desc: 'Curved obsidian horns' },
    { id: 'top_hat', label: 'Victorian Top Hat', icon: 'top_hat', desc: 'Formal silk with burgundy band' },
    { id: 'veil', label: 'Mourning Veil', icon: 'veil', desc: 'Lace black funeral shroud' }
  ],
  outfit: [
    { id: 'robe', label: 'Occult Robe', icon: 'robe', desc: 'Heavy cowl with silver talisman' },
    { id: 'corset', label: 'Lace Corset', icon: 'corset', desc: 'Victorian bodice with silk ribbons' },
    { id: 'sheet', label: 'Phantom Shroud', icon: 'sheet', desc: 'Tattered ghostly windings' },
    { id: 'gown', label: 'Velvet Gown', icon: 'gown', desc: 'Crimson collar with gold braid' }
  ],
  prop: [
    { id: 'candle', label: 'Wax Candle', icon: 'candle', desc: 'Dripping brass candle with flicker flame' },
    { id: 'dagger', label: 'Ritual Athame', icon: 'dagger', desc: 'Carved silver sacrificial blade' },
    { id: 'pumpkin', label: 'Jack-o\'-Lantern', icon: 'pumpkin', desc: 'Carved pumpkin with grinning embers' },
    { id: 'roses', label: 'Wilted Roses', icon: 'roses', desc: 'Dead black roses and thorned stems' }
  ],
  background: [
    { id: 'curtains', label: 'Velvet Curtains', color: '#380a0e', icon: 'curtains', desc: 'Deep oxblood theater drape' },
    { id: 'graveyard', label: 'Graveyard Fog', color: '#162221', icon: 'graveyard', desc: 'Cold iron cemetery pickets and mist' },
    { id: 'manor', label: 'Haunted Manor', color: '#1f1b24', icon: 'manor', desc: 'Victorian parlor with damask wallpaper' },
    { id: 'forest', label: 'Misty Woods', color: '#0d1810', icon: 'forest', desc: 'Twisted barren trees in moonlight' }
  ]
};

export const PHOTOS_DATA = [
  {
    id: 1,
    header: 'PHOTO 01',
    caption: 'Smile.',
    image: '/assets/photo_01.jpg',
    description: 'A quiet, calm portrait holding a single flickering candle.',
  },
  {
    id: 2,
    header: 'PHOTO 02',
    caption: 'Did you see that?',
    image: '/assets/photo_02.jpg',
    description: 'A faint shadowy face emerges from the deep black behind your shoulder.',
  },
  {
    id: 3,
    header: 'PHOTO 03',
    caption: 'One more.',
    image: '/assets/photo_03.jpg',
    description: 'Cold gaunt hands grip your shoulders. The entity is right behind you.',
  },
  {
    id: 4,
    header: 'PHOTO 04',
    caption: 'Thank you for the company.',
    image: '/assets/photo_04.jpg',
    description: 'The chair is empty. Only the hat, candle, and pumpkin remain. A specter looms.',
  }
];

export const SCREENS = [
  { id: 'landing', num: '01', title: 'Landing' },
  { id: 'customize', num: '02', title: 'Customize' },
  { id: 'countdown', num: '03', title: 'Flash' },
  { id: 'developing', num: '04', title: 'Developing' },
  { id: 'photo1', num: '05', title: 'Photo 01' },
  { id: 'photo2', num: '06', title: 'Photo 02' },
  { id: 'photo3', num: '07', title: 'Photo 03' },
  { id: 'photo4', num: '08', title: 'Photo 04' },
  { id: 'revelation', num: '09', title: 'Revelation' },
  { id: 'strip', num: '10', title: 'Photo Strip' },
  { id: 'actions', num: '11', title: 'Finish' },
  { id: 'overview', num: '00', title: 'All Screens Grid' }
];
