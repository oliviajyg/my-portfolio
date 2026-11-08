import { useId } from 'react'
import { assetUrl } from '../lib/assetUrl'
import type { SceneId, StickerKind } from './data'

function useSvgId() {
  return useId().replace(/:/g, '')
}

export function Scene({ name }: { name: SceneId }) {
  const id = useSvgId()
  if (name === 'morning') return <Morning id={id} />
  if (name === 'travel') return <Travel id={id} />
  return <Garden id={id} />
}

function Morning({ id }: { id: string }) {
  return (
    <svg className="scene" viewBox="0 0 160 176" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8d2c8" />
          <stop offset="100%" stopColor="#f0b7ae" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7fbff" />
          <stop offset="100%" stopColor="#9fd0ee" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="160" height="176" fill={`url(#${id}-wall)`} />
      <rect x="86" y="16" width="58" height="72" rx="2" fill={`url(#${id}-glass)`} />
      <path d="M86 50h58M115 16v72" stroke="#f7efe8" strokeWidth="5" />
      <rect x="82" y="12" width="66" height="80" fill="none" stroke="#f4e7df" strokeWidth="6" />
      <ellipse cx="78" cy="118" rx="46" ry="22" fill={`url(#${id}-glow)`} />
      <rect y="132" width="160" height="44" fill="#e7a99f" />
      <path d="M0 132h160" stroke="#f6d2cb" strokeWidth="3" />
      <rect x="24" y="108" width="30" height="26" rx="6" fill="#fffdf8" />
      <ellipse cx="39" cy="112" rx="11" ry="4" fill="#f3b7c6" />
      <path d="M54 114h5a8 8 0 0 1 0 14h-5" fill="none" stroke="#fffdf8" strokeWidth="3.5" />
      <rect x="112" y="116" width="16" height="16" rx="2" fill="#f7f1e6" />
      <ellipse cx="120" cy="112" rx="11" ry="7" fill="#6f946c" />
      <ellipse cx="112" cy="108" rx="7" ry="6" fill="#8aaf7e" />
      <ellipse cx="128" cy="106" rx="6" ry="5" fill="#9cbe8c" />
      <text x="98" y="168" fill="#ff5c2e" fontSize="9" fontFamily="ui-monospace, monospace">
        03.03.26
      </text>
    </svg>
  )
}

