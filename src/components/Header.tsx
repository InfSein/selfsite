import { ArrowSquareOut } from '@phosphor-icons/react'
import { GITHUB_URL } from '../data/site'
import type { Language, PreferenceKey, ThemePreference, UiStrings } from '../types'
import { GitHubIcon } from './icons'
import { SettingsPopover } from './SettingsPopover'

interface HeaderProps {
  language: Language
  theme: ThemePreference
  strings: UiStrings
  showACT: boolean
  showMOD: boolean
  hasEnabledOptionalCategory: boolean
  onLanguageChange: (language: Language) => void
  onThemeChange: (theme: ThemePreference) => void
  onToggle: (key: PreferenceKey, value: boolean) => void
}

export function Header({
  language,
  theme,
  strings,
  showACT,
  showMOD,
  hasEnabledOptionalCategory,
  onLanguageChange,
  onThemeChange,
  onToggle,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-100 border-b border-line bg-canvas">
      <div className="mx-auto flex min-h-18.75 max-w-360 items-center justify-between gap-6 px-(--page-pad) tablet-down:min-h-16 compact-down:gap-3">
        <a
          className="inline-flex flex-none items-center gap-2.5 font-sans text-[17px] font-semibold tracking-[-0.045em] phone-down:text-[15px]"
          href="#top"
          aria-label="InfSein"
        >
          <img
            className="h-7 w-7 rounded-full bg-surface-alt object-cover object-[50%_30%] phone-down:h-6.25 phone-down:w-6.25"
            src="/avatar.jpg"
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
          />
          <span>InfSein</span>
        </a>

        <div className="flex items-center gap-4 compact-down:gap-3">
          <nav aria-label={strings.primaryNav}>
            <a
              className="group relative inline-flex items-center gap-1.5 text-xs text-muted transition-colors duration-200 hover:text-accent"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${strings.github}, ${strings.opensNewTab}`}
            >
              <GitHubIcon size={13} />
              <span>{strings.github}</span>
              <ArrowSquareOut size={11} aria-hidden="true" />
              <span
                className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-grove group-hover:scale-x-100 group-focus-visible:scale-x-100"
                aria-hidden="true"
              />
            </a>
          </nav>

          <SettingsPopover
            language={language}
            theme={theme}
            strings={strings}
            showACT={showACT}
            showMOD={showMOD}
            hasEnabledOptionalCategory={hasEnabledOptionalCategory}
            onLanguageChange={onLanguageChange}
            onThemeChange={onThemeChange}
            onToggle={onToggle}
          />
        </div>
      </div>
    </header>
  )
}
