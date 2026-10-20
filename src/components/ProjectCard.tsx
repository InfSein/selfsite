import { ArrowUpRight } from '@phosphor-icons/react'
import { HTML_LANG } from '../lib/preferences'
import { revealStyle } from '../lib/reveal'
import type { Language, Project, UiStrings } from '../types'
import { ProjectCover } from './ProjectCover'

interface ProjectCardProps {
  project: Project
  strings: UiStrings
  language: Language
  index: number
}

export function ProjectCard({ project, strings, language, index }: ProjectCardProps) {
  const title = project.name[language]
  const description = project.desc[language]
  const langNames = project.langs.map((code) => strings.langFull[code]).join(', ')

  return (
    <li data-reveal style={revealStyle(Math.min(index * 55, 150))}>
      <a
        className="group block"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title}. ${description} ${strings.opensNewTab}`}
      >
        <div className="aspect-[1.72] overflow-hidden rounded-card bg-surface-alt compact-down:aspect-[1.55] phone-down:aspect-[1.42]">
          <div className="h-full w-full transition-transform duration-650 ease-grove group-hover:scale-[1.02]">
            <ProjectCover cover={project.cover} />
          </div>
        </div>

        <div className="flex flex-col px-1 pt-4.25">
          <div className="mb-2.5 flex items-center justify-between gap-4 font-mono text-[9px] uppercase leading-[1.2] tracking-wider text-muted">
            <span className="text-accent">{strings.category[project.category]}</span>
            <span>{project.domain}</span>
          </div>

          <h2 className="text-[clamp(1.4rem,2.2vw,1.85rem)] font-medium leading-[1.08] tracking-[-0.045em] transition-colors duration-200 group-hover:text-accent">
            {title}
          </h2>

          <p className="mt-1.75 max-w-[54ch] text-[12.5px] leading-[1.6] text-muted">
            {description}
          </p>

          <div className="mt-3.5 flex items-center justify-between gap-4">
            <span
              className="inline-flex items-center gap-1"
              role="group"
              aria-label={`${strings.supportedLanguages}: ${langNames}`}
            >
              {project.langs.map((code) => (
                <span
                  key={code}
                  className="inline-flex min-w-5.25 items-center justify-center rounded-full border border-line px-1.25 py-0.75 font-mono text-[9.5px] leading-none tracking-[0.02em] text-muted"
                  lang={HTML_LANG[code]}
                  aria-hidden="true"
                >
                  {strings.langBadges[code]}
                </span>
              ))}
            </span>

            <ArrowUpRight
              size={14}
              className="text-muted transition-[color,transform] duration-300 ease-grove group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              aria-hidden="true"
            />
          </div>
        </div>
      </a>
    </li>
  )
}
