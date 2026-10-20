import { LANGUAGES, THEMES } from '../types'
import type { Language, Preferences, ThemePreference } from '../types'

const STORAGE_KEY = 'infsein.site.preferences.v1'

export const HTML_LANG: Record<Language, string> = {
  zh: 'zh-CN',
  ja: 'ja',
  en: 'en',
}

interface StoredPreferences {
  language?: string
  theme?: string
  showACT?: boolean
  showMOD?: boolean
  hasEnabledOptionalCategory?: boolean
}

function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value)
}

function isTheme(value: unknown): value is ThemePreference {
  return typeof value === 'string' && (THEMES as readonly string[]).includes(value)
}

function detectLanguage(): Language {
  const languages =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language]

  for (const raw of languages) {
    const code = String(raw || '').toLowerCase()
    if (code.startsWith('zh')) return 'zh'
    if (code.startsWith('ja')) return 'ja'
    if (code.startsWith('en')) return 'en'
  }

  return 'en'
}

export function loadPreferences(): Preferences {
  let stored: StoredPreferences | null = null

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    stored = raw ? (JSON.parse(raw) as StoredPreferences) : null
  } catch {
    stored = null
  }

  const showACT = stored?.showACT === true
  const showMOD = stored?.showMOD === true

  return {
    language: isLanguage(stored?.language) ? stored.language : detectLanguage(),
    theme: isTheme(stored?.theme) ? stored.theme : 'system',
    showACT,
    showMOD,
    hasEnabledOptionalCategory:
      stored?.hasEnabledOptionalCategory === true || showACT || showMOD,
  }
}

export function savePreferences(preferences: Preferences): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  } catch {
    // The site remains usable when storage is unavailable.
  }
}
