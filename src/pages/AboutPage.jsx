import { Page, ProfilePhoto, StatusPill, Downloads, GUTTER } from '../components/Layout'
import { about } from '../content'

function Block({ title, children }) {
  return (
    <section className={`border-t border-rule py-12 sm:py-14 ${GUTTER}`}>
      <h2 className="mb-6 text-h3 font-bold tracking-tight md:mb-0">{title}</h2>
      <div>{children}</div>
    </section>
  )
}

export default function AboutPage() {
  const { education: ed } = about
  return (
    <Page current="about">
      <section className="grid gap-10 pt-8 pb-16 sm:pt-14 md:grid-cols-[minmax(0,38rem)_15rem] md:items-end md:justify-between">
        <div>
          <h1 className="text-h1 font-extrabold tracking-[-0.025em] sm:text-display">Hi, I’m Angelina.</h1>
          <div className="mt-6 space-y-4 text-lead text-muted">
            {about.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 space-y-5">
            <StatusPill />
            <Downloads />
          </div>
        </div>
        <ProfilePhoto className="aspect-[4/5] w-full max-w-60" />
      </section>

      <Block title="Education">
        <p className="text-lead font-bold">{ed.school}</p>
        <p className="mt-1">{ed.degree}, {ed.date.replace('Expected', 'expected')}</p>
        <p className="mt-1 text-muted">GPA {ed.gpa.replace(' · ', ', ')}</p>
        <h3 className="mt-8 mb-2 font-bold">Relevant coursework</h3>
        <ul className="grid gap-x-8 gap-y-1 text-muted sm:grid-cols-2">
          {ed.coursework.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Block>

      <Block title="Honors">
        <ul className="divide-y divide-rule">
          {about.honors.map(([name, year]) => (
            <li key={name} className="flex justify-between gap-6 py-3 first:pt-0">
              <span>{name}</span>
              <span className="shrink-0 text-muted tabular-nums">{year}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Leadership">
        <div className="space-y-10">
          {about.leadership.map((l) => (
            <div key={l.org}>
              <h3 className="text-lead font-bold">{l.role}</h3>
              <p className="text-muted">
                {l.org}, {l.date}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-muted">
                {l.points.map((p) => (
                  <li key={p} className="pl-1">{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Toolkit">
        <dl className="space-y-4">
          {about.skills.map(([k, v]) => (
            <div key={k} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <dt className="font-bold">{k}</dt>
              <dd className="text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </Block>
    </Page>
  )
}
