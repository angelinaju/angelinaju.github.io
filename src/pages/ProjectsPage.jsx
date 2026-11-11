import { Page, PageIntro, GUTTER } from '../components/Layout'
import { projects } from '../content'

export default function ProjectsPage() {
  return (
    <Page current="projects">
      <PageIntro title="Class and team projects" lead={projects.lead} />
      <ul>
        {projects.list.map((p) => (
          <li key={p.name} className={`border-t border-rule py-12 sm:py-14 ${GUTTER}`}>
            {/* The one number that sums up each project, in the margin column */}
            <p className="mb-5 md:mb-0 md:pt-1">
              <span className="block text-[1rem] text-muted">{p.date}</span>
              <span className="mt-3 block text-h3 font-extrabold tracking-tight">{p.metric}</span>
              <span className="block text-small text-muted">{p.metricLabel}</span>
            </p>
            <div>
              <h2 className="text-h3 font-bold tracking-tight">{p.name}</h2>
              <p className="mt-1 text-muted">{p.stack.replaceAll(' · ', ', ')}</p>
              <p className="mt-5">{p.blurb}</p>
              {p.github && (
                <a className="link mt-5 inline-block font-bold" href={p.github}>
                  Code on GitHub
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Page>
  )
}
