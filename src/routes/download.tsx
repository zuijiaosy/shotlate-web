import { Link, createFileRoute } from '@tanstack/react-router'

import { CheckSmallIcon, DownloadIcon } from '#/components/Icons'
import { downloadUrl, pageHead, site } from '#/site'

export const Route = createFileRoute('/download')({
  head: () =>
    pageHead({
      title: '下载 Shotlate · macOS 与 Windows 截图工具',
      description: `下载 Shotlate 最新版，免费开源的截图工具：macOS 版适用于 macOS ${site.minMacOS} 及以上，Windows 版适用于 ${site.win.minWindows} 及以上和 Windows 11。附安装步骤、首次授权说明和从源码构建的方法。`,
      path: '/download',
    }),
  component: Download,
})

const included = [
  '截图：单击选窗口或全屏，放大镜取色，方向键微调选区，上次选区，延时截图',
  '标注：矩形、箭头、画笔、马赛克（格子 / 毛玻璃）、放大镜、文字、序号，快捷键 1–7，可自己改',
  '识别：文字识别，结果可以编辑后再复制；扫描屏幕上的二维码和条形码',
  '免费翻译：默认用系统自带的翻译，本机完成；也可以选 B站、腾讯、谷歌、必应，无需 Key，截图和贴图上都能用',
  '贴图：钉在屏幕上，缩放、透明度、在贴图里选择文字、翻译和再标注',
  '长截图：手动或自动滚动，固定栏只保留一份',
  '录制 GIF：框选区域录成动图，复制后粘贴到聊天软件里仍会动',
]

const winIncluded = [
  '截图：单击选窗口或全屏，放大镜取色，多屏和不同缩放比例',
  '标注：矩形、箭头、画笔、马赛克、放大镜、文字、序号，快捷键 1–7，可自己改',
  '识别：本机识别文字，结果可以编辑后再复制',
  '免费翻译：无需 Key，译文画回原位',
  '长截图：手动或自动滚动，最长 60,000 像素',
  '贴图：钉在屏幕上，缩放、透明度，在贴图上直接选中、复制文字',
]