function Travel({ id }: { id: string }) {
  return (
    <svg className="scene" viewBox="0 0 160 176" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ec8ef" />
          <stop offset="55%" stopColor="#d7eefb" />
          <stop offset="100%" stopColor="#f7e7c4" />
        </linearGradient>
        <linearGradient id={`${id}-cabin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4e5968" />
          <stop offset="100%" stopColor="#2c333d" />
        </linearGradient>
      </defs>
      <rect width="160" height="176" fill={`url(#${id}-cabin)`} />
      <rect x="28" y="18" width="104" height="112" rx="36" fill={`url(#${id}-sky)`} />
      <ellipse cx="92" cy="78" rx="40" ry="10" fill="#7dae6a" />
      <ellipse cx="62" cy="90" rx="34" ry="12" fill="#5d8f56" />
      <ellipse cx="108" cy="96" rx="28" ry="9" fill="#3f6d45" />
      <circle cx="48" cy="42" r="8" fill="#fff4c8" />
      <path d="M28 96h104" stroke="#d7e7c4" strokeWidth="8" opacity="0.35" />
      <rect x="18" y="122" width="124" height="40" rx="4" fill="#232830" />
      <rect x="36" y="132" width="52" height="22" rx="2" fill="#f4efe4" transform="rotate(-6 62 143)" />
      <path d="M42 140h28M42 146h18" stroke="#e07a8a" strokeWidth="1.4" />
      <circle cx="118" cy="146" r="7" fill="#ffd36a" />
      <text x="92" y="168" fill="#ffb15a" fontSize="9" fontFamily="ui-monospace, monospace">
        06.14.26
      </text>
    </svg>
  )
}

function Garden({ id }: { id: string }) {
  return (
    <svg className="scene" viewBox="0 0 160 176" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c5e4f7" />
          <stop offset="100%" stopColor="#e7f6ea" />
        </linearGradient>
        <radialGradient id={`${id}-bloom`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffd0e0" />
          <stop offset="100%" stopColor="#e86b92" />
        </radialGradient>
      </defs>
      <rect width="160" height="176" fill={`url(#${id}-sky)`} />
      <rect y="118" width="160" height="58" fill="#c6a16a" />
      <path d="M0 126c20-10 40 8 60-2s40 10 60 0 28-8 40 2v-8H0z" fill="#7eaa62" />
      <path d="M0 138c24 6 36-10 58-2s34 12 56 2 30-8 46 4v-10H0z" fill="#5e8d4e" />
      <rect x="22" y="78" width="4" height="52" fill="#d7b48a" />
      <rect x="78" y="70" width="4" height="60" fill="#cda67a" />
      <rect x="124" y="86" width="4" height="46" fill="#e0c09a" />
      <ellipse cx="24" cy="74" rx="14" ry="8" fill="#8fbe78" />
      <ellipse cx="80" cy="64" rx="16" ry="9" fill="#6ea35c" />
      <ellipse cx="126" cy="82" rx="13" ry="8" fill="#9ccc86" />
      <circle cx="108" cy="96" r="8" fill={`url(#${id}-bloom)`} />
      <circle cx="118" cy="102" r="8" fill={`url(#${id}-bloom)`} />
      <circle cx="100" cy="104" r="8" fill={`url(#${id}-bloom)`} />
      <circle cx="110" cy="110" r="8" fill={`url(#${id}-bloom)`} />
      <circle cx="109" cy="102" r="4" fill="#ffe08a" />
      <rect x="96" y="108" width="3" height="28" fill="#3f6b3a" />
      <text x="12" y="168" fill="#ff5c2e" fontSize="9" fontFamily="ui-monospace, monospace">
        04.20.26
      </text>
    </svg>
  )
}

export function FramePicture({
  scene,
  image,
  alt,
}: {
  scene?: SceneId
  image?: string
  alt: string
}) {
  if (image) {
    return <img className="scene" src={assetUrl(image)} alt={alt} />
  }
  if (scene) return <Scene name={scene} />
  return null
}

export function StickerArt({
  kind,
  scene,
  image,
  caption,
  captionInk,
  tape,
}: {
  kind: StickerKind
  scene?: SceneId
  image?: string
  caption?: string
  captionInk?: string
  tape?: boolean
}) {
  if (image && kind !== 'polaroid') {
    return <img className="sticker-photo" src={assetUrl(image)} alt="" />
  }
  if (kind === 'sticky') return <StickyNote />
  if (kind === 'polaroid' && (scene || image)) {
    return (
      <span className={`polaroid${tape ? ' polaroid--taped' : ''}`}>
        <span className="polaroid__photo">
          <FramePicture scene={scene} image={image} alt={caption ?? ''} />
        </span>
        <span className="polaroid__caption" style={{ color: captionInk }}>
          {caption}
        </span>
      </span>
    )
  }
  if (kind === 'envelope') return <Envelope />
  if (kind === 'phone') return <Phone />
  if (kind === 'camera') return <Camera />
  if (kind === 'cd') return <Cd />
  if (kind === 'cherries') return <Cherries />
  if (kind === 'bolt') return <Bolt />
  if (kind === 'star') return <Star />
  if (kind === 'butterfly') return <Butterfly />
  if (kind === 'heart') return <Heart />
  return <Flower />
}

export function Star() {
  const id = useSvgId()
  return (
    <svg className="art art--star" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-s`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#ffd0f2" />
          <stop offset="45%" stopColor="#ff4fa3" />
          <stop offset="100%" stopColor="#c85cff" />
        </linearGradient>
      </defs>
      <path
        d="M50 8l11.2 26.4H90L68.6 51.2 78.4 80 50 64.8 21.6 80l9.8-28.8L10 34.4h28.8z"
        fill={`url(#${id}-s)`}
      />
      <path
        d="M50 16l6 14h16L60 40l5 16-15-10-15 10 5-16-12-10h16z"
        fill="#fff"
        opacity="0.28"
      />
    </svg>
  )
}

function StickyNote() {
  return (
    <span className="sticky">
      <span className="sticky__word">
        about
        <br />
        me
      </span>
      <svg className="sticky__face" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="12" fill="none" stroke="#1a1a1a" strokeWidth="1.7" />
        <circle cx="13" cy="16" r="1.3" fill="#1a1a1a" />
        <circle cx="23" cy="16" r="1.3" fill="#1a1a1a" />
        <path d="M12 21c1.6 2.4 10.4 2.4 12 0" fill="none" stroke="#1a1a1a" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function Envelope() {
  const id = useSvgId()
  return (
    <svg className="art art--envelope" viewBox="0 0 150 120" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-p`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8ee" />
          <stop offset="100%" stopColor="#f0ddc4" />
        </linearGradient>
      </defs>
      <ellipse cx="76" cy="108" rx="46" ry="7" fill="#1a1a1a" opacity="0.08" />
      <rect x="24" y="34" width="108" height="68" rx="4" fill="#e4cfae" />
      <rect x="18" y="28" width="108" height="68" rx="4" fill={`url(#${id}-p)`} />
      <path d="M18 32l54 36 54-36" fill="#fffaf3" />
      <path d="M18 94l48-30 8 6 8-6 44 30" fill="#f6e7d2" />
      <path d="M18 32l54 36L18 94z" fill="#f3e2cb" opacity="0.55" />
      <path d="M126 32l-54 36L126 94z" fill="#ead6b6" opacity="0.45" />
    </svg>
  )
}

function Phone() {
  const id = useSvgId()
  return (
    <svg className="art art--phone" viewBox="0 0 90 150" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7f7f8" />
          <stop offset="40%" stopColor="#d5d7de" />
          <stop offset="100%" stopColor="#aeb3be" />
        </linearGradient>
      </defs>
      <ellipse cx="46" cy="142" rx="24" ry="5" fill="#1a1a1a" opacity="0.1" />
      <rect x="20" y="8" width="52" height="128" rx="12" fill="#9aa0ab" />
      <rect x="16" y="6" width="52" height="128" rx="12" fill={`url(#${id}-b)`} />
      <rect x="22" y="14" width="40" height="48" rx="5" fill="#2c313b" />
      <path d="M26 20h18" stroke="#fff" strokeWidth="2" opacity="0.35" strokeLinecap="round" />
      <path d="M16 68h52" stroke="#9aa1ad" strokeWidth="3" />
      <circle cx="42" cy="84" r="2" fill="#8b919c" />
      <circle cx="32" cy="96" r="3.2" fill="#c5c8d0" />
      <circle cx="42" cy="96" r="3.2" fill="#c5c8d0" />
      <circle cx="52" cy="96" r="3.2" fill="#c5c8d0" />
      <circle cx="32" cy="108" r="3.2" fill="#b7bcc6" />
      <circle cx="42" cy="108" r="3.2" fill="#b7bcc6" />
      <circle cx="52" cy="108" r="3.2" fill="#b7bcc6" />
      <rect x="34" y="116" width="16" height="6" rx="3" fill="#bfc3cb" />
    </svg>
  )
}

function Camera() {
  const id = useSvgId()
  return (
    <svg className="art art--camera" viewBox="0 0 170 124" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f5f7" />
          <stop offset="100%" stopColor="#c5c8d0" />
        </linearGradient>
        <radialGradient id={`${id}-l`} cx="38%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#6d7688" />
          <stop offset="55%" stopColor="#1d2129" />
          <stop offset="100%" stopColor="#0b0d12" />
        </radialGradient>
      </defs>
      <ellipse cx="88" cy="114" rx="52" ry="6" fill="#1a1a1a" opacity="0.1" />
      <rect x="28" y="36" width="122" height="70" rx="16" fill="#a7adb8" />
      <rect x="22" y="32" width="122" height="70" rx="16" fill={`url(#${id}-b)`} />
      <rect x="54" y="18" width="62" height="22" rx="6" fill="#dfe2e8" />
      <circle cx="64" cy="68" r="26" fill="#8e95a3" />
      <circle cx="64" cy="68" r="20" fill={`url(#${id}-l)`} />
      <circle cx="58" cy="60" r="6" fill="#fff" opacity="0.35" />
      <rect x="112" y="44" width="20" height="10" rx="2" fill="#f7f4ee" />
      <circle cx="122" cy="64" r="7" fill="#ffe56a" />
      <circle cx="120" cy="63" r="1" fill="#1a1a1a" />
      <circle cx="124" cy="63" r="1" fill="#1a1a1a" />
      <path d="M119 67c1 1.4 5 1.4 6 0" stroke="#1a1a1a" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M108 78l4 5 4-8 4 8 4-5 4 6h-24z" fill="#ff4fa3" />
    </svg>
  )
}

function Cd() {
  return (
    <span className="cd" aria-hidden="true">
      <span className="cd__shine" />
    </span>
  )
}

function Cherries() {
  const id = useSvgId()
  return (
    <svg className="art art--cherries" viewBox="0 0 110 100" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-c`} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ff8d9a" />
          <stop offset="45%" stopColor="#e4233c" />
          <stop offset="100%" stopColor="#9d1024" />
        </radialGradient>
      </defs>
      <ellipse cx="56" cy="92" rx="28" ry="5" fill="#1a1a1a" opacity="0.1" />
      <path d="M48 38C44 18 58 10 64 16" fill="none" stroke="#3e8a3a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M62 36C70 16 54 8 48 16" fill="none" stroke="#3e8a3a" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="70" cy="18" rx="12" ry="6" fill="#67b15a" transform="rotate(20 70 18)" />
      <circle cx="40" cy="62" r="20" fill={`url(#${id}-c)`} />
      <circle cx="74" cy="66" r="20" fill={`url(#${id}-c)`} />
      <ellipse cx="34" cy="54" rx="6" ry="3.5" fill="#fff" opacity="0.45" transform="rotate(-30 34 54)" />
      <ellipse cx="68" cy="58" rx="6" ry="3.5" fill="#fff" opacity="0.4" transform="rotate(-30 68 58)" />
    </svg>
  )
}

function Bolt() {
  const id = useSvgId()
  return (
    <svg className="art art--bolt" viewBox="0 0 80 110" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff4a8" />
          <stop offset="50%" stopColor="#ffd23a" />
          <stop offset="100%" stopColor="#ff9f1a" />
        </linearGradient>
      </defs>
      <path d="M48 4L16 50h22L24 106l46-62H46L58 4z" fill={`url(#${id}-b)`} />
      <path d="M46 14L30 46h12L34 70l18-24H42z" fill="#fff" opacity="0.35" />
    </svg>
  )
}

function Butterfly() {
  const id = useSvgId()
  return (
    <svg className="art art--butterfly" viewBox="0 0 120 90" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-w`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe0f4" />
          <stop offset="100%" stopColor="#d9a6f5" />
        </linearGradient>
      </defs>
      <ellipse cx="36" cy="36" rx="26" ry="18" fill={`url(#${id}-w)`} transform="rotate(-24 36 36)" />
      <ellipse cx="84" cy="36" rx="26" ry="18" fill="#f3c1ea" transform="rotate(24 84 36)" />
      <ellipse cx="40" cy="58" rx="14" ry="11" fill="#ffc2dd" transform="rotate(18 40 58)" />
      <ellipse cx="80" cy="58" rx="14" ry="11" fill="#e7b6f0" transform="rotate(-18 80 58)" />
      <ellipse cx="60" cy="48" rx="4" ry="18" fill="#2a2a2a" />
      <circle cx="60" cy="28" r="4.5" fill="#2a2a2a" />
      <path d="M57 26c-6-12-14-12-16-6M63 26c6-12 14-12 16-6" fill="none" stroke="#2a2a2a" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function Heart() {
  const id = useSvgId()
  return (
    <svg className="art art--heart" viewBox="0 0 90 84" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-h`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#ffd0e4" />
          <stop offset="40%" stopColor="#ff5b93" />
          <stop offset="100%" stopColor="#e4235b" />
        </linearGradient>
      </defs>
      <path
        d="M45 74C45 74 8 48 8 28 8 16 18 8 30 12c6 2 11 8 15 14 4-6 9-12 15-14 12-4 22 4 22 16 0 20-37 46-37 46z"
        fill={`url(#${id}-h)`}
      />
      <ellipse cx="30" cy="26" rx="8" ry="5" fill="#fff" opacity="0.4" transform="rotate(-28 30 26)" />
    </svg>
  )
}

function Flower() {
  const id = useSvgId()
  const petals = [0, 60, 120, 180, 240, 300]
  return (
    <svg className="art art--flower" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-p`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#f0c6ff" />
          <stop offset="100%" stopColor="#b15ad4" />
        </radialGradient>
        <radialGradient id={`${id}-c`} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#fff1b0" />
          <stop offset="50%" stopColor="#ff9d3c" />
          <stop offset="100%" stopColor="#ef6a22" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="16" ry="4" fill="#1a1a1a" opacity="0.08" />
      <g transform="translate(50 46)">
        {petals.map((deg) => (
          <ellipse key={deg} cy="-20" rx="12" ry="18" fill={`url(#${id}-p)`} transform={`rotate(${deg})`} />
        ))}
      </g>
      <circle cx="50" cy="46" r="11" fill={`url(#${id}-c)`} />
      <ellipse cx="46" cy="42" rx="3.5" ry="2" fill="#fff" opacity="0.7" />
    </svg>
  )
}
