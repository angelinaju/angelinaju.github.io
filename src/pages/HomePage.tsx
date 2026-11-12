import { Page, IndexList, StatusLine, Downloads, ROW, LEFT, MID, RIGHT } from '../components/Layout'
import { home } from '../content'
import RevealText from '../components/RevealText'

export default function HomePage() {
  return (
    <Page current="home">
      <section className="pt-10 pb-24 sm:pt-20 sm:pb-36">
        <h1 className="tight max-w-[16ch] text-giant">
          <RevealText text={home.statement} />
        </h1>
        <div className={`mt-12 sm:mt-16 ${ROW}`}>
          <div className={`${LEFT} text-small`}>
            <StatusLine />
          </div>
          <p className={`${MID} mt-6 text-lead text-dim md:mt-0`}>{home.sub}</p>
          <div className={`${RIGHT} mt-6 md:mt-0`}>
            <Downloads className="md:justify-end" />
          </div>
        </div>
      </section>

      <section aria-labelledby="selected">
        <h2 id="selected" className="mb-4 text-small font-medium">
          Selected work<sup className="ml-px text-[0.6em] font-normal">{home.selected.length}</sup>
        </h2>
        <IndexList
          label="Selected work"
          items={home.selected.map((s) => ({ href: s.href, title: s.title, context: s.context, left: s.kind, right: s.year }))}
        />
      </section>
    </Page>
  )
}
