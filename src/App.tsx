import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Header } from './components/Header'
import { HeroIntro } from './components/HeroIntro'
import { SiteFooter } from './components/SiteFooter'
import { WorkSection } from './components/WorkSection'
import { UI } from './data/i18n'
import { PROJECTS } from './data/projects'
import { ROLE } from './data/site'
import { HTML_LANG, loadPreferences, savePreferences } from './lib/preferences'
import { useReveal } from './lib/reveal'
import { getSystemTheme, THEME_COLORS, watchSystemTheme } from './lib/theme'
import type {
  Language,
  PreferenceKey,
  Preferences,
  ResolvedTheme,
  ThemePreference,
} from './types'

function visibleProjects(preferences: Preferences) {
  return PROJECTS.filter((project) => {
    if (project.category === 'act') return preferences.showACT
    if (project.category === 'mod') return preferences.showMOD
    return true
  })
}

function App() {
  const [preferences, setPreferences] = useState<Preferences>(loadPreferences)
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme)
  const [liveMessage, setLiveMessage] = useState('')
  const pageRef = useRef<HTMLDivElement>(null)
  const announceTimerRef = useRef<number | undefined>(undefined)

  const strings = UI[preferences.language]
  const projects = visibleProjects(preferences)
  const resolvedTheme =
    preferences.theme === 'system' ? systemTheme : preferences.theme

  useReveal(
    pageRef,
    `${preferences.language}:${preferences.showACT}:${preferences.showMOD}`,
  )

  useEffect(() => watchSystemTheme(setSystemTheme), [])

  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.theme = resolvedTheme
    root.style.colorScheme = resolvedTheme
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[resolvedTheme])
  }, [resolvedTheme])

  useLayoutEffect(() => {
    document.documentElement.lang = HTML_LANG[preferences.language]
    document.title = `InfSein | ${ROLE}`

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    description?.setAttribute('content', `${ROLE}. ${strings.heroLede}`)
  }, [preferences.language, strings.heroLede])

  useEffect(() => {
    savePreferences(preferences)
  }, [preferences])

  useEffect(() => {
    return () => window.clearTimeout(announceTimerRef.current)
  }, [])

  const announce = useCallback((message: string) => {
    window.clearTimeout(announceTimerRef.current)
    setLiveMessage('')
    announceTimerRef.current = window.setTimeout(() => setLiveMessage(message), 40)
  }, [])

  function handleLanguageChange(language: Language) {
    if (language === preferences.language) return

    setPreferences((current) => ({ ...current, language }))
    announce(UI[language].languageChanged)
  }

  function handleThemeChange(theme: ThemePreference) {
    if (theme === preferences.theme) return

    setPreferences((current) => ({ ...current, theme }))
    announce(strings.themeChanged[theme])
  }

  function handleToggle(key: PreferenceKey, value: boolean) {
    setPreferences((current) => ({
      ...current,
      [key]: value,
      hasEnabledOptionalCategory: current.hasEnabledOptionalCategory || value,
    }))

    if (key === 'showACT') {
      announce(value ? strings.actShown : strings.actHidden)
    } else {
      announce(value ? strings.modShown : strings.modHidden)
    }
  }

  return (
    <div id="top" ref={pageRef} className="min-h-dvh bg-canvas text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2.5 focus:top-2.5 focus:z-1100 focus:border focus:border-ink focus:bg-ink focus:px-3.5 focus:py-2.5 focus:font-mono focus:text-xs focus:text-canvas"
      >
        {strings.skip}
      </a>

      <Header
        language={preferences.language}
        theme={preferences.theme}
        strings={strings}
        showACT={preferences.showACT}
        showMOD={preferences.showMOD}
        hasEnabledOptionalCategory={preferences.hasEnabledOptionalCategory}
        onLanguageChange={handleLanguageChange}
        onThemeChange={handleThemeChange}
        onToggle={handleToggle}
      />

      <main id="main-content" tabIndex={-1}>
        <div className="mx-auto grid max-w-360 grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)] items-start gap-[clamp(40px,5.5vw,84px)] px-(--page-pad) pt-(--layout-pt) pb-[clamp(70px,8vw,108px)] medium-down:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.22fr)] medium-down:gap-10.5 tablet-down:grid-cols-1 tablet-down:gap-0 tablet-down:pt-11.5">
          <HeroIntro strings={strings} />

          <div className="min-w-0 tablet-down:mt-11.5">
            <WorkSection
              projects={projects}
              strings={strings}
              language={preferences.language}
            />
          </div>
        </div>
      </main>

      <SiteFooter />

      <div className="sr-only" role="status" aria-live="polite">
        {liveMessage}
      </div>
    </div>
  )
}

export default App
