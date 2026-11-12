import { Fragment } from 'react'
import { groupLinks } from '../content'

// Turns the group names listed in content.ts (groupLinks) into links wherever they appear in a
// piece of text. Don't use it inside something that is already a link.
const names = Object.keys(groupLinks).sort((a, b) => b.length - a.length)
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const pattern = new RegExp(`(${names.map(escape).join('|')})`, 'g')

export default function Linked({ text }: { text: string }) {
  const parts = text.split(pattern)
  return (
    <>
      {parts.map((part, i) =>
        groupLinks[part] ? (
          <a key={i} className="link" href={groupLinks[part]}>
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
