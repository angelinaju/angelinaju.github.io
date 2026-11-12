import { useEffect, useState } from 'react'

// Dark mode switch in the header. Until someone uses it, the site follows the browser's setting
// (and keeps following it if that changes). Pressing it saves a choice that sticks across pages and
// visits. The saved choice is applied before the page draws by a short script in each HTML file.
const KEY = 'theme'
const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

function savedTheme(): 'light' | 'dark' | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = savedTheme()
    return saved ? saved === 'dark' : systemDark()
  })

  // With no saved choice, keep in step with the browser setting.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (!savedTheme()) setDark(mq.matches)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = !dark
    const theme = next ? 'dark' : 'light'
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      // Private browsing can block storage; the switch still works for this page.
    }
    // Match the phone browser's bar color to the new page color.
    const ground = getComputedStyle(document.documentElement).getPropertyValue('--ground').trim()
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', ground))
    setDark(next)
  }

  // A half-filled circle: the filled half turns to the other side when the mode flips.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Dark mode"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="theme-toggle -m-1.5 grid size-8 shrink-0 cursor-pointer place-items-center"
    >
      <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 1a7 7 0 0 1 0 14z" fill="currentColor" />
      </svg>
    </button>
  )
}
