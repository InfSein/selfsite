import { SlidersHorizontal, Warning } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { HTML_LANG } from '../lib/preferences'
import { LANGUAGES, THEMES } from '../types'
import type { Language, PreferenceKey, ThemePreference, UiStrings } from '../types'
import { SegmentedControl } from './SegmentedControl'

const rowTitleClass = 'text-[12.5px] font-medium tracking-[-0.005em]'

interface SettingsPopoverProps {
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

export function SettingsPopover({
  language,
  theme,
  strings,
  showACT,
  showMOD,
  hasEnabledOptionalCategory,
  onLanguageChange,
  onThemeChange,
  onToggle,
}: SettingsPopoverProps) {
  const [open, setOpen] = useState(false)
  const [pendingKey, setPendingKey] = useState<PreferenceKey | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const frame = window.requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLButtonElement>('.seg-switch__btn[aria-pressed="true"]')
        ?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setPendingKey(null)
      setOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setPendingKey(null)
      setOpen(false)
      triggerRef.current?.focus({ preventScroll: true })
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!pendingKey) return

    const frame = window.requestAnimationFrame(() => {
      cancelRef.current?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pendingKey])

  function toggle() {
    if (open) setPendingKey(null)
    setOpen((current) => !current)
  }

  function attemptToggle(key: PreferenceKey, checked: boolean) {
    if (!checked) {
      onToggle(key, false)
      return
    }

    if (hasEnabledOptionalCategory) {
      onToggle(key, true)
      return
    }

    setPendingKey(key)
  }

  function focusSettingInput(key: PreferenceKey) {
    const id = key === 'showACT' ? 'setting-act' : 'setting-mod'
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.focus({ preventScroll: true })
    })
  }

  function cancelWarning() {
    if (pendingKey) focusSettingInput(pendingKey)
    setPendingKey(null)
  }

  function confirmWarning() {
    if (!pendingKey) return
    const key = pendingKey
    setPendingKey(null)
    onToggle(key, true)
    focusSettingInput(key)
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`grid h-8 w-8 place-items-center rounded-full transition-colors duration-200 ${
          open ? 'bg-accent-soft text-ink' : 'text-muted hover:bg-accent-soft hover:text-ink'
        }`}
        aria-label={strings.settingsAria}
        aria-expanded={open}
        aria-controls="display-settings-popover"
        title={strings.settingsTitle}
        onClick={toggle}
      >
        <SlidersHorizontal size={17} aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="display-settings-popover"
          role="dialog"
          aria-label={strings.settingsTitle}
          className="settings-popover absolute right-0 top-[calc(100%+8px)] z-120 max-h-[calc(100dvh-var(--header-h)-24px)] w-[min(320px,calc(100vw-32px))] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface"
        >
          <div className="p-3.5">
            <div className="flex min-h-11 items-center justify-between gap-3">
              <span className={rowTitleClass}>{strings.themeLabel}</span>
              <SegmentedControl
                label={strings.themeLabel}
                value={theme}
                options={THEMES.map((value) => ({
                  value,
                  label: strings.themeOptions[value],
                }))}
                onChange={onThemeChange}
              />
            </div>

            <div className="flex min-h-11 items-center justify-between gap-3 border-t border-line">
              <span className={rowTitleClass}>{strings.languageLabel}</span>
              <SegmentedControl
                label={strings.languageLabel}
                value={language}
                options={LANGUAGES.map((code) => ({
                  value: code,
                  label: strings.langBadges[code],
                  ariaLabel: strings.langFull[code],
                  lang: HTML_LANG[code],
                }))}
                onChange={onLanguageChange}
                mono
              />
            </div>

            {pendingKey ? (
              <div className="border-t border-line pt-3" role="alert">
                <div className="rounded-xl bg-danger-soft p-3">
                  <div className="flex gap-2">
                    <Warning
                      size={15}
                      weight="fill"
                      className="mt-px shrink-0 text-danger"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="whitespace-pre-line text-[11.5px] leading-[1.65] text-ink">
                        {strings.eulaWarning}
                      </p>
                      <p className="mt-1 text-[11.5px] font-medium leading-[1.65] text-danger">
                        {strings.eulaWarningLast}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-end gap-2">
                    <button
                      ref={cancelRef}
                      type="button"
                      className="inline-flex h-7 items-center justify-center rounded-full px-3 text-[11px] text-muted transition-colors duration-200 hover:text-ink"
                      onClick={cancelWarning}
                    >
                      {strings.cancel}
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-7 items-center justify-center rounded-full bg-accent-strong px-3 text-[11px] font-medium text-on-accent transition-[filter,transform] duration-200 hover:brightness-[1.08] active:translate-y-px"
                      onClick={confirmWarning}
                    >
                      {strings.confirm}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div role="group" aria-label={strings.optionalGroup}>
                <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 border-t border-line">
                  <span className={rowTitleClass}>{strings.showAct}</span>
                  <span className="flex shrink-0 items-center">
                    <input
                      id="setting-act"
                      className="setting-input"
                      type="checkbox"
                      checked={showACT}
                      onChange={(event) => attemptToggle('showACT', event.target.checked)}
                    />
                    <span className="switch" aria-hidden="true" />
                  </span>
                </label>

                <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 border-t border-line">
                  <span className={rowTitleClass}>{strings.showMod}</span>
                  <span className="flex shrink-0 items-center">
                    <input
                      id="setting-mod"
                      className="setting-input"
                      type="checkbox"
                      checked={showMOD}
                      onChange={(event) => attemptToggle('showMOD', event.target.checked)}
                    />
                    <span className="switch" aria-hidden="true" />
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
