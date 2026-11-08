// Edit this file to change copy, links, and where each object sits.
//
// Your own pictures:
// 1. Put a png, jpg, or webp in public/photos/.
//    A png with a transparent background sits on the desk like a sticker.
// 2. Find the object below (phone, envelope, star, polaroid, and so on)
//    and add image: '/photos/your-file.png'.
//    That picture replaces the doodle. On a polaroid it fills the print.
// 3. Add size: 160 to change the width in pixels. Bigger number, bigger picture.
//
// What a window shows:
// Add a blocks list to any object. That list replaces the old window text.
// Put the blocks in the order you want them read.
//
// blocks: [
//   { type: 'text', text: 'A paragraph.' },
//   { type: 'image', src: '/photos/one.jpg', caption: 'optional note' },
//   { type: 'images', images: [
//     { src: '/photos/left.jpg', caption: 'left' },
//     { src: '/photos/right.jpg', caption: 'right' },
//   ]},
// ],

export const contact = {
  email: 'you@email.com',
  instagramHref: 'https://instagram.com/',
  instagramLabel: '@yours',
}

export type SceneId = 'morning' | 'travel' | 'garden'

export type WindowBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'images'; images: { src: string; caption?: string }[] }

export type WindowContent =
  | { kind: 'about'; text: string; tags: string[] }
  | { kind: 'project'; scene: SceneId; text: string; meta: string }
  | { kind: 'contact'; text: string }
  | { kind: 'film'; text: string }
  | { kind: 'mixtape'; text: string; tracks: { num: string; title: string }[] }
  | { kind: 'texts'; lines: { mine?: boolean; text: string }[] }
  | { kind: 'list'; text: string; items: string[] }
  | { kind: 'note'; text: string }

export type StickerKind =
  | 'sticky'
  | 'polaroid'
  | 'envelope'
  | 'phone'
  | 'camera'
  | 'cd'
  | 'cherries'
  | 'bolt'
  | 'star'
  | 'butterfly'
  | 'heart'
  | 'flower'

export type DeskItem = {
  id: string
  sticker: StickerKind
  title: string
  /** Small caption under icon stickers. Polaroids use `caption` on the print. */
  label?: string
  caption?: string
  captionInk?: string
  scene?: SceneId
  /** Path inside public/, for example '/photos/morning.jpg'. */
  image?: string
  /** Width in pixels. Leave it out to keep the default size. */
  size?: number
  /** Pictures and text for this object's window, in the order you want them. */
  blocks?: WindowBlock[]
  tape?: boolean
  /** Center of the object, as a percentage of the desk. */
  x: number
  y: number
  rotate: number
  z: number
  content: WindowContent
}

