import { useEffect } from 'react'
import { homeHash } from '../lib/routing'
import type { Journal } from '../types'
import { FlipBook } from './FlipBook'
import './Reader.css'

interface ReaderProps {
  journal: Journal
}

export function Reader({ journal }: ReaderProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.location.hash = homeHash()
      }
    }
    window.addEventListener('keydown', onKey)
    window.scrollTo(0, 0)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <main className="reader-page" aria-label={journal.title}>
      <header className="reader-page__header">
        <a className="reader-page__back" href={homeHash()}>
          ← notebooks
        </a>
        <h1 className="reader-page__title">{journal.title}</h1>
        <span className="reader-page__spacer" aria-hidden="true" />
      </header>

      <div className="reader-page__stage">
        <FlipBook journal={journal} />
      </div>
    </main>
  )
}
