import { PageFlip } from 'page-flip'
import 'page-flip/src/Style/stPageFlip.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { assetUrl } from '../lib/assetUrl'
import type { Journal } from '../types'
import './FlipBook.css'

interface FlipBookProps {
  journal: Journal
}

export function FlipBook({ journal }: FlipBookProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const flipRef = useRef<PageFlip | null>(null)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  const images = useMemo(
    () => [assetUrl(journal.cover), ...journal.spreads.map((s) => assetUrl(s.src))],
    [journal.cover, journal.spreads],
  )

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    // page-flip destroy() removes its root node — keep a disposable child
    const bookEl = document.createElement('div')
    bookEl.className = 'flipbook__stage'
    host.innerHTML = ''
    host.appendChild(bookEl)

    const maxW = Math.min(host.clientWidth || 640, 900)
    // Landscape page size (full-spread photos). High minWidth keeps StPageFlip in
    // portrait orientation so each spread shows one-at-a-time, not paired.
    const width = Math.max(320, Math.floor(maxW * 0.88))
    const height = Math.floor(width * 0.65)

    const pageFlip = new PageFlip(bookEl, {
      width,
      height,
      size: 'stretch',
      minWidth: Math.ceil(maxW / 2) + 40,
      maxWidth: 900,
      minHeight: 200,
      maxHeight: 640,
      drawShadow: true,
      flippingTime: 850,
      usePortrait: true,
      showCover: true,
      maxShadowOpacity: 0.4,
      mobileScrollSupport: true,
      showPageCorners: true,
      startZIndex: 5,
    })

    pageFlip.loadFromImages(images)

    pageFlip.on('flip', (e) => {
      if (typeof e.data === 'number') setPageIndex(e.data)
    })

    pageFlip.on('init', () => {
      setPageCount(pageFlip.getPageCount())
      setPageIndex(pageFlip.getCurrentPageIndex())
    })

    flipRef.current = pageFlip

    const onResize = () => {
      pageFlip.update()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      flipRef.current = null
      try {
        pageFlip.destroy()
      } catch {
        // already torn down
      }
      host.innerHTML = ''
    }
  }, [journal.id, images])

  const caption =
    pageIndex === 0
      ? journal.title
      : journal.spreads[pageIndex - 1]?.caption ?? journal.title

  const date = pageIndex === 0 ? null : journal.spreads[pageIndex - 1]?.date

  return (
    <div className="flipbook">
      <div ref={hostRef} className="flipbook__host" />

      <div className="flipbook__meta">
        <p className="flipbook__caption">
          {caption}
          {date ? <span className="flipbook__date"> · {date}</span> : null}
        </p>
        <p className="flipbook__progress" aria-live="polite">
          {pageCount > 0 ? `${pageIndex + 1} / ${pageCount}` : '…'}
        </p>
      </div>

      <div className="flipbook__controls">
        <button
          type="button"
          className="flipbook__nav"
          onClick={() => flipRef.current?.flipPrev()}
          disabled={pageIndex <= 0}
          aria-label="Previous page"
        >
          ← prev
        </button>
        <button
          type="button"
          className="flipbook__nav"
          onClick={() => flipRef.current?.flipNext()}
          disabled={pageCount > 0 && pageIndex >= pageCount - 1}
          aria-label="Next page"
        >
          next →
        </button>
      </div>

      <p className="flipbook__hint">drag a corner or use the arrows</p>
    </div>
  )
}
