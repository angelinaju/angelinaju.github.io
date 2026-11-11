import { useState } from 'react'
import { links, status, photo } from '../content'

export const NAV = [
  ['case-studies', 'Case studies', '/case-studies/'],
  ['work', 'Work', '/work/'],
  ['research', 'Research', '/research/'],
  ['projects', 'Projects', '/projects/'],
  ['about', 'About', '/about/'],
]

// Page width and the left "margin column" used on every inner page.
const WRAP = 'mx-auto max-w-[68rem] px-5 sm:px-10'
export const GUTTER = 'md:grid md:grid-cols-[11rem_minmax(0,38rem)] md:gap-x-14'

export function Header({ current }) {
  return (
    <header className={`${WRAP} flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 sm:py-8`}>
      <a href="/" className="text-body font-bold tracking-tight">
        Angelina Ju
      </a>
      <nav aria-label="Main">
        <ul className="flex flex-wrap gap-x-1 gap-y-1">
          {NAV.map(([key, label, href]) => {
            const active = key === current
            return (
              <li key={key}>
                <a
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`block py-1 pr-2.5 pl-3 text-[1rem] ${
                    active ? 'bar font-bold text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export function StatusPill() {
  return <p className="text-body font-bold">{status}.</p>
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-md bg-ink px-4 py-2.5 text-[1rem] font-bold text-paper hover:bg-accent"
    >
      <span aria-live="polite">{copied ? 'Email copied' : 'Copy email'}</span>
    </button>
  )
}

export function Footer() {
  return (
    <footer className="mt-28 bg-wash">
      <div className={`${WRAP} py-16 sm:py-20`}>
        <div className={GUTTER}>
          <h2 className="text-h3 font-bold tracking-tight md:pt-1">Say hello</h2>
          <div>
            <p className="mt-3 text-lead md:mt-0">
              Email is the best way to reach me:{' '}
              <a className="link font-bold" href={`mailto:${links.email}`}>
                {links.email}
              </a>
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <CopyEmail />
              <a className="link" href={links.linkedin}>LinkedIn</a>
              <a className="link" href={links.github}>GitHub</a>
              {links.resume && <a className="link" href={links.resume} download>Resume (PDF)</a>}
              {links.cv && <a className="link" href={links.cv} download>CV (PDF)</a>}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Page title and short intro, at the top of each inner page.
export function PageIntro({ title, lead }) {
  return (
    <section className="pt-8 pb-14 sm:pt-14 sm:pb-20">
      <h1 className="max-w-[20ch] text-h1 font-extrabold tracking-[-0.025em] sm:text-display">{title}</h1>
      {lead && <p className="mt-6 max-w-[38rem] text-lead text-muted">{lead}</p>}
    </section>
  )
}

// Yellow note for things you still need to add. Shows in local preview only, never on the live site.
export function Note({ children }) {
  if (!import.meta.env.DEV) return null
  return <div className="my-5 rounded-md bg-note px-4 py-3 text-small">{children}</div>
}

// Your own short description of a role. While empty, a reminder shows in local preview only.
export function Summary({ text }) {
  if (text) return <p className="text-lead">{text}</p>
  return (
    <Note>
      Write 1–3 sentences here in your own words: what was this really about, and what are you proudest of? Edit{' '}
      <code className="font-bold">summary</code> in src/content.js.
    </Note>
  )
}

export function Tags({ items }) {
  if (!items?.length) return null
  return <p className="text-small text-muted">Skills used: {items.join(', ')}</p>
}

// One job or research role: dates in the margin column, the story on the right.
export function RoleBlock({ r }) {
  return (
    <article id={r.id} className={`scroll-mt-8 border-t border-rule py-12 sm:py-14 ${GUTTER}`}>
      <p className="mb-4 text-[1rem] md:mb-0 md:pt-1.5">
        <span className="font-bold">{r.date}</span>
        <span className="block text-muted">{r.location}</span>
      </p>
      <div>
        <h2 className="text-h3 font-bold tracking-tight">{r.role}</h2>
        <p className="mt-1 text-muted">
          {r.org}
          {r.team && <>, {r.team}</>}
        </p>
        <div className="mt-5">
          <Summary text={r.summary} />
        </div>
        <ul className="mt-5 list-disc space-y-2.5 pl-5 marker:text-muted">
          {r.points.map((p) => (
            <li key={p} className="pl-1">{p}</li>
          ))}
        </ul>
        {r.links?.length > 0 && (
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
            {r.links.map((l) => (
              <a key={l.href} className="link font-bold" href={l.href}>
                {l.label}
              </a>
            ))}
          </p>
        )}
        <div className="mt-6">
          <Tags items={r.tags} />
        </div>
      </div>
    </article>
  )
}

export function ProfilePhoto({ className = '' }) {
  if (photo) return <img src={photo} alt="Angelina Ju" className={`rounded-md object-cover ${className}`} />
  if (!import.meta.env.DEV) return null
  return (
    <div className={`grid place-items-center rounded-md bg-note p-4 text-center text-small ${className}`}>
      Your photo goes here. Set <code className="font-bold">photo</code> in src/content.js.
    </div>
  )
}

// Download buttons for the CV and resume. Only shows the ones that are set in content.js.
export function Downloads() {
  const files = [
    [links.resume, 'Download resume'],
    [links.cv, 'Download CV'],
  ].filter(([href]) => href)
  if (!files.length) return null
  return (
    <div className="flex flex-wrap gap-3">
      {files.map(([href, label], i) => (
        <a
          key={label}
          href={href}
          download
          className={`rounded-md px-4 py-2.5 text-[1rem] font-bold ${
            i === 0 ? 'bg-ink text-paper hover:bg-accent' : 'text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink)] hover:bg-wash'
          }`}
        >
          {label} (PDF)
        </a>
      ))}
    </div>
  )
}

export function Page({ current, children }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-md bg-ink px-4 py-2 text-paper focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header current={current} />
      <main id="main" className={WRAP}>
        {children}
      </main>
      <Footer />
    </>
  )
}
