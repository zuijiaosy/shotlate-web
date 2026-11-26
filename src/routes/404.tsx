import { Link, createFileRoute } from '@tanstack/react-router'

// Prerendered to /404.html; Cloudflare serves it for unknown paths.
export const Route = createFileRoute('/404')({
  head: () => ({ meta: [{ title: '找不到页面 · Shotlate' }, { name: 'robots', content: 'noindex' }] }),
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <main>
      <section className="page-banner">
        <div className="ruler-top" aria-hidden="true" />
        <div className="wrap page-banner-in">
          <h1>找不到这个页面</h1>
          <p className="page-lead">链接可能写错了，或者页面已经移动。</p>
          <div className="jump-pills">
            <Link to="/">回到首页</Link>
            <Link to="/manual">使用手册</Link>
            <Link to="/download">前往下载</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
