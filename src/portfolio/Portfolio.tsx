import { useEffect, useRef, useState } from 'react'
import { FramePicture, StickerArt } from './art'
import { assetUrl } from '../lib/assetUrl'
import { contact, deskItems, type DeskItem, type WindowBlock } from './data'

type Frame = {
  id: string
  x: number
  y: number
  z: number
}

const WINDOW_W = 400

function placeWindow(anchor: DOMRect): { x: number; y: number } {
  const margin = 16
  const vw = window.innerWidth
  const vh = window.innerHeight
  const w = Math.min(WINDOW_W, vw - margin * 2)
  let x = anchor.left + anchor.width / 2 - w / 2
  let y = anchor.bottom + 14
  if (y + 300 > vh - margin) y = anchor.top - 280
  if (y < margin) y = Math.max(margin, vh * 0.12)
  x = Math.min(Math.max(margin, x), Math.max(margin, vw - w - margin))
  y = Math.min(Math.max(margin, y), Math.max(margin, vh - 120))
  return { x, y }
}

function clampWindow(x: number, y: number) {
  const margin = 8
  const w = Math.min(WINDOW_W, window.innerWidth - margin * 2)
  return {
    x: Math.min(Math.max(margin, x), Math.max(margin, window.innerWidth - w - margin)),
    y: Math.min(Math.max(margin, y), Math.max(margin, window.innerHeight - 56)),
  }
}