export const deskItems: DeskItem[] = [
  {
    id: 'about',
    sticker: 'sticky',
    title: 'about',
    x: 16,
    y: 28,
    rotate: -7,
    z: 2,
    content: {
      kind: 'about',
      text: "I'm Olivia. This is a desk, not a menu — notebooks, pictures, and a few things I like having within reach.",
      tags: ['notebooks', 'pictures', 'notes'],
    },
  },
  {
    id: 'star',
    sticker: 'star',
    title: 'saved',
    image: '/photos/star.png',
    x: 31,
    y: 16,
    rotate: 14,
    z: 3,
    content: {
      kind: 'note',
      text: 'Don\'t forget to save the start',
    },
  },
  {
    id: 'butterfly',
    sticker: 'butterfly',
    title: 'just visiting',
    x: 30,
    y: 40,
    rotate: -12,
    z: 4,
    content: {
      kind: 'note',
      text: 'Just passing through. Some of the best things here are the small ones.',
    },
  },
  {
    id: 'travels',
    sticker: 'polaroid',
    title: 'travels',
    caption: 'ticket stubs',
    captionInk: '#2f6fed',
    scene: 'travel',
    x: 48,
    y: 30,
    rotate: 2.5,
    z: 2,
    content: {
      kind: 'project',
      scene: 'travel',
      text: 'Ticket stubs, train windows, and maps folded the wrong way.',
      meta: 'June · on the move',
    },
  },
  {
    id: 'photographs',
    sticker: 'camera',
    title: 'photographs',
    label: 'photographs',
    image: '/photos/camera.png',
    size: 180,
    x: 67,
    y: 27,
    rotate: -11,
    z: 3,
    // blocks: [
    //   { type: 'text', text: 'here are some photographs.' },
    //   { type: 'image', src: '/photos/camera.png', caption: 'a caption' },
    //   { type: 'images', images: [
    //     { src: '/photos/one.jpg' },
    //     { src: '/photos/two.jpg' },
    //   ]},
    // ],
    content: {
      kind: 'texts',
      lines: [
        { mine: true, text: 'hey. you found the camera.' },
        { text: 'everything else is out on the desk.' },
        { mine: true, text: 'here are some photographs.' },
      ],
    },
  }, 
  {
    id: 'contact',
    sticker: 'envelope',
    title: 'drop a note',
    label: 'drop a note',
    x: 85,
    y: 26,
    rotate: 7,
    z: 3,
    content: {
      kind: 'contact',
      text: 'If something here made you want to write back.',
    },
  },
  {
    id: 'morning',
    sticker: 'polaroid',
    title: 'morning pages',
    caption: 'morning pages',
    captionInk: '#5b4bdb',
    scene: 'morning',
    // image: '/photos/morning.jpg',
    tape: true,
    x: 17,
    y: 68,
    rotate: -4,
    z: 2,
    content: {
      kind: 'project',
      scene: 'morning',
      text: 'A notebook for the first hour. Steam, unfinished lists, and the light through the blinds.',
      meta: 'March · notebook',
    },
  },
  {
    id: 'heart',
    sticker: 'heart',
    title: 'with care',
    x: 34,
    y: 62,
    rotate: 12,
    z: 4,
    content: {
      kind: 'note',
      text: 'Made slowly, on purpose.',
    },
  },
  {
    id: 'flower',
    sticker: 'flower',
    title: 'from the garden',
    x: 35,
    y: 84,
    rotate: -8,
    z: 4,
    content: {
      kind: 'note',
      text: 'Picked from the garden notes. It looked louder in person.',
    },
  },
  {
    id: 'camera',
    sticker: 'camera',
    title: 'playbook',
    label: 'playbook',
    x: 52,
    y: 64,
    rotate: 6,
    z: 3,
    content: {
      kind: 'film',
      text: 'A short roll. The same three places, taken like I might forget them.',
    },
  },
  {
    id: 'garden',
    sticker: 'polaroid',
    title: 'garden notes',
    caption: 'garden notes',
    captionInk: '#d4537e',
    scene: 'garden',
    x: 71,
    y: 70,
    rotate: 3,
    z: 2,
    content: {
      kind: 'project',
      scene: 'garden',
      text: 'What came up along the fence, written down before I forgot the color.',
      meta: 'April · outside',
    },
  },
  {
    id: 'cd',
    sticker: 'cd',
    title: 'mixtape',
    label: 'mixtape',
    x: 88,
    y: 52,
    rotate: -9,
    z: 3,
    content: {
      kind: 'mixtape',
      text: 'For the walk between one thing and the next.',
      tracks: [
        { num: '01', title: 'window light' },
        { num: '02', title: 'ticket stub' },
        { num: '03', title: 'rain on the leaves' },
        { num: '04', title: 'the walk home' },
      ],
    },
  },
  {
    id: 'cherries',
    sticker: 'cherries',
    title: 'sweet things',
    x: 86,
    y: 80,
    rotate: 8,
    z: 4,
    content: {
      kind: 'list',
      text: 'A short list I keep coming back to.',
      items: ['cold fruit', 'the first cup', 'a page I actually finished'],
    },
  },
  {
    id: 'bolt',
    sticker: 'bolt',
    title: 'a spark',
    x: 56,
    y: 86,
    rotate: -16,
    z: 4,
    content: {
      kind: 'note',
      text: 'For the days that start all at once.',
    },
  },
]
