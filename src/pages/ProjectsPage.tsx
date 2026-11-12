import { Page, PageIntro, ROW, LEFT, MID, RIGHT } from '../components/Layout'
import { projects } from '../content'

export default function ProjectsPage() {
  return (
    <Page current="projects">
      <PageIntro title="Class and team projects" lead={projects.lead} count={projects.list.length} />
      <ul>
        {projects.list.map((p) => (
          <li key={p.name} className={`border-t border-fg/25 pt-5 pb-16 sm:pb-20 ${ROW}`}>
            <p className={`${LEFT} mb-5 font-medium md:mb-0`}>({p.date})</p>
            <div className={MID}>
              <h2 className="tight text-h2">
                {p.name}
                <span className="block text-dim">{p.stack.replaceAll(' · ', ', ')}</span>
              </h2>
              <p className="mt-8">{p.blurb}</p>
              {p.github && (
                <a className="link mt-6 inline-block font-medium" href={p.github}>
                  Code on GitHub
                </a>
              )}
            </div>
            {/* The one number that sums up each project, where the index puts its year */}
            <p className={`${RIGHT} mt-8 md:mt-0`}>
              <span className="tight block text-h2 tabular-nums">{p.metric}</span>
              <span className="mt-1 block text-small text-dim">{p.metricLabel}</span>
            </p>
          </li>
        ))}
      </ul>
    </Page>
  )
}