function Download() {
  const direct = site.dmgUrl !== null
  return (
    <main>
      <section className="page-banner">
        <div className="ruler-top" aria-hidden="true" />
        <div className="wrap page-banner-in">
          <h1>下载 Shotlate</h1>
          <p className="page-lead">
            免费，MIT 许可证开源。macOS 为主推原生版本，Windows 版独立维护；两平台均支持免费原位翻译与手动 / 自动长截图，核心快捷键一致。
          </p>
          <div className="jump-pills">
            <a href="#mac">macOS 版（主推 · 3.5 MB）</a>
            <a href="#windows">Windows 版（7 MB）</a>
          </div>
        </div>
      </section>

      <div className="wrap page-body">
        <section id="mac" className="platform-card is-primary">
          <span className="handle h-tl" aria-hidden="true" />
          <span className="handle h-tr" aria-hidden="true" />
          <span className="handle h-bl" aria-hidden="true" />
          <span className="handle h-br" aria-hidden="true" />

          <div className="platform-head">
            <div>
              <h2>macOS 版</h2>
              <p className="platform-meta">
                安装包约 3.5 MB · 适用于 macOS {site.minMacOS} 及以上 · Apple 芯片与 Intel 通用 · 内置 Sparkle 自动更新
              </p>
            </div>
            <a className="btn" href={downloadUrl}>
              <DownloadIcon size={16} />
              <span>{direct ? '下载 Shotlate-latest.dmg' : '下载 macOS 最新版'}</span>
            </a>
          </div>
          {!direct && <p className="platform-note">会打开 GitHub 最新发布页，点击页面底部的 Shotlate-版本号.dmg 即可下载。</p>}
          {direct && (
            <p className="platform-note">
              也可以在{' '}
              <a href={site.releasesUrl} target="_blank" rel="noopener">
                GitHub 发布页
              </a>{' '}
              查看每个版本的更新说明。
            </p>
          )}

          <div className="dl-sections">
            <div className="dl-block">
              <h3>安装与首次授权</h3>
              <ol>
                <li>打开下载的 .dmg，把 Shotlate 拖进「应用程序」文件夹。</li>
                <li>
                  第一次打开时，若系统提示“无法验证开发者”，打开「系统设置 → 隐私与安全性」在底部点「仍要打开」。提示“已损坏”时，在终端运行{' '}
                  <code>xattr -dr com.apple.quarantine /Applications/Shotlate.app</code>。
                </li>
                <li>
                  打开「系统设置 → 隐私与安全性 → 屏幕与系统录音」，允许 Shotlate，然后退出并重新打开。没有这项权限时，截到的只有桌面壁纸。
                </li>
                <li>菜单栏出现 Shotlate 选区准星图标后，按 <kbd>⌥A</kbd> 开始第一次截图。</li>
              </ol>
            </div>

            <div className="dl-block">
              <h3>从源代码构建</h3>
              <p style={{ marginTop: 0 }}>只需要 Command Line Tools，不需要安装 Xcode：</p>
              <pre className="term">
                <code>
                  <span className="c"># 没装过 Command Line Tools 时先运行这一行</span>
                  {'\n'}
                  <span className="p">$ </span>xcode-select --install{'\n\n'}
                  <span className="c"># 生成 build/Shotlate.app 并打开</span>
                  {'\n'}
                  <span className="p">$ </span>scripts/build-app.sh{'\n'}
                  <span className="p">$ </span>open build/Shotlate.app
                </code>
              </pre>
              <p>
                钥匙串里有 Apple Development 证书时，构建脚本会自动用它签名，也可以用 <code>SIGN_IDENTITY</code> 指定。
                {' '}
                <a href={site.sourceUrl} target="_blank" rel="noopener" className="more">
                  获取源代码
                </a>
              </p>
            </div>

            <div className="dl-block dl-full">
              <h3>macOS 版包含的功能</h3>
              <ul className="check-list">
                {included.map((i) => (
                  <li key={i}>
                    <CheckSmallIcon size={15} />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="windows" className="platform-card">
          <div className="platform-head">
            <div>
              <h2>Windows 版</h2>
              <p className="platform-meta">
                安装包约 7 MB · 适用于 {site.win.minWindows} 及以上和 Windows 11 · x64 与 ARM64 原生 · 无需管理员权限
              </p>
            </div>
            <a className="btn alt" href={site.win.releasesUrl} target="_blank" rel="noopener">
              <DownloadIcon size={16} />
              <span>前往下载 Windows 版</span>
            </a>
          </div>
          <p className="platform-note">
            会打开 GitHub 最新发布页。大多数电脑下载 <code>Shotlate-版本号-x64.exe</code>，骁龙等 ARM 电脑下载 <code>-arm64.exe</code>。
          </p>

          <div className="dl-sections">
            <div className="dl-block">
              <h3>安装</h3>
              <ol>
                <li>双击下载的安装程序按提示安装，装在当前用户目录下。</li>
                <li>
                  如出现“Windows 已保护你的电脑”，点「更多信息」→「仍要运行」（安装包未购买代码签名证书，首次运行 SmartScreen 会提示）。
                </li>
                <li>
                  第一次打开会询问是否下载文字识别组件（约 23 MB，只需一次）；不下载也可截图、标注与贴图，以后可在「设置 → 通用」下载。
                </li>
                <li>任务栏右下角托盘出现图标后，按 <kbd>Alt+Shift+A</kbd> 开始第一次截图。</li>
              </ol>
            </div>

            <div className="dl-block">
              <h3>从源代码构建</h3>
              <p style={{ marginTop: 0 }}>Windows 版用 Rust 编写，装好 Rust 后运行即可得到单文件可执行程序：</p>
              <pre className="term">
                <code>
                  <span className="p">$ </span>cargo build --release{'\n'}
                  <span className="c"># 产物位于 target\release\Shotlate.exe</span>
                </code>
              </pre>
              <p>
                <a href={site.win.sourceUrl} target="_blank" rel="noopener" className="more">
                  获取 Windows 版源代码
                </a>
              </p>
            </div>

            <div className="dl-block dl-full">
              <h3>Windows 版包含的功能</h3>
              <ul className="check-list">
                {winIncluded.map((i) => (
                  <li key={i}>
                    <CheckSmallIcon size={15} />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <p>
                录制 GIF、扫码、延时截图、从剪贴板贴图、贴图翻译和再标注目前仅 macOS 版支持。详细用法见
                <Link to="/manual">使用手册</Link>，常见问题见<Link to="/faq">常见问题</Link>。
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
