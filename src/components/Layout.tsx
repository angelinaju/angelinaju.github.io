import { useState, type ReactNode } from 'react'
import { links, status, photo, type Role } from '../content'
import RevealText from './RevealText'
import ThemeToggle from './ThemeToggle'
import NavMenu from './NavMenu'

// Which nav item is marked as the current page. 'home' marks none.
export type PageKey = 'home' | 'case-studies' | 'work' | 'research' | 'projects' | 'about'

export const NAV: { key: PageKey; label: string; href: string }[] = [
  { key: 'about', label: 'About', href: '/about/' },
  { key: 'case-studies', label: 'Case studies', href: '/case-studies/' },
  { key: 'work', label: 'Work', href: '/work/' },
  { key: 'research', label: 'Research', href: '/research/' },
  { key: 'projects', label: 'Projects', href: '/projects/' },
]

// Page edges, and the three-part row used everywhere: a small left column, the story in the
// middle, and a right column for the year or a number. Below md the parts stack.
export const WRAP = 'mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8'
export const ROW = 'md:grid md:grid-cols-12 md:gap-x-6'
export const LEFT = 'md:col-span-3'
export const MID = 'md:col-span-6'
export const RIGHT = 'md:col-span-3 md:text-right'

export function Header({ current }: { current: PageKey }) {
  return (
    <header className={`${WRAP} relative z-20 flex items-center gap-x-5 pt-4 pb-10 text-small sm:gap-x-6 sm:pt-5`}>
      <a href="/" className="mr-auto font-semibold whitespace-nowrap">
        Angelina Ju
      </a>
      <NavMenu links={NAV} current={current} />
      <ThemeToggle />
    </header>
  )
}

export function StatusLine() {
  return <p className="font-medium">{status}</p>
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
    <button type="button" onClick={copy} className="link cursor-pointer font-medium">
      <span aria-live="polite">{copied ? 'Email copied' : 'Copy email'}</span>
    </button>
  )
}

export function Footer() {
  return (
    <footer data-tone="inverse" className="mt-32">
      <div className={`${WRAP} pt-10 pb-6`}>
        <h2 className="text-small font-medium">Say hello</h2>
        <a
          href={`mailto:${links.email}`}
          className="link-hover tight mt-6 inline-block text-[clamp(2.25rem,7.4vw,7.5rem)] leading-[0.95] font-medium break-words [--line:0.045em]"
        >
          {links.email}
        </a>
        <div className={`mt-16 text-small ${ROW}`}>
          <p className={`${LEFT} text-dim`}>Angelina Ju (2026)</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 md:col-span-9 md:mt-0">
            <CopyEmail />
            <a className="link" href={links.linkedin}>LinkedIn</a>
            <a className="link" href={links.github}>GitHub</a>
            {links.resume && <a className="link" href={links.resume} download>Resume (PDF)</a>}
            {links.cv && <a className="link" href={links.cv} download>CV (PDF)</a>}
          </div>
        </div>
      </div>
    </footer>
  )
}

// Page title, set very large, with a count in parentheses on the right when the page is a list.
export function PageIntro({ title, lead, count }: { title: string; lead?: string; count?: number }) {
  return (
    <section className="pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div className="flex items-start justify-between gap-6">
        <h1 className="tight max-w-[14ch] text-giant">
          <RevealText text={title} />
        </h1>
        {count !== undefined && (
          <p className="tight text-giant">
            <RevealText text={`(${count})`} delay={120} />
          </p>
        )}
      </div>
      {lead && (
        <div className={`mt-10 ${ROW}`}>
          <p className={`${MID} md:col-start-4 text-lead`}>{lead}</p>
        </div>
      )}
    </section>
  )
}

// Yellow note for things you still need to add. Shows in local preview only, never on the live site.
export function Note({ children }: { children: ReactNode }) {
  if (!import.meta.env.DEV) return null
  return <div className="my-5 bg-note px-4 py-3 text-small text-black">{children}</div>
}

