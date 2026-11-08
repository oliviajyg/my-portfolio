import { useEffect, useState } from 'react'
import { assetUrl } from '../lib/assetUrl'
import type { Manifest } from '../types'

type ManifestState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: Manifest }

export function useManifest(): ManifestState {
  const [state, setState] = useState<ManifestState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(assetUrl('journals/manifest.json'))
        if (!res.ok) throw new Error(`Could not load journals (${res.status})`)
        const data = (await res.json()) as Manifest
        if (!cancelled) setState({ status: 'ready', data })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load journals'
        if (!cancelled) setState({ status: 'error', message })
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
