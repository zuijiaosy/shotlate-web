import { Link, createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { Rich } from '#/components/Rich'
import { allFaqs } from '#/content/faq'
import { downloadUrl, jsonLd, pageHead, site } from '#/site'

const title = 'Shotlate：小而精的 macOS 截图工具，截图、标注、贴图和原位翻译'
const description =
  'Shotlate 是免费开源的 macOS 截图工具：按 ⌥A 截图，7 种常用标注工具，本机识别文字，外文截图按 Y 就地翻成中文，还能把截图钉在屏幕上对照。支持 macOS 14 及以上。'

export const Route = createFileRoute('/')({
  head: () => ({
    ...pageHead({ title, description, path: '/' }),
    scripts: [
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Shotlate',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: `macOS ${site.minMacOS}+`,
        license: 'https://opensource.org/licenses/MIT',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
        description,
        url: site.url + '/',
        image: site.url + '/og.png',
        downloadUrl,
      }),
    ],
  }),
  component: Home,
})

function Clip({ src, poster, w, h, label }: { src: string; poster: string; w: number; h: number; label: string }) {
  return (
    <video className="shot" src={src} poster={poster} width={w} height={h} autoPlay muted loop playsInline preload="metadata" aria-label={label} />
  )
}

function Shot({ src, w, h, alt }: { src: string; w: number; h: number; alt: string }) {
  return <img className="shot" src={src} width={w} height={h} alt={alt} loading="lazy" decoding="async" />
}

function Feature({ id, title, children, media, caption, flip, wide }: { id?: string; title: string; children: ReactNode; media: ReactNode; caption?: string; flip?: boolean; wide?: boolean }) {
  return (
    <section className={'feat' + (flip ? ' flip' : '') + (wide ? ' wide' : '')} id={id}>
      <div className="feat-text">
        <h2>{title}</h2>
        {children}
      </div>
      <figure className="feat-media">
        {media}
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </section>
  )
}

