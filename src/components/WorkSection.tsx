import type { Language, Project, UiStrings } from '../types'
import { ProjectCard } from './ProjectCard'

interface WorkSectionProps {
  projects: Project[]
  strings: UiStrings
  language: Language
}

export function WorkSection({ projects, strings, language }: WorkSectionProps) {
  return (
    <section id="work" aria-label={strings.workTitle}>
      <ul className="flex list-none flex-col gap-[clamp(34px,4.5vw,54px)]">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            strings={strings}
            language={language}
            index={index}
          />
        ))}
      </ul>
    </section>
  )
}
