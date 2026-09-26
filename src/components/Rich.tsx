import type { ReactNode } from 'react'

// Tiny markup for content strings: [⌥A] renders as a key, `path` as code, [text](url) as a link.
export function Rich({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\[([^\]]+)\]|`([^`]+)`/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[2] !== undefined) {
      const external = /^https?:/.test(m[2])
      parts.push(
        <a key={m.index} href={m[2]} {...(external && { target: '_blank', rel: 'noopener' })}>
          {m[1]}
        </a>,
      )
    } else {
      parts.push(m[3] !== undefined ? <kbd key={m.index}>{m[3]}</kbd> : <code key={m.index}>{m[4]}</code>)
    }
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
