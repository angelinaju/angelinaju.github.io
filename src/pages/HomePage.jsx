import { useState } from 'react'
import { Page, GUTTER } from '../components/Layout'
import { home } from '../content'

// "What brings you here?" Visitors pick who they are, and a short guide to the site appears right under
// their choice, the same way PegasusAI's help appears under the notebook cell a student is working in.
function Guide() {
  const [picked, setPicked] = useState(null)
  const path = home.paths.find((p) => p.id === picked)
  return (
    <div className="mt-12 max-w-[44rem] lg:mt-3">
      <fieldset className="rounded-md bg-wash p-2 sm:p-3">
        <legend className="float-left w-full px-3 pt-2 pb-3 text-[1rem] font-bold">What brings you here?</legend>
        {home.paths.map((p) => (
          <label key={p.id} className="block cursor-pointer">
            <input
              type="radio"
              name="path"
              value={p.id}
              checked={picked === p.id}
              onChange={() => setPicked(p.id)}
              className="peer sr-only"
            />
            <span
              className={`block rounded-[3px] py-2.5 pr-3 pl-4 peer-focus-visible:outline-2 peer-focus-visible:outline-accent ${
                picked === p.id ? 'bar bg-paper font-bold' : 'text-muted hover:bg-paper/60 hover:text-ink'
              }`}
            >
              {p.label}
            </span>
          </label>
        ))}
      </fieldset>
      <div aria-live="polite">
        {path ? (
          <div key={path.id} className="unfold mt-3 rounded-md bg-note px-5 py-4 sm:px-6 sm:py-5">
            <p>{path.help}</p>
            <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
              {path.links.map(([label, href]) => (
                <a key={href} className="link font-bold" href={href} download={href.endsWith('.pdf') || undefined}>
                  {label}
                </a>
              ))}
            </p>
          </div>
        ) : (
          <p className="mt-3 px-1 text-small text-muted">Pick one and I’ll point you to the right pages.</p>
        )}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <Page current="home">
      <section className="grid gap-x-16 pt-8 pb-20 sm:pt-16 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-start">
        <div>
          <h1 className="max-w-[15ch] text-h1 font-extrabold tracking-[-0.03em] sm:text-display-lg lg:text-display xl:text-display-lg">
            {home.statement}
          </h1>
          <p className="mt-8 max-w-[36rem] text-lead text-muted">{home.sub}</p>
        </div>
        <Guide />
      </section>

      <section aria-labelledby="selected">
        <h2 id="selected" className="mb-2 text-h3 font-bold tracking-tight">
          Selected work
        </h2>
        <ul>
          {home.selected.map((item) => (
            <li key={item.title} className="border-t border-rule last:border-b">
              <a href={item.href} className={`group block py-5 sm:py-6 ${GUTTER}`}>
                <span className="block text-[1rem] text-muted tabular-nums md:pt-1">{item.year}</span>
                <span className="block">
                  <span className="block text-h3 font-bold tracking-tight underline decoration-transparent decoration-2 underline-offset-[0.2em] group-hover:decoration-accent">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-muted">{item.context}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
