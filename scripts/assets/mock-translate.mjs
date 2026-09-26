// Local stand-in for the OpenAI-compatible endpoint, so Shotlate's real translation layout can be captured without an API key.
// Looks up whole paragraphs first, then bullet by bullet, since Vision may split a list into one paragraph per bullet.
import http from 'node:http'
import fs from 'node:fs'
const dict = JSON.parse(fs.readFileSync(new URL('./translations.json', import.meta.url), 'utf8'))
const bullets = {}
for (const [en, zh] of Object.entries(dict)) {
  const e = en.split(/\s*(?=• )/).filter(Boolean), z = zh.split('\n')
  if (e.length > 1 && e.length === z.length) e.forEach((k, i) => (bullets[k.trim()] = z[i]))
}
const translate = (text) =>
  dict[text] ??
  (text.split(/\s*(?=• )/).filter(Boolean).every((b) => bullets[b.trim()])
    ? text.split(/\s*(?=• )/).filter(Boolean).map((b) => bullets[b.trim()]).join('\n')
    : undefined)
http.createServer((req, res) => {
  let body = ''
  req.on('data', (c) => (body += c))
  req.on('end', () => {
    const msg = JSON.parse(body).messages.at(-1).content
    const items = JSON.parse(msg).items
    const out = items.map((i) => {
      const t = translate(i.text)
      if (!t) console.error('MISSING:', JSON.stringify(i.text))
      return { id: i.id, t: t ?? i.text }
    })
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ items: out }) } }] }))
  })
}).listen(8799)
