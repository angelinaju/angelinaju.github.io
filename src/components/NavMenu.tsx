import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'

export interface NavLink {
  key: string
  label: string
  href: string
}

// Page links. From the sm breakpoint up they sit in the header, always visible. On phones they're
// tucked behind a menu button and start closed; tapping it drops them down. Escape, tapping
// elsewhere, or moving focus away closes it. While closed the links are inert, so Tab skips them.
const DESKTOP = '(width >= 40rem)'

export default function NavMenu({ links, current }: { links: NavLink[]; current: string }) {
  const [open, setOpen] = useState(false)
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP).matches)
  const wrapRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  // Track the breakpoint, and close the phone menu if the window grows past it.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const onChange = () => {
      setDesktop(mq.matches)
      setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        wrapRef.current?.querySelector('button')?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <div
      ref={wrapRef}
      className="relative flex items-center"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label="Menu"
        onClick={() => setOpen((o) => !o)}
        className="burger -m-1.5 grid size-8 cursor-pointer place-items-center sm:hidden"
      >
        <span aria-hidden="true" className="burger-lines" />
      </button>
      <nav aria-label="Main">
        <ul
          id={listId}
          inert={!open && !desktop}
          data-open={open}
          className="nav-panel absolute top-full right-[-2.75rem] z-10 flex flex-col items-end gap-2 bg-ground py-3 pr-[2.75rem] pl-8 sm:static sm:flex-row sm:gap-x-7 sm:bg-transparent sm:p-0"
        >
          {links.map((l, i) => (
            <li key={l.key} style={{ '--i': i } as CSSProperties}>
              <a
                href={l.href}
                aria-current={l.key === current ? 'page' : undefined}
                className="link-hover font-medium whitespace-nowrap"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
