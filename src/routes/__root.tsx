import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import appCss from '../styles.css?url'
import { site } from '#/site'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ffffff' },
      { title: 'Shotlate' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      { rel: 'icon', href: '/favicon.png', type: 'image/png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
  }),
  shellComponent: RootDocument,
  component: Layout,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

const nav = [
  { to: '/', label: '首页' },
  { to: '/manual', label: '使用手册' },
  { to: '/faq', label: '常见问题' },
  { to: '/download', label: '下载' },
] as const

function Layout() {
  return (
    <>
      <header className="top">
        <div className="wrap top-in">
          <Link to="/" className="brand">
            <img src="/icon-256.png" alt="" width="28" height="28" />
            Shotlate
          </Link>
          <nav aria-label="主导航">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === '/' }} activeProps={{ 'aria-current': 'page' }}>
                {n.label}
              </Link>
            ))}
            <a href={site.sourceUrl}>GitHub</a>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="foot">
        <div className="wrap foot-in">
          <div className="foot-brand">
            <img src="/icon-256.png" alt="" width="22" height="22" />
            <span>Shotlate · 适用于 macOS {site.minMacOS} 及以上</span>
          </div>
          <nav aria-label="页脚">
            <Link to="/manual">使用手册</Link>
            <Link to="/faq">常见问题</Link>
            <Link to="/download">下载</Link>
            <a href={site.sourceUrl}>源代码</a>
          </nav>
          <p className="fine">MIT 许可证开源。</p>
        </div>
      </footer>
    </>
  )
}

function NotFound() {
  return (
    <main className="wrap page">
      <h1>找不到这个页面</h1>
      <p className="lead">链接可能写错了，或者页面已经移动。</p>
      <p>
        <Link to="/">回到首页</Link> · <Link to="/manual">使用手册</Link>
      </p>
    </main>
  )
}