function Keys({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="keys">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>
            <Rich text={k} />
          </dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

const teaser = ['翻译会上传我的截图吗？', '截图里只有桌面壁纸，看不到窗口', '为什么功能比其他截图工具少？', '不配置翻译还能用吗？']

function Home() {
  return (
    <main>
      <section className="hero wrap">
        <p className="kicker">macOS 截图工具 · 小而精 · 免费开源</p>
        <h1>
          截图、标注、贴图，
          <br />
          外文截图按一下就是中文
        </h1>
        <p className="lead">
          按 <kbd>⌥A</kbd> 开始截图。只保留每天真正用得上的功能；文字识别在本机完成，翻译时只把识别出的文字发给你配置的接口，截图本身不上传。
        </p>
        <div className="cta">
          <a href={downloadUrl} className="btn">
            下载 Shotlate
          </a>
          <Link to="/manual" className="more">
            看使用手册
          </Link>
        </div>
        <p className="req">
          安装包约 3.5 MB · 需要 macOS {site.minMacOS} 或更高版本 · Apple 芯片和 Intel 通用 · MIT 许可证
        </p>
        <figure className="hero-media">
          <Clip src="/shots/capture-flow.mp4" poster="/shots/capture-flow-poster.webp" w={1280} h={614} label="Shotlate 截图过程：选中窗口、框选、标注、识别文字" />
          <figcaption>一次完整的截图：悬停选中窗口，框选，画框、箭头和序号，最后按 X 识别文字。画面由 Shotlate 的截图界面直接渲染。</figcaption>
        </figure>
      </section>

      <div className="wrap">
        <Feature
          id="capture"
          title="框选之前，先看清每个像素"
          media={<Shot src="/shots/magnifier.webp" w={1400} h={720} alt="截图时的放大镜，显示坐标和像素颜色" />}
          caption="光标下的窗口自动高亮，放大镜里是坐标和像素颜色。"
        >
          <p>光标移到哪个窗口上，Shotlate 就把它框出来，单击即可选中；什么都没指到时单击选中整个屏幕。放大镜跟着光标显示坐标和颜色，按 C 复制色值，按 ⇧ 在 HEX 和 RGB 之间切换。</p>
          <Keys
            rows={[
              ['[⌥A]', '开始截图'],
              ['[←] [→] [↑] [↓]', '光标移动 1pt，按住 ⇧ 移动 10pt'],
              ['[R]', '回到上一次的选区'],
            ]}
          />
        </Feature>

        <Feature
          flip
          title="工具栏只有图标，快捷键按你的习惯改"
          media={<Shot src="/shots/selected.webp" w={1600} h={681} alt="选区下方的工具栏：7 个标注工具、撤销、OCR、翻译、贴图、长截图、退出、保存和完成" />}
          caption="选好区域后，工具栏出现在选区下方。"
        >
          <p>7 个标注工具的快捷键默认是 1 到 7，和工具栏从左到右的顺序一致。鼠标停在按钮上会弹出名称和快捷键；移到这张卡片上点一下按键，再按一个字母或数字就改好了，被占用时两个按钮互换。</p>
          <p>选区下方放不下时，工具栏会竖着贴在选区旁边。</p>
        </Feature>

        <Feature
          wide
          id="annotate"
          title="7 种标注工具，各记各的颜色"
          media={<Shot src="/shots/annotate.webp" w={1600} h={749} alt="截图上的红色矩形、虚线箭头、序号、马赛克和文字标注" />}
          caption="矩形、虚线箭头、序号、马赛克、画笔和文字。"
        >
          <p>矩形、箭头、画笔、马赛克、放大镜、文字、序号。每种工具分别记住自己的颜色、粗细和线型，重启后也保留。</p>
          <ul className="plain">
            <li>按住 ⇧ 画正方形和 45° 箭头，画笔画直线。</li>
            <li>矩形、箭头、画笔可选虚线和点线；箭头有实心、线条、双向三种。</li>
            <li>序号自动递增，删掉中间一个，后面的自动重排。</li>
            <li>放大镜工具把一小块区域放大 2 倍，画在旁边。</li>
          </ul>
        </Feature>

        <Feature
          wide
          id="ocr"
          title="识别文字，改好再复制"
          media={<Shot src="/shots/ocr.webp" w={1600} h={733} alt="识别结果面板：13 行文字，可以编辑后点复制" />}
          caption="按 X 后的识别面板，图上同时标出识别到的每一行。"
        >
          <p>按 X 识别选区里的文字，结果显示在选区旁边，可以直接修改错字，改好后点「复制」。不会自动覆盖你剪贴板里原有的内容。</p>
          <p>识别用的是 macOS 自带的 Vision 框架，不联网，中文、英文、日文、韩文都能识别。</p>
        </Feature>

        <Feature
          flip
          id="translate"
          title="英文截图，按 Y 看中文"
          media={<Clip src="/shots/translate.mp4" poster="/shots/translate-after.webp" w={1200} h={700} label="一份英文版本说明在原位变成中文" />}
          caption="一份英文版本说明，译文画回原来的位置。"
        >
          <p>Shotlate 先在本机识别文字，再把文字发给你配置的翻译接口，拿到译文后按原文的位置、字号和颜色画回去。再按一次 Y 切回原文。</p>
          <p>接口可以用任何 OpenAI 兼容服务，默认是 DeepSeek。贴图上也能翻译，钉在屏幕上的英文文档同样可以按 Y。</p>
        </Feature>

        <Feature
          flip
          title="该遮的遮住，其他的不动"
          media={<Shot src="/shots/mosaic.webp" w={1400} h={680} alt="恢复码被格子马赛克遮住，按钮被毛玻璃遮住" />}
          caption="格子马赛克和毛玻璃。"
        >
          <p>马赛克可以用画笔涂，也可以框选，效果分格子和毛玻璃两种。涂错了按 ⌘Z 撤销。</p>
        </Feature>

        <section className="feat" id="pin">
          <div className="feat-text">
            <h2>钉在屏幕上，对照着用</h2>
            <p>按 T 把选区钉在原来的位置，写代码时对照设计稿，填表时对照资料。剪贴板里的图片、访达里复制的图片文件也能直接贴出来。</p>
            <p>贴图里的文字会在后台识别，鼠标移上去就能像在输入框里一样选中复制；按 Y 翻译，按空格接着标注。</p>
          </div>
          <div className="feat-media">
            <Keys
              rows={[
                ['[T]', '把截图钉在屏幕上'],
                ['[⌥⇧V]', '把剪贴板里的图片贴出来'],
                ['滚轮', '以光标为中心缩放，10% 到 800%'],
                ['[⌥] + 滚轮', '调透明度'],
                ['[Y]', '翻译贴图里的外文'],
                ['空格', '在贴图上继续标注'],
                ['[⌥⇧H]', '隐藏或显示全部贴图'],
              ]}
            />
          </div>
        </section>

        <Feature
          id="scroll"
          title="长截图，边滚边拼"
          media={
            <div className="long">
              <img src="/shots/long.webp" width={420} height={2204} alt="拼接好的长截图：固定页眉只出现一次，下面是 60 行列表" loading="lazy" />
            </div>
          }
          caption="Shotlate 自带的长截图测试：60 行列表拼成一张长图，顶部的固定页眉只出现一次。可以在框里滚动查看。"
        >
          <p>框选要滚动的区域后按 S，在框里正常滚动鼠标或触控板，Shotlate 自动拼接，旁边的面板实时显示预览和高度。</p>
          <p>网页顶部固定的导航栏和底部工具栏只保留一份。长图最长 60,000 像素。</p>
        </Feature>

        <Feature
          wide
          id="light"
          title="安装包 3.5 MB，常驻内存约 50 MB"
          media={<Shot src="/shots/memory.webp" w={1650} h={346} alt="活动监视器的内存页：Shotlate 占用 50.0 MB，4 个线程" />}
          caption="活动监视器里的 Shotlate，常驻菜单栏时约 50 MB，和一个 node 进程差不多。"
        >
          <p>纯 Swift 编写，唯一的第三方依赖是负责自动更新的 Sparkle，也不内置浏览器内核。安装包约 3.5 MB，Apple 芯片和 Intel 通用；平时安静地待在菜单栏，内存占用约 50 MB。</p>
        </Feature>

        <section className="extras">
          <h2>还有这些</h2>
          <dl>
            <div>
              <dt>扫码</dt>
              <dd>识别屏幕上所有的二维码和条形码，是网址就能一键打开。</dd>
            </div>
            <div>
              <dt>延时截图</dt>
              <dd>3、5、10 秒后再截，用来截菜单和悬停提示。</dd>
            </div>
            <div>
              <dt>保存到下载文件夹</dt>
              <dd>⌘S 直接保存，默认放在「下载」文件夹，也可以在设置里改。</dd>
            </div>
          </dl>
        </section>

        <section className="faq-teaser">
          <h2>常见问题</h2>
          <div className="qa">
            {allFaqs
              .filter((f) => teaser.includes(f.q))
              .map((f) => (
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
          <p>
            <Link to="/faq">全部问题</Link>
          </p>
        </section>

        <section className="get">
          <img src="/icon-256.png" alt="" width="96" height="96" />
          <div>
            <h2>下载 Shotlate</h2>
            <p>免费，适用于 macOS {site.minMacOS} 及以上。第一次打开时需要允许屏幕录制。</p>
          </div>
          <Link to="/download" className="btn">
            前往下载
          </Link>
        </section>
      </div>
    </main>
  )
}
