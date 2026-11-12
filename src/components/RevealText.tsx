import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

// The one load moment on each page: the headline rises into place a line at a time, each line
// sliding up from behind its own edge. Lines are found after the font loads, by grouping words that
// share a top position, so the stagger follows the real line breaks at any screen width.
// Reduced-motion visitors get the text in place with no animation (see index.css).
export default function RevealText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)
  const words = text.split(' ')

  useLayoutEffect(() => {
    let cancelled = false
    document.fonts.ready.then(() => {
      const root = ref.current
      if (cancelled || !root) return
      let line = -1
      let lastTop = Number.NEGATIVE_INFINITY
      root.querySelectorAll<HTMLElement>('.reveal-word').forEach((word) => {
        if (word.offsetTop > lastTop + 2) {
          line += 1
          lastTop = word.offsetTop
        }
        word.style.setProperty('--line', String(line))
      })
      setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [text])

  // Screen readers get the sentence whole; the split-up copy is for the eye only.
  return (
    <>
    <span className="sr-only">{text}</span>
    <span
      ref={ref}
      aria-hidden="true"
      className={`reveal ${ready ? 'is-ready' : ''}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="reveal-word">
            <span className="reveal-inner">{w}</span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
    </>
  )
}