// Your own short description of a role. While empty, a reminder shows in local preview only.
export function Summary({ text }: { text: string }) {
  if (text) return <p className="text-lead">{text}</p>
  return (
    <Note>
      Write 1–3 sentences here in your own words: what was this really about, and what are you proudest of? Edit{' '}
      <code className="font-semibold">summary</code> in src/content.ts.
    </Note>
  )
}

// One job or research role, laid out like an index row: dates left, the story in the middle, skills right.
export function RoleBlock({ r }: { r: Role }) {
  return (
    <article id={r.id} className={`scroll-mt-8 border-t border-fg/25 pt-5 pb-16 sm:pb-20 ${ROW}`}>
      <p className={`${LEFT} mb-5 md:mb-0`}>
        <span className="block font-medium">{r.date}</span>
        <span className="block text-dim">{r.location}</span>
      </p>
      <div className={MID}>
        <h2 className="tight text-h2">
          {r.role}
          <span className="block text-dim">
            {r.org}
            {r.team && <>, {r.team}</>}
          </span>
        </h2>
        <div className="mt-8">
          <Summary text={r.summary} />
        </div>
        <ul className="mt-6 list-disc space-y-2.5 pl-5 marker:text-dim">
          {r.points.map((p) => (
            <li key={p} className="pl-1">{p}</li>
          ))}
        </ul>
        {r.links && r.links.length > 0 && (
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-1">
            {r.links.map((l) => (
              <a key={l.href} className="link font-medium" href={l.href}>
                {l.label}
              </a>
            ))}
          </p>
        )}
      </div>
      {r.tags && r.tags.length > 0 && (
        <p className={`${RIGHT} mt-8 text-small text-dim md:mt-1.5`}>
          <span className="sr-only">Skills used: </span>
          {r.tags.map((t) => (
            <span key={t} className="block">{t}</span>
          ))}
        </p>
      )}
    </article>
  )
}

export interface IndexItem {
  href: string
  title: string
  context: string
  left: string
  right: string
}

// The index: big two-line rows with a year on the right. Pointing at one row dims the others.
export function IndexList({ items, label }: { items: IndexItem[]; label: string }) {
  return (
    <ul aria-label={label} className="group/list">
      {items.map((item) => (
        <li key={item.href} className="border-t border-fg/25 last:border-b">
          <a
            href={item.href}
            className={`block py-4 transition-colors duration-200 group-hover/list:text-dim hover:text-fg! focus-visible:text-fg! sm:py-5 ${ROW}`}
          >
            <span className={`${LEFT} block text-small font-medium md:pt-2`}>{item.left}</span>
            <span className="tight mt-2 block text-h2 sm:text-h1 md:col-span-7 md:mt-0">
              {item.title}
              <span className="block text-dim">{item.context}</span>
            </span>
            <span className="tight mt-2 block text-h3 tabular-nums sm:text-h1 md:col-span-2 md:mt-0 md:text-right">{item.right}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function ProfilePhoto({ className = '' }: { className?: string }) {
  if (photo) {
    return (
      <figure className={`photo-print ${className}`}>
        <img src={photo} alt="Angelina Ju" className="aspect-[4/5] w-full object-cover" />
      </figure>
    )
  }
  if (!import.meta.env.DEV) return null
  return (
    <div className={`photo-print ${className}`}>
      <div className="grid aspect-[4/5] place-items-center bg-note p-4 text-center text-small text-black">
        Your photo goes here. Set photo in src/content.ts.
      </div>
    </div>
  )
}

// Download links for the CV and resume. Only shows the ones that are set in content.ts.
export function Downloads({ className = '' }: { className?: string }) {
  const files: [href: string, label: string][] = []
  if (links.resume) files.push([links.resume, 'Resume (PDF)'])
  if (links.cv) files.push([links.cv, 'CV (PDF)'])
  if (!files.length) return null
  return (
    <p className={`flex flex-wrap gap-x-6 gap-y-1 ${className}`}>
      {files.map(([href, label]) => (
        <a key={label} href={href} download className="link font-medium">
          {label}
        </a>
      ))}
    </p>
  )
}

export function Page({ current, children }: { current: PageKey; children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only bg-fg px-4 py-2 text-ground focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
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
