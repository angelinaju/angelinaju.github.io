import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'

export interface NavLink {
  key: string
  label: string
  href: string
}

// Menu button with the page links tucked behind it. Pointing at it (with a mouse) opens the links
// leftward from the button; clicking or tapping toggles it, which is how touch and keyboard users
// open it. Escape, clicking elsewhere, or moving focus away closes it. While closed the links are
// inert, so Tab skips them. On phones the links drop down below the button instead.
export default function NavMenu({ links, current }: { links: NavLink[]; current: string }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const listId = useId()

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
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label="Menu"
        onClick={(e) => {
          // A mouse click on an already hover-opened menu keeps it open; taps and keys toggle.
          if ((e.nativeEvent as PointerEvent).pointerType === 'mouse') setOpen(true)
          else setOpen((o) => !o)
        }}
        className="burger -m-1.5 grid size-8 cursor-pointer place-items-center"
      >
        <span aria-hidden="true" className="burger-lines" />
      </button>
      <nav aria-label="Main">
        <ul
          id={listId}
          inert={!open}
          data-open={open}
          className="nav-panel absolute top-full right-[-2.75rem] z-10 flex flex-col items-end gap-2 bg-ground py-3 pr-[2.75rem] pl-8 sm:top-1/2 sm:right-full sm:-translate-y-1/2 sm:flex-row sm:gap-x-7 sm:py-2 sm:pr-7 sm:pl-10"
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
