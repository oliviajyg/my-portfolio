/** Prefix public asset paths with Vite's base (needed on GitHub Pages). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  const cleaned = path.replace(/^\//, '')
  return `${base}${cleaned}`
}
