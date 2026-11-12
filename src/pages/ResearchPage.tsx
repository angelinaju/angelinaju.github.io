import { Page, PageIntro, RoleBlock, ROW, LEFT, MID, RIGHT } from '../components/Layout'
import { research } from '../content'

export default function ResearchPage() {
  return (
    <Page current="research">
      <PageIntro title="Two labs at UTK" lead={research.lead} count={research.roles.length} />
      {research.roles.map((r) => (
        <RoleBlock key={r.id} r={r} />
      ))}

      <section aria-labelledby="posters" className="border-t border-fg/25 pt-5">
        <h2 id="posters" className="mb-8 text-small font-medium">
          Posters<sup className="ml-px text-[0.6em] font-normal">{research.posters.length}</sup>
        </h2>
        <ul className="space-y-10">
          {research.posters.map((p) => (
            <li key={p.title} className={ROW}>
              <p className={`${LEFT} mb-2 text-small font-medium md:mb-0 md:pt-1`}>{p.note ?? ''}</p>
              <p className={`${MID} tight text-h3`}>{p.title}</p>
              <p className={`${RIGHT} mt-2 text-dim md:mt-0`}>
                {p.venue}
                <span className="block">({p.date})</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
