import type { ResolvedTheme } from '../types'

const DARK_QUERY = '(prefers-color-scheme: dark)'

export const THEME_COLORS: Record<ResolvedTheme, string> = {
  light: '#f1f3ed',
  dark: '#0e1511',
}

export function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

export function watchSystemTheme(onChange: (theme: ResolvedTheme) => void): () => void {
  const query = window.matchMedia(DARK_QUERY)
  const handleChange = (event: MediaQueryListEvent) => {
    onChange(event.matches ? 'dark' : 'light')
  }

  query.addEventListener('change', handleChange)
  return () => query.removeEventListener('change', handleChange)
}
