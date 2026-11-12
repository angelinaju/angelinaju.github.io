import type { ReactNode } from 'react'
import { Page, ProfilePhoto, StatusLine, Downloads, ROW, LEFT, MID } from '../components/Layout'
import { about } from '../content'
import RevealText from '../components/RevealText'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={`border-t border-fg/25 pt-5 pb-16 sm:pb-20 ${ROW}`}>
      <h2 className={`${LEFT} mb-6 text-small font-medium md:mb-0`}>{title}</h2>
      <div className={MID}>{children}</div>
    </section>
  )
}

export default function AboutPage() {
  const { education: ed } = about
  return (
    <Page current="about">
      <section className="pt-10 pb-20 sm:pt-16 sm:pb-28">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="tight text-giant">
            <RevealText text="Hi, I’m Angelina." />
          </h1>
          <ProfilePhoto className="w-48 shrink-0 sm:mt-4 sm:mr-4 lg:w-60" />
        </div>
        <div className={`mt-12 ${ROW}`}>
          <div className={`${LEFT} space-y-3 text-small`}>
            <StatusLine />
            <Downloads />
          </div>
          <div className={`${MID} mt-8 space-y-4 text-lead md:mt-0`}>
            {about.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <Block title="Education">
        <p className="tight text-h2">
          {ed.school}
          <span className="block text-dim">{ed.degree}</span>
        </p>
        <p className="mt-6">
          {ed.date.replace('Expected', 'Graduating')}. GPA {ed.gpa.replace(' · ', ', ')}.
        </p>
        <h3 className="mt-10 mb-3 text-small font-medium">
          Relevant coursework<sup className="ml-px text-[0.6em] font-normal">{ed.coursework.length}</sup>
        </h3>
        <ul className="grid gap-x-8 gap-y-1 text-dim sm:grid-cols-2">
          {ed.coursework.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Block>

      <Block title="Honors">
        <ul>
          {about.honors.map(([name, year]) => (
            <li key={name} className="flex justify-between gap-6 border-t border-fg/25 py-3 first:border-t-0 first:pt-0">
              <span>{name}</span>
              <span className="shrink-0 text-dim tabular-nums">({year})</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Leadership">
        <div className="space-y-12">
          {about.leadership.map((l) => (
            <div key={l.org}>
              <h3 className="tight text-h3">
                {l.role}
                <span className="block text-dim">{l.org}</span>
              </h3>
              <p className="mt-2 text-small font-medium">{l.date}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-dim">
                {l.points.map((p) => (
                  <li key={p} className="pl-1">{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Toolkit">
        <dl className="space-y-5">
          {about.skills.map(([k, v]) => (
            <div key={k} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <dt className="font-medium">{k}</dt>
              <dd className="text-dim">{v}</dd>
            </div>
          ))}
        </dl>
      </Block>
    </Page>
  )
}
