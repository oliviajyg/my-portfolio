import type { CSSProperties } from 'react'
import { assetUrl } from '../lib/assetUrl'
import { journalHash } from '../lib/routing'
import type { Journal } from '../types'
import './Shelf.css'

interface ShelfProps {
  siteTitle: string
  intro: string
  journals: Journal[]
}

export function Shelf({ siteTitle, intro, journals }: ShelfProps) {
  return (
    <main className="home">
      <header className="home__header">
        <h1 className="home__title">{siteTitle.toLowerCase()}</h1>
        <p className="home__intro">{intro}</p>
      </header>

      <section className="home__notebooks" aria-label="Journals">
        <ul className="home__row">
          {journals.map((journal, index) => {
            const tilt = index === 0 ? -6 : index === 1 ? 2 : 5
            return (
              <li
                key={journal.id}
                style={
                  {
                    animationDelay: `${0.1 + index * 0.1}s`,
                    '--tilt': `${tilt}deg`,
                  } as CSSProperties
                }
              >
                <a
                  className="notebook"
                  href={journalHash(journal.id)}
                  style={{ '--book-accent': journal.accent ?? '#e8c4c0' } as CSSProperties}
                  aria-label={`Open ${journal.title}`}
                >
                  <span className="notebook__shadow" aria-hidden="true" />
                  <span className="notebook__art">
                    <img src={assetUrl(journal.cover)} alt="" draggable={false} />
                  </span>
                  <span className="notebook__label">{journal.title}</span>
                </a>
              </li>
            )
          })}
        </ul>
        <p className="home__hint">pick a notebook</p>
      </section>
    </main>
  )
}
