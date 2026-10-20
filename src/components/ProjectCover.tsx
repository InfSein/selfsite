import type { ProjectCover as ProjectCoverData } from '../types'

export function HqCover() {
  return (
    <div className="cover cover--hq" aria-hidden="true">
      <span className="cover-hq__watermark" />
      <div className="cover-hq__top">
        <span className="cover-hq__mark" />
        <span className="cover-hq__meta select-none">FFXIV</span>
      </div>
      <div className="cover-hq__bottom">
        <span className="cover-hq__word select-none">HqHelper</span>
        <span className="cover-hq__meta select-none">Recipe calculator</span>
      </div>
    </div>
  )
}

interface ProjectCoverProps {
  cover: ProjectCoverData
}

export function ProjectCover({ cover }: ProjectCoverProps) {
  if (cover.type === 'hq') return <HqCover />

  if (cover.type === 'lb') {
    return (
      <div className="cover cover--lb" aria-hidden="true">
        <img src={cover.src} alt="" loading="lazy" decoding="async" />
      </div>
    )
  }

  return (
    <div className="cover" aria-hidden="true">
      <img
        src={cover.src}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ objectPosition: cover.position ?? 'top center' }}
      />
    </div>
  )
}
