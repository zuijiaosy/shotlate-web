import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { BrandGlyphIcon, GitHubIcon } from '#/components/Icons'
import { site } from '#/site'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#e5ebf2' },
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
            <img src="/icon-256.png" alt="" width="30" height="30" />
            Shotlate
          </Link>
          <nav aria-label="主导航">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeProps={{ 'aria-current': 'page' }}>
                {n.label}
              </Link>
            ))}
            <a href={site.sourceUrl} target="_blank" rel="noopener">
              GitHub
            </a>
            <a className="top-pill" href={site.releasesUrl} target="_blank" rel="noopener">
              <GitHubIcon size={14} />
              <span>MIT 开源</span>
            </a>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="foot">
        <div className="wrap foot-in">
          <div className="foot-brand">
            <img src="/icon-256.png" alt="" width="24" height="24" />
            <span>Shotlate · 适用于 macOS {site.minMacOS} 及以上和 Windows 10 / 11</span>
          </div>
          <nav aria-label="页脚">
            <Link to="/">首页</Link>
            <Link to="/manual">使用手册</Link>
            <Link to="/faq">常见问题</Link>
            <Link to="/download">下载</Link>
            <a href={site.sourceUrl} target="_blank" rel="noopener">
              源代码（macOS）
            </a>
            <a href={site.win.sourceUrl} target="_blank" rel="noopener">
              源代码（Windows）
            </a>
          </nav>
          <div className="foot-meta">
            <span>MIT 许可证开源 · 文字识别在本机完成，截图本身不上传。</span>
            <span className="foot-glyph">
              <BrandGlyphIcon size={15} />
              <span>⌥A · shot + translate</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}

function NotFound() {
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
