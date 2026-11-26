import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { HeroAperture } from '#/components/HeroAperture'
import { DownloadIcon } from '#/components/Icons'
import { Rich } from '#/components/Rich'
import { allFaqs } from '#/content/faq'
import { downloadUrl, jsonLd, pageHead, site } from '#/site'

const title = 'Shotlate：小而精的截图工具，截图、标注、贴图和原位翻译（macOS / Windows）'
const description =
  'Shotlate 是免费开源的截图工具：按 ⌥A（Windows 上是 Alt+Shift+A）截图，7 种常用标注工具，本机识别文字，外文截图按 Y 就地翻成中文，还能把截图钉在屏幕上对照。支持 macOS 14 及以上和 Windows 10 / 11。'

export const Route = createFileRoute('/')({
  head: () => ({
    ...pageHead({ title, description, path: '/' }),
    scripts: [
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Shotlate',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: `macOS ${site.minMacOS}+, Windows 10+`,
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

const teaser = [
  '翻译会上传我的截图吗？',
  '截图里只有桌面壁纸，看不到窗口',
  '为什么功能比其他截图工具少？',
  '不配置翻译还能用吗？',
]

function Home() {
  const [captureTab, setCaptureTab] = useState<'flow' | 'magnifier'>('flow')
  const [annotateTab, setAnnotateTab] = useState<'annotate' | 'toolbar' | 'mosaic'>('annotate')
  const [translateTab, setTranslateTab] = useState<'video' | 'after' | 'before'>('video')

  return (
    <main>
      {/* First viewport: A3 Wide-Aperture Header + Panoramic Selection Stage */}
      <section className="hero-canvas">
        <div className="ruler-top" aria-hidden="true" />
        <div className="ruler-left" aria-hidden="true" />
        <div className="wrap hero-inner">
          <div className="hero-head">
            <div className="hero-copy">
              <h1>截一张图，按 Y 原位译成中文</h1>
              <p className="hero-sub">纯原生 3.5 MB · 7 种标注 · 本地离线识别与翻译 · 不上传截图</p>
            </div>
            <div className="hero-actions">
              <div className="hero-cta-row">
                <a href={downloadUrl} className="btn">
                  <DownloadIcon size={16} />
                  <span>下载 macOS 版</span>
                </a>
                <Link to="/download" hash="windows" className="btn alt">
                  Windows 版
                </Link>
              </div>
              <div className="spec-ledger" aria-label="核心规格">
                <span>3.5 MB 安装包</span>
                <span>50 MB 常驻</span>
                <span>macOS {site.minMacOS}+ &amp; Win</span>
              </div>
            </div>
          </div>

          <HeroAperture />

          <nav className="workflow-rail" aria-label="核心流程跳转">
            <a href="#capture">
              <span className="step-num">01</span>
              <span>框选取色</span>
            </a>
            <a href="#annotate">
              <span className="step-num">02</span>
              <span>七种标注</span>
            </a>
            <a href="#translate">
              <span className="step-num">03</span>
              <span>识别与翻译</span>
            </a>
            <a href="#pin">
              <span className="step-num">04</span>
              <span>贴图与长图</span>
            </a>
          </nav>
        </div>
      </section>

      {/* Stage 01: Capture & Pixel Loupe */}
      <section className="band band-white" id="capture">
        <div className="wrap split-grid">
          <div className="split-copy">
            <h2>框选之前，先看清每个像素</h2>
            <p>
              按 <kbd>⌥A</kbd> 开始截图，光标下的窗口自动高亮，单击即可选中；什么都没指到时单击选中整个屏幕。放大镜紧跟光标显示坐标与像素颜色，按 <kbd>C</kbd> 复制色值，按 <kbd>⇧</kbd> 切换 HEX 与 RGB。
            </p>
            <Keys
              rows={[
                ['[⌥A]', '开始截图（Windows 默认 Alt+Shift+A）'],
                ['[←] [→] [↑] [↓]', '光标或选区微调 1pt，按住 ⇧ 每次 10pt'],
                ['[R]', '一键回到上一次的选区'],
                ['[Return] / 双击', '直接复制选区到剪贴板'],
              ]}
            />
          </div>
          <figure className="specimen">
            <div className="specimen-bar">
              <span>{captureTab === 'flow' ? '1280 × 614 · 实机截图全流程' : '640 × 300 pt · 窗口高亮与放大镜取色'}</span>
              <div className="specimen-tabs" role="tablist" aria-label="选区演示切换">
                <button
                  type="button"
                  role="tab"
                  aria-selected={captureTab === 'flow'}
                  className={captureTab === 'flow' ? 'is-active' : ''}
                  onClick={() => setCaptureTab('flow')}
                >
                  完整流程
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={captureTab === 'magnifier'}
                  className={captureTab === 'magnifier' ? 'is-active' : ''}
                  onClick={() => setCaptureTab('magnifier')}
                >
                  放大镜取色
                </button>
              </div>
            </div>
            {captureTab === 'flow' ? (
              <video
                className="shot"
                src="/shots/capture-flow.mp4"
                poster="/shots/capture-flow-poster.webp"
                width={1280}
                height={614}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Shotlate 截图过程：选中窗口、框选、标注、识别文字"
              />
            ) : (
              <img
                className="shot"
                src="/shots/magnifier.webp"
                width={1400}
                height={720}
                alt="截图时的放大镜，显示坐标和像素颜色"
                loading="lazy"
                decoding="async"
              />
            )}
            <figcaption className="specimen-caption">
              {captureTab === 'flow'
                ? '悬停选中窗口 → 框选 → 画框、箭头和序号 → 按 X 识别文字。画面由 Shotlate 截图界面直接渲染。'
                : '光标移到窗口上自动高亮，放大镜实时显示像素坐标与色值，按 C 复制，按 ⇧ 切换 HEX / RGB。'}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Stage 02: 7 Annotation Tools, Toolbar Shortcuts, Mosaic */}
      <section className="band" id="annotate">
        <div className="wrap">
          <div className="band-head">
            <h2>7 种标注工具，各记各的颜色与快捷键</h2>
            <p>
              工具栏只有图标，没有杂乱角标。鼠标停留 500 毫秒弹出名称和快捷键，点一下按键就能改成你顺手的单键，被占用时自动互换。选区下方放不下时自动竖排到侧边。
            </p>
          </div>

          <figure className="specimen">
            <div className="specimen-bar">
              <span>
                {annotateTab === 'annotate'
                  ? '1–7 标注实机渲染 · 矩形、箭头、序号说明、马赛克、文字'
                  : annotateTab === 'toolbar'
                    ? '纯图标工具栏 · 悬停 500ms 改单键快捷键'
                    : '马赛克工具 [4] · 格子与毛玻璃两种遮挡'}
              </span>
              <div className="specimen-tabs" role="tablist" aria-label="标注样本切换">
                <button
                  type="button"
                  role="tab"
                  aria-selected={annotateTab === 'annotate'}
                  className={annotateTab === 'annotate' ? 'is-active' : ''}
                  onClick={() => setAnnotateTab('annotate')}
                >
                  组合标注
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={annotateTab === 'toolbar'}
                  className={annotateTab === 'toolbar' ? 'is-active' : ''}
                  onClick={() => setAnnotateTab('toolbar')}
                >
                  纯图标工具栏
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={annotateTab === 'mosaic'}
                  className={annotateTab === 'mosaic' ? 'is-active' : ''}
                  onClick={() => setAnnotateTab('mosaic')}
                >
                  马赛克与毛玻璃
                </button>
              </div>
            </div>
            {annotateTab === 'annotate' ? (
              <img
                className="shot"
                src="/shots/annotate.webp"
                width={1600}
                height={749}
                alt="截图上的红色矩形、虚线箭头、序号、马赛克和文字标注"
                loading="lazy"
                decoding="async"
              />
            ) : annotateTab === 'toolbar' ? (
              <img
                className="shot"
                src="/shots/selected.webp"
                width={1600}
                height={681}
                alt="选区下方的工具栏：7 个标注工具、撤销、OCR、翻译、贴图、长截图、录制 GIF、退出、保存和完成"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <img
                className="shot"
                src="/shots/mosaic.webp"
                width={1400}
                height={680}
                alt="恢复码被格子马赛克遮住，按钮被毛玻璃遮住"
                loading="lazy"
                decoding="async"
              />
            )}
          </figure>

          <div className="spec-strip-4">
            <div>
              <h3>矩形 / 箭头 / 画笔</h3>
              <p>快捷键 1–3。按住 ⇧ 画正方形、45° 箭头或直线；可选实线、虚线、点线，箭头支持实心、线条与双向。</p>
            </div>
            <div>
              <h3>马赛克与放大镜</h3>
              <p>马赛克（4）可涂抹或框选，提供格子与毛玻璃；放大镜（5）把局部放大 2 倍并用连线标出，两圆可独立拖动。</p>
            </div>
            <div>
              <h3>序号直接带说明</h3>
              <p>序号（7）放下后在右侧直接输入说明文字；下次点击保留说明并放下一个序号，删除中间项自动重排。</p>
            </div>
            <div>
              <h3>独立记忆与滚轮调粗细</h3>
              <p>每种工具分别记住颜色、粗细和线型，重启依然保留；滚动滚轮微调粗细和字号，对选中标注同样有效。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 03: In-place Translation & Local OCR */}
      <section className="band band-tinted" id="translate">
        <div className="wrap">
          <div className="band-head">
            <h2>英文截图，按 Y 原位看中文</h2>
            <p>
              先在本机用 Vision 识别文字，再把译文按原文坐标、字号与底色画回原位；再按一次 <kbd>Y</kbd> 随时切回原文。macOS 26 及以上默认离线直译，联网引擎也只发送识别出的文字，截图本身永不上传。
            </p>
          </div>

          <div className="translate-grid">
            <figure className="specimen">
              <div className="specimen-bar">
                <span>1200 × 700 · 真实译文排版输出</span>
                <div className="specimen-tabs" role="tablist" aria-label="译文演示切换">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={translateTab === 'video'}
                    className={translateTab === 'video' ? 'is-active' : ''}
                    onClick={() => setTranslateTab('video')}
                  >
                    动态切换
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={translateTab === 'after'}
                    className={translateTab === 'after' ? 'is-active' : ''}
                    onClick={() => setTranslateTab('after')}
                  >
                    原位译文
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={translateTab === 'before'}
                    className={translateTab === 'before' ? 'is-active' : ''}
                    onClick={() => setTranslateTab('before')}
                  >
                    英文原图
                  </button>
                </div>
              </div>
              {translateTab === 'video' ? (
                <video
                  className="shot"
                  src="/shots/translate.mp4"
                  poster="/shots/translate-after.webp"
                  width={1200}
                  height={700}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="一份英文版本说明在原位变成中文"
                />
              ) : translateTab === 'after' ? (
                <img
                  className="shot"
                  src="/shots/translate-after.webp"
                  width={1200}
                  height={700}
                  alt="英文版本说明已按原位排版翻译成中文"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <img
                  className="shot"
                  src="/shots/translate-before.webp"
                  width={1200}
                  height={700}
                  alt="翻译前的英文版本说明原图"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <figcaption className="specimen-caption">
                一份英文版本说明，按 Y 原位替换成中文；超长段落自动分批翻译并按原顺序合并，贴图上也能直接按 Y 翻译。
              </figcaption>
            </figure>

            <div className="engine-ledger">
              <div className="engine-ledger-head">
                <span>macOS 免费翻译引擎（5 + 1）</span>
                <span>0 Key 开箱即用</span>
              </div>
              <div className="engine-row">
                <div className="engine-name">
                  <span>系统翻译</span>
                  <span className="engine-tag is-local">macOS 26 默认 · 离线</span>
                </div>
                <p>调用系统自带框架在本机完成，零点几秒出结果，文字不离开电脑。</p>
              </div>
              <div className="engine-row">
                <div className="engine-name">
                  <span>B站 Index-Translate</span>
                  <span className="engine-tag">macOS 14/15 默认</span>
                </div>
                <p>B站官方开源免费接口，译文更自然；系统语言包未下载时自动兜底。</p>
              </div>
              <div className="engine-row">
                <div className="engine-name">
                  <span>腾讯 · 谷歌 · 必应</span>
                  <span className="engine-tag">免费网页接口</span>
                </div>
                <p>多引擎随时切换，腾讯与必应国内直连，谷歌跟随系统代理。</p>
              </div>
              <div className="engine-row">
                <div className="engine-name">
                  <span>OpenAI 兼容大模型</span>
                  <span className="engine-tag">可选自配 Key</span>
                </div>
                <p>默认适配 DeepSeek，老用户已有 Key 自动保留，支持任意兼容接口。</p>
              </div>
            </div>
          </div>

          <div className="ocr-strip" id="ocr">
            <div className="split-copy">
              <h2>识别文字，改好再复制</h2>
              <p>
                按 <kbd>X</kbd> 识别选区里的中文、英文、日文或韩文，结果显示在选区旁的可编辑面板里，同时在图上标出识别到的每一行。改好错字后点「复制」或按 <kbd>C</kbd> 才写入剪贴板，绝不擅自覆盖你原来的剪贴板内容。
              </p>
              <p>
                <Link to="/manual" hash="translate" className="more">
                  查看翻译与 OCR 详细说明
                </Link>
              </p>
            </div>
            <figure className="specimen">
              <div className="specimen-bar">
                <span>1600 × 733 · 本地 Vision 文字识别面板</span>
                <span>手动确认复制</span>
              </div>
              <img
                className="shot"
                src="/shots/ocr.webp"
                width={1600}
                height={733}
                alt="识别结果面板：13 行文字，可以编辑后点复制"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Stage 04: Pins, Scrolling Capture, GIF, QR, Delayed */}
      <section className="band band-white" id="pin">
        <div className="wrap">
          <div className="pin-long-grid">
            <div className="split-copy">
              <h2>钉在屏幕上对照，长页面边滚边拼</h2>
              <p>
                按 <kbd>T</kbd> 把选区钉在原来位置，写代码时对照设计稿，填表时对照信息。贴图里的文字后台自动识别，鼠标滑过即可拖选复制，还能按 <kbd>Y</kbd> 翻译、按空格继续标注。
              </p>
              <Keys
                rows={[
                  ['[T]', '把截图钉在屏幕上（蓝框为当前贴图）'],
                  ['[⌥⇧V]', '从剪贴板或访达复制的图片文件直接贴图'],
                  ['滚轮 / [⌥]+滚轮', '以光标为中心缩放 10%–800% / 调透明度'],
                  ['[Y] / 空格', '翻译贴图里的外文 / 进入贴图再标注'],
                  ['[⌥⇧H]', '一键隐藏或恢复全部贴图（非关闭）'],
                ]}
              />
            </div>

            <figure className="specimen" id="scroll">
              <div className="specimen-bar">
                <span>长截图 [S] · 60 行实测 · 可在框内滚动</span>
                <span>最长 60,000 px</span>
              </div>
              <div className="long-frame">
                <img
                  src="/shots/long.webp"
                  width={420}
                  height={2204}
                  alt="拼接好的长截图：固定页眉只出现一次，下面是 60 行列表"
                  loading="lazy"
                />
              </div>
              <figcaption className="specimen-caption">
                支持手动与自动滚动，固定顶栏和底栏只出现一次；两平台均支持，完成后按 C 复制、S 保存或 T 贴图。
              </figcaption>
            </figure>
          </div>

          <div className="extras-strip">
            <div>
              <h3>录制 GIF（按 G）</h3>
              <p>框选后按 G 直接录成 15 fps 动图，最长 60 秒 / 200 MB；复制后粘贴到微信、Slack 依然会动（macOS）。</p>
            </div>
            <div>
              <h3>屏幕扫码</h3>
              <p>菜单栏「扫描二维码」一次识别所有屏幕上的二维码与条形码，自动复制内容，网址可一键打开（macOS）。</p>
            </div>
            <div>
              <h3>延时截图</h3>
              <p>3 / 5 / 10 秒倒计时显示在菜单栏图标旁，专门用来截取下拉菜单与悬停提示，随时可在菜单取消（macOS）。</p>
            </div>
            <div>
              <h3>一键保存到下载</h3>
              <p>按 ⌘S 直接保存到「下载」文件夹，按 ⇧⌘S 另存为；所有设置改动立即生效，没有多余保存按钮。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Obsidian Telemetry Proof Band: Small & Sharp */}
      <section className="band band-dark" id="light">
        <div className="wrap">
          <div className="band-head">
            <h2>安装包 3.5 MB，常驻内存约 50 MB</h2>
            <p>
              纯 Swift 编写，不内嵌浏览器内核，唯一的第三方依赖是负责自动更新的 Sparkle。Apple 芯片与 Intel 通用，平时安静待在菜单栏里。
            </p>
          </div>

          <div className="proof-grid">
            <div>
              <div className="proof-metrics">
                <div>
                  <div className="proof-val">3.5 MB</div>
                  <div className="proof-label">macOS 通用 DMG</div>
                </div>
                <div>
                  <div className="proof-val">~50 MB</div>
                  <div className="proof-label">常驻菜单栏内存</div>
                </div>
                <div>
                  <div className="proof-val">1 个依赖</div>
                  <div className="proof-label">仅 Sparkle 自动更新</div>
                </div>
                <div>
                  <div className="proof-val">0 字节</div>
                  <div className="proof-label">截图原图上传</div>
                </div>
              </div>
              <figure className="proof-shot">
                <img
                  src="/shots/memory.webp"
                  width={1650}
                  height={346}
                  alt="活动监视器的内存页：Shotlate 占用 50.0 MB，4 个线程"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>活动监视器实测：常驻菜单栏时内存约 50.0 MB，4 个线程，和一个普通 node 进程相近。</figcaption>
              </figure>
            </div>

            <aside className="restraint-box">
              <div>
                <h3>克制，是把不需要的功能删干净</h3>
                <p>判断一个功能时，Shotlate 先问「要不要做」，而不是「能不能塞进去」。</p>
              </div>
              <ul className="omit-list">
                <li>
                  <span className="omit-mark">×</span>
                  <span>不做订阅制、账号体系与广告弹窗</span>
                </li>
                <li>
                  <span className="omit-mark">×</span>
                  <span>不塞白板、截图历史库与花哨美化套壳</span>
                </li>
                <li>
                  <span className="omit-mark">×</span>
                  <span>不绑钥匙串，更新版本后不反复弹密码框</span>
                </li>
                <li>
                  <span className="omit-mark">×</span>
                  <span>识别文字不擅自覆写剪贴板，改好再复制</span>
                </li>
              </ul>
              <p>
                <a href={site.sourceUrl} target="_blank" rel="noopener" className="more" style={{ color: '#8cc2ff' }}>
                  在 GitHub 查看全部源码
                </a>
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Windows Companion Band */}
      <section className="band band-white" id="windows">
        <div className="wrap split-grid">
          <div className="split-copy">
            <h2>Windows 上，也是同一套快捷键</h2>
            <p>
              Windows 版采用 Rust 独立编写，原生轻量（安装包约 7 MB，常驻约 20 MB，x64 与 ARM64 均有原生包）。工具栏、7 种标注、本机 PP-OCRv6 识别、免费原位翻译、贴图划词与自动长截图保持一致：⌘ 换 Ctrl，⌥ 换 Alt，单键快捷键不变。
            </p>
            <p>录制 GIF、扫码、延时截图、从剪贴板贴图、贴图翻译与再标注目前为 macOS 版专有。</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginTop: 4 }}>
              <Link to="/download" hash="windows" className="btn alt">
                下载 Windows 版
              </Link>
              <a href={site.win.sourceUrl} target="_blank" rel="noopener" className="more">
                Windows 源码仓库
              </a>
            </div>
          </div>

          <figure className="specimen">
            <div className="specimen-bar">
              <span>Windows 11 实机录制 · Rust 原生版</span>
              <span>Alt+Shift+A</span>
            </div>
            <video
              className="shot"
              src="/shots/win-capture-flow.mp4"
              poster="/shots/win-capture-flow-poster.webp"
              width={880}
              height={480}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Windows 11 上用 Shotlate 截图：选中记事本窗口，框选，标注，识别文字，再贴图并选中复制文字"
            />
            <figcaption className="specimen-caption">
              选中窗口 → 框选 → 标注与序号说明 → 按 X 本机识别 → 按 T 贴图后直接划词复制。
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="band">
        <div className="wrap faq-layout">
          <div className="faq-intro">
            <h2>常见问题</h2>
            <p>关于权限、隐私、免费翻译与系统支持，先看最常被问到的 4 个问题。</p>
            <p style={{ marginTop: 18 }}>
              <Link to="/faq" className="more">
                查看全部常见问题
              </Link>
            </p>
          </div>
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
        </div>
      </section>

      {/* Final Download Aperture */}
      <section className="closing-band">
        <div className="wrap">
          <div className="closing-aperture">
            <span className="handle h-tl" aria-hidden="true" />
            <span className="handle h-tr" aria-hidden="true" />
            <span className="handle h-bl" aria-hidden="true" />
            <span className="handle h-br" aria-hidden="true" />
            <img src="/icon-256.png" alt="" width="84" height="84" />
            <div className="closing-copy">
              <h2>下载 Shotlate</h2>
              <p>
                免费开源（MIT），支持 macOS {site.minMacOS} 及以上（Apple 芯片与 Intel 通用）和 {site.win.minWindows} 及以上。macOS 首次启动需授权屏幕录制权限。
              </p>
            </div>
            <div className="closing-cta">
              <a href={downloadUrl} className="btn">
                <DownloadIcon size={16} />
                <span>下载 macOS 版</span>
              </a>
              <Link to="/download" className="btn alt">
                安装与构建说明
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
