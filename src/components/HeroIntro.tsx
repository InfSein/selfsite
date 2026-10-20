import { ROLE } from '../data/site'
import { revealStyle } from '../lib/reveal'
import type { UiStrings } from '../types'

interface HeroIntroProps {
  strings: UiStrings
}

export function HeroIntro({ strings }: HeroIntroProps) {
  return (
    <section
      className="sticky top-[calc(var(--header-h)+var(--layout-pt))] pt-[clamp(0px,2vw,26px)] tablet-down:static tablet-down:pt-0"
      aria-labelledby="grove-title"
    >
      <p
        className="flex items-center select-none gap-2.75 font-mono text-[10px] leading-[1.3] tracking-[0.08em] text-muted"
        data-reveal
        style={revealStyle(0)}
      >
        <span className="h-px w-4.75 shrink-0 bg-accent" aria-hidden="true" />
        {ROLE}
      </p>

      <h1
        id="grove-title"
        className="mt-6 mb-6.75 select-none text-[clamp(4rem,7.6vw,7.4rem)] font-normal leading-[0.9] tracking-[-0.075em] tablet-down:text-[clamp(4.25rem,12vw,6.8rem)]"
        data-reveal
        style={revealStyle(60)}
      >
        InfSein
        <span className="text-accent" aria-hidden="true">
          .
        </span>
      </h1>

      <p
        className="max-w-[27ch] text-[clamp(1rem,1.4vw,1.14rem)] font-normal leading-[1.65] text-muted tablet-down:max-w-[34ch]"
        data-reveal
        style={revealStyle(120)}
      >
        {strings.heroLede}
      </p>
    </section>
  )
}