export function Portfolio() {
  const [frames, setFrames] = useState<Frame[]>([])
  const [fullId, setFullId] = useState<string | null>(null)
  const zCounter = useRef(20)

  useEffect(() => {
    document.title = 'portfolio'
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (fullId) {
        setFullId(null)
        return
      }
      setFrames((current) => {
        if (current.length === 0) return current
        const top = current.reduce((a, b) => (a.z > b.z ? a : b))
        return current.filter((frame) => frame.id !== top.id)
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullId])

  function focusFrame(id: string) {
    zCounter.current += 1
    const z = zCounter.current
    setFrames((current) => current.map((frame) => (frame.id === id ? { ...frame, z } : frame)))
  }

  function openItem(item: DeskItem, element: HTMLElement) {
    const existing = frames.find((frame) => frame.id === item.id)
    if (existing) {
      focusFrame(item.id)
      return
    }
    const pos = placeWindow(element.getBoundingClientRect())
    zCounter.current += 1
    setFrames((current) => [...current, { id: item.id, ...pos, z: zCounter.current }])
  }

  function closeFrame(id: string) {
    setFullId((current) => (current === id ? null : current))
    setFrames((current) => current.filter((frame) => frame.id !== id))
  }

  function toggleFull(id: string) {
    setFullId((current) => (current === id ? null : id))
    focusFrame(id)
  }

  function moveFrame(id: string, x: number, y: number) {
    const next = clampWindow(x, y)
    setFrames((current) => current.map((frame) => (frame.id === id ? { ...frame, ...next } : frame)))
  }

  return (
    <div className="sky">
      <header className="mast">
        <h1>
          portfolio
          <span className="mast__star">
            <img src={assetUrl('/photos/star.png')} alt="" />
          </span>
        </h1>
      </header>

      <div className="stage">
        {deskItems.map((item, index) => {
          const open = frames.some((frame) => frame.id === item.id)
          return (
            <button
              key={item.id}
              type="button"
              className={`sticker${open ? ' is-open' : ''}`}
              style={
                {
                  '--x': `${item.x}%`,
                  '--y': `${item.y}%`,
                  '--r': `${item.rotate}deg`,
                  '--z': item.z,
                  '--i': index,
                  '--size': item.size ? `${item.size}px` : undefined,
                } as React.CSSProperties
              }
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-label={`Open ${item.title}`}
              onClick={(event) => openItem(item, event.currentTarget)}
            >
              <StickerArt
                kind={item.sticker}
                scene={item.scene}
                image={item.image}
                caption={item.caption}
                captionInk={item.captionInk}
                tape={item.tape}
              />
              {item.label ? <span className="sticker__label">{item.label}</span> : null}
            </button>
          )
        })}
      </div>

      <p className="hint">click anything</p>

      {frames.map((frame) => {
        const item = deskItems.find((entry) => entry.id === frame.id)
        if (!item) return null
        return (
          <DeskWindow
            key={frame.id}
            item={item}
            frame={frame}
            full={fullId === frame.id}
            onClose={() => closeFrame(frame.id)}
            onFocus={() => focusFrame(frame.id)}
            onToggleFull={() => toggleFull(frame.id)}
            onMove={(x, y) => moveFrame(frame.id, x, y)}
          />
        )
      })}
    </div>
  )
}

function DeskWindow({
  item,
  frame,
  full,
  onClose,
  onFocus,
  onToggleFull,
  onMove,
}: {
  item: DeskItem
  frame: Frame
  full: boolean
  onClose: () => void
  onFocus: () => void
  onToggleFull: () => void
  onMove: (x: number, y: number) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const drag = useRef<{ dx: number; dy: number } | null>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <section
      className={`win${full ? ' win--full' : ''}`}
      role="dialog"
      aria-label={item.title}
      style={{ left: frame.x, top: frame.y, zIndex: full ? 80 : frame.z }}
      onPointerDown={onFocus}
    >
      <header
        className="win__bar"
        onPointerDown={(event) => {
          if (full) return
          if ((event.target as HTMLElement).closest('button')) return
          if (window.innerWidth < 840) return
          drag.current = { dx: event.clientX - frame.x, dy: event.clientY - frame.y }
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (!drag.current) return
          onMove(event.clientX - drag.current.dx, event.clientY - drag.current.dy)
        }}
        onPointerUp={() => {
          drag.current = null
        }}
      >
        <h2>{item.title}</h2>
        <div className="win__actions">
          <button
            type="button"
            className="win__full"
            aria-pressed={full}
            aria-label={full ? `Leave full page for ${item.title}` : `Full page for ${item.title}`}
            onClick={onToggleFull}
          >
            {full ? <ShrinkIcon /> : <ExpandIcon />}
          </button>
          <button
            ref={closeRef}
            type="button"
            className="win__close"
            aria-label={`Close ${item.title}`}
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </header>
      <div className="win__body">
        <WindowBody item={item} />
      </div>
    </section>
  )
}

function WindowBody({ item }: { item: DeskItem }) {
  if (item.blocks) return <Blocks blocks={item.blocks} />
  const content = item.content
  if (content.kind === 'about') {
    return (
      <>
        <p className="win__text">{content.text}</p>
        <div className="pills">
          {content.tags.map((tag) => (
            <span className="pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </>
    )
  }

  if (content.kind === 'project') {
    return (
      <>
        <div className="win__photo">
          <FramePicture scene={content.scene} image={item.image} alt={item.title} />
        </div>
        <p className="win__text">{content.text}</p>
        <p className="win__meta">{content.meta}</p>
      </>
    )
  }

  if (content.kind === 'contact') {
    return (
      <>
        <p className="win__text">{content.text}</p>
        <div className="pills">
          <a className="pill" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <a className="pill" href={contact.instagramHref} target="_blank" rel="noreferrer">
            {contact.instagramLabel}
          </a>
        </div>
      </>
    )
  }

  if (content.kind === 'film') {
    const frames = deskItems.filter((entry) => entry.sticker === 'polaroid')
    return (
      <>
        <div className="film">
          {frames.map((frame) => (
            <figure className="film__frame" key={frame.id}>
              <FramePicture scene={frame.scene} image={frame.image} alt={frame.title} />
              <figcaption>{frame.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className="win__text">{content.text}</p>
      </>
    )
  }

  if (content.kind === 'mixtape') {
    return (
      <>
        <p className="win__text">{content.text}</p>
        <div className="tracks">
          {content.tracks.map((track) => (
            <div className="track" key={track.num}>
              <span>{track.num}</span>
              <span>{track.title}</span>
            </div>
          ))}
        </div>
      </>
    )
  }

  if (content.kind === 'texts') {
    return (
      <div className="texts">
        {content.lines.map((line) => (
          <p className={`bubble${line.mine ? ' bubble--mine' : ''}`} key={line.text}>
            {line.text}
          </p>
        ))}
      </div>
    )
  }

  if (content.kind === 'list') {
    return (
      <>
        <p className="win__text">{content.text}</p>
        <ul className="win__list">
          {content.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </>
    )
  }

  return <p className="win__text">{content.text}</p>
}

function Blocks({ blocks }: { blocks: WindowBlock[] }) {
  return (
    <div className="blocks">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`
        if (block.type === 'text') {
          return (
            <p className="win__text" key={key}>
              {block.text}
            </p>
          )
        }
        if (block.type === 'image') {
          return <Picture key={key} src={block.src} caption={block.caption} />
        }
        return (
          <div className="block__row" key={key}>
            {block.images.map((picture) => (
              <Picture key={picture.src} src={picture.src} caption={picture.caption} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

function Picture({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="block__figure">
      <img src={assetUrl(src)} alt={caption ?? ''} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 6V3h3M10 3h3v3M13 10v3h-3M6 13H3v-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShrinkIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M6 3v3H3M10 3v3h3M13 10h-3v3M6 13v-3H3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
