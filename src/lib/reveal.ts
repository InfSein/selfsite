import { useEffect, useLayoutEffect, useRef } from 'react'
import type { CSSProperties, RefObject } from 'react'

export function revealStyle(delay: number): CSSProperties {
  return { '--reveal-delay': `${delay}ms` } as CSSProperties
}

export function useReveal(rootRef: RefObject<HTMLElement | null>, restartKey: string): void {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const initialisedRef = useRef(false)

  useLayoutEffect(() => {
    const root = document.documentElement
    const nodes = rootRef.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? []

    if (!initialisedRef.current) {
      initialisedRef.current = true

      if (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        typeof IntersectionObserver === 'undefined'
      ) {
        return
      }

      root.classList.add('reveal-enabled')
      const observer = new IntersectionObserver(
        (entries, currentObserver) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('is-visible')
            currentObserver.unobserve(entry.target)
          }
        },
        {
          rootMargin: '0px 0px -8% 0px',
          threshold: 0.06,
        },
      )

      observerRef.current = observer
      nodes.forEach((node) => observer.observe(node))
      return
    }

    root.classList.remove('reveal-enabled')
    observerRef.current?.disconnect()
    observerRef.current = null
    nodes.forEach((node) => node.classList.add('is-visible'))
  }, [restartKey, rootRef])

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect()
      document.documentElement.classList.remove('reveal-enabled')
    }
  }, [])
}
