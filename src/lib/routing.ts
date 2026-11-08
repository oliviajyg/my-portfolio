export function getJournalIdFromHash(): string | null {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const match = hash.match(/^j\/([^/]+)\/?$/)
  return match ? decodeURIComponent(match[1]) : null
}

export function journalHash(id: string): string {
  return `#/j/${encodeURIComponent(id)}`
}

export function homeHash(): string {
  return '#/'
}
