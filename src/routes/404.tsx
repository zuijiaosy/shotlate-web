import { Link, createFileRoute } from '@tanstack/react-router'

// Prerendered to /404.html; Cloudflare serves it for unknown paths.
export const Route = createFileRoute('/404')({
  head: () => ({ meta: [{ title: '找不到页面 · Shotlate' }, { name: 'robots', content: 'noindex' }] }),
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <main className="wrap page">
      <h1>找不到这个页面</h1>
      <p className="lead">链接可能写错了，或者页面已经移动。</p>
      <p style={{ marginTop: 20 }}>
        <Link to="/">回到首页</Link> · <Link to="/manual">使用手册</Link>
      </p>
    </main>
  )
}
