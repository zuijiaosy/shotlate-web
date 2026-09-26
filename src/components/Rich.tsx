import type { ReactNode } from 'react'

// Tiny markup for content strings: [⌥A] renders as a key, `path` as code.
export function Rich({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const re = /\[([^\]]+)\]|`([^`]+)`/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(m[1] !== undefined ? <kbd key={m.index}>{m[1]}</kbd> : <code key={m.index}>{m[2]}</code>)
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
