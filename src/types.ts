export const LANGUAGES = ['zh', 'ja', 'en'] as const

export type Language = (typeof LANGUAGES)[number]

export const THEMES = ['light', 'dark', 'system'] as const

export type ThemePreference = (typeof THEMES)[number]

export type ResolvedTheme = Exclude<ThemePreference, 'system'>

export type ProjectCategory = 'production' | 'tools' | 'act' | 'mod'

export type PreferenceKey = 'showACT' | 'showMOD'

export type ProjectCover =
  | { type: 'hq' }
  | { type: 'image'; src: string; position?: string }
  | { type: 'lb'; src: string }

export interface Project {
  id: string
  category: ProjectCategory
  name: Record<Language, string>
  desc: Record<Language, string>
  langs: Language[]
  url: string
  domain: string
  cover: ProjectCover
}

export interface Preferences {
  language: Language
  theme: ThemePreference
  showACT: boolean
  showMOD: boolean
  hasEnabledOptionalCategory: boolean
}

export interface UiStrings {
  skip: string
  primaryNav: string
  github: string
  heroLede: string
  workTitle: string
  settingsAria: string
  settingsTitle: string
  optionalGroup: string
  showAct: string
  showMod: string
  themeLabel: string
  themeOptions: Record<ThemePreference, string>
  themeChanged: Record<ThemePreference, string>
  languageLabel: string
  supportedLanguages: string
  opensNewTab: string
  langFull: Record<Language, string>
  langBadges: Record<Language, string>
  category: Record<ProjectCategory, string>
  actShown: string
  actHidden: string
  modShown: string
  modHidden: string
  languageChanged: string
  eulaWarning: string
  eulaWarningLast: string
  cancel: string
  confirm: string
}
