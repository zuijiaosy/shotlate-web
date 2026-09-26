import { createFileRoute } from '@tanstack/react-router'

import { Rich } from '#/components/Rich'
import { manual } from '#/content/manual'
import { pageHead } from '#/site'

export const Route = createFileRoute('/manual')({
  head: () =>
    pageHead({
      title: '使用手册 · Shotlate',
      description: 'Shotlate 的完整操作说明：选区、7 种标注工具、识别文字、原位翻译、贴图、长截图和设置项，附全部快捷键。',
      path: '/manual',
    }),
  component: Manual,
})

function Manual() {
  return (
    <main className="wrap page manual">
      <aside className="toc" aria-label="目录">
        <p className="toc-h">目录</p>
        <ol>
          {manual.map((s) => (
            <li key={s.id}>
              <a href={'#' + s.id}>{s.title}</a>
            </li>
          ))}
        </ol>
      </aside>
      <article>
        <h1>使用手册</h1>
        <p className="lead">
          这里是 Shotlate 的全部操作。快捷键里的 ⌘ 是 Command，⌥ 是 Option，⇧ 是 Shift。Windows 版的操作相同，⌘ 换成 Ctrl、⌥ 换成 Alt，开始截图默认是 Alt+Shift+A。
        </p>
        {manual.map((s) => (
          <section key={s.id} id={s.id} className="msec">
            <h2>{s.title}</h2>
            {s.intro?.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
            {s.rows && (
              <div className="table">
                <table>
                  <tbody>
                    {s.rows.map(([k, v]) => (
                      <tr key={k}>
                        <th scope="row">
                          <Rich text={k} />
                        </th>
                        <td>
                          <Rich text={v} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.steps && (
              <ol className="msteps">
                {s.steps.map((step) => (
                  <li key={step.title}>
                    <h3>{step.title}</h3>
                    {step.text.map((p) => (
                      <p key={p}>
                        <Rich text={p} />
                      </p>
                    ))}
                    {step.shot && (
                      <img
                        className="shot"
                        src={step.shot.src}
                        width={step.shot.w}
                        height={step.shot.h}
                        alt={step.shot.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </li>
                ))}
              </ol>
            )}
            {s.after &&
              (s.id === 'scroll' || s.id === 'translate' ? (
                <ul>
                  {s.after.map((p) => (
                    <li key={p}>
                      <Rich text={p} />
                    </li>
                  ))}
                </ul>
              ) : (
                s.after.map((p) => (
                  <p key={p}>
                    <Rich text={p} />
                  </p>
                ))
              ))}
            {s.code && (
              <pre className="term">
                <code>{s.code}</code>
              </pre>
            )}
          </section>
        ))}
      </article>
    </main>
  )
}
