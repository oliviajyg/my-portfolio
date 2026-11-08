export interface Spread {
  src: string
  caption?: string
  date?: string
}

export interface Journal {
  id: string
  title: string
  cover: string
  accent?: string
  spreads: Spread[]
}

export interface Manifest {
  siteTitle: string
  intro: string
  journals: Journal[]
}
