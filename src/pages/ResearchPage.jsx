import { Page, PageIntro, RoleBlock, GUTTER } from '../components/Layout'
import { research } from '../content'

export default function ResearchPage() {
  return (
    <Page current="research">
      <PageIntro title="Two labs at UTK" lead={research.lead} />
      {research.roles.map((r) => (
        <RoleBlock key={r.id} r={r} />
      ))}

      <section className={`border-t border-rule py-12 sm:py-14 ${GUTTER}`}>
        <h2 className="mb-6 text-h3 font-bold tracking-tight md:mb-0">Posters</h2>
        <ul className="space-y-8">
          {research.posters.map((p) => (
            <li key={p.title}>
              <p className="text-lead font-bold">{p.title}</p>
              <p className="mt-1 text-muted">
                {p.venue}, {p.date}
                {p.note && <>. {p.note}</>}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
