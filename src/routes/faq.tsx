import { Link, createFileRoute } from '@tanstack/react-router'

import { Rich } from '#/components/Rich'
import { allFaqs, faqGroups } from '#/content/faq'
import { jsonLd, pageHead } from '#/site'

const strip = (s: string) => s.replace(/\[([^\]]+)\]/g, '$1').replace(/`([^`]+)`/g, '$1')

export const Route = createFileRoute('/faq')({
  head: () => ({
    ...pageHead({
      title: '常见问题 · Shotlate',
      description: 'Shotlate 常见问题：屏幕录制权限、“无法验证开发者”提示、翻译是否上传截图、API Key 配置、截图保存位置、修改快捷键等。',
      path: '/faq',
    }),
    scripts: [
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: allFaqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a.map(strip).join('\n') },
        })),
      }),
    ],
  }),
  component: FaqPage,
})

function FaqPage() {
  return (
    <main className="wrap page narrow">
      <h1>常见问题</h1>
      <p className="lead">
        没找到答案的话，可以看看<Link to="/manual">使用手册</Link>。
      </p>
      {faqGroups.map((g) => (
        <section key={g.title} className="faq-group">
          <h2>{g.title}</h2>
          <div className="qa">
            {g.items.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                {f.a.map((p) => (
                  <p key={p}>
                    <Rich text={p} />
                  </p>
                ))}
              </details>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
