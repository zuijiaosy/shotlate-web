import { Link, createFileRoute } from '@tanstack/react-router'

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

// What the Windows version has. Long screenshots, QR scanning, delayed capture, pasting from the clipboard
// and translating / re-annotating pins are macOS only for now.
const winIncluded = [
  '截图：单击选窗口或全屏，放大镜取色，多屏和不同缩放比例',
  '标注：矩形、箭头、画笔、马赛克、放大镜、文字、序号，快捷键 1–7，可自己改',
  '识别：本机识别文字，结果可以编辑后再复制',
  '翻译：译文画回原位',
  '贴图：钉在屏幕上，缩放、透明度，在贴图上直接选中、复制文字',
]

const included = [
  '截图：单击选窗口或全屏，放大镜取色，方向键微调选区，上次选区，延时截图',
  '标注：矩形、箭头、画笔、马赛克（格子 / 毛玻璃）、放大镜、文字、序号，快捷键 1–7，可自己改',
  '识别：文字识别，结果可以编辑后再复制；扫描屏幕上的二维码和条形码',
  '翻译：译文画回原位，截图和贴图上都能用',
  '贴图：钉在屏幕上，缩放、透明度、在贴图里选择文字、翻译和再标注',
  '长截图：边滚边拼，固定页眉只保留一份',
]

function Download() {
  const direct = site.dmgUrl !== null
  return (
    <main className="wrap page narrow">
      <h1>下载 Shotlate</h1>
      <p className="lead">免费，MIT 许可证开源。有 macOS 和 Windows 两个版本，功能和操作方式一致，Windows 版暂时没有长截图和扫码。</p>
      <p className="platforms">
        <a href="#mac">macOS 版</a> · <a href="#windows">Windows 版</a>
      </p>

      <h2 id="mac" className="platform">macOS</h2>
      <p>最新版本，安装包约 3.5 MB，适用于 macOS {site.minMacOS} 及以上，Apple 芯片和 Intel 通用。</p>

      <p className="cta">
        <a className="btn" href={downloadUrl}>
          {direct ? '下载 Shotlate-latest.dmg' : '前往下载最新版'}
        </a>
      </p>
      {!direct && <p className="note">会打开 GitHub 上的最新发布页，点页面底部的 Shotlate-版本号.dmg 下载。</p>}
      {direct && (
        <p className="note">
          也可以在 <a href={site.releasesUrl}>GitHub 发布页</a> 下载，那里有每个版本的更新说明。
        </p>
      )}

      <section className="steps">
        <h3>安装</h3>
        <ol>
          <li>打开下载的 .dmg，把 Shotlate 拖进「应用程序」文件夹。</li>
          <li>
            第一次打开时，如果系统提示“无法验证开发者”，打开「系统设置 → 隐私与安全性」，在页面底部点「仍要打开」。提示“已损坏”时，在终端运行 <code>xattr -dr com.apple.quarantine /Applications/Shotlate.app</code>。
          </li>
          <li>
            打开「系统设置 → 隐私与安全性 → 屏幕与系统录音」，允许 Shotlate，然后退出并重新打开 Shotlate。没有这项权限时，截到的只有桌面壁纸。
          </li>
          <li>菜单栏里出现 Shotlate 图标后，按 ⌥A 开始第一次截图。</li>
        </ol>
      </section>

      <section className="steps">
        <h3>从源代码构建</h3>
        <p>只需要 Command Line Tools，不需要安装 Xcode。在源代码目录里运行：</p>
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
          钥匙串里有 Apple Development 证书时，构建脚本会自动用它签名，也可以用 <code>SIGN_IDENTITY</code> 指定。用 ad-hoc 签名时，每次重新构建后系统可能会再次请求屏幕录制权限。
        </p>
        <p>
          <a href={site.sourceUrl}>获取源代码</a>
        </p>
      </section>

      <section className="steps">
        <h3>包含的功能</h3>
        <ul>
          {included.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </section>

      <h2 id="windows" className="platform">Windows</h2>
      <p>
        最新版本，安装包约 7 MB，适用于 {site.win.minWindows} 及以上和 Windows 11。x64 和 ARM64（骁龙等）都有原生版本，安装不需要管理员权限。
      </p>
      <p className="cta">
        <a className="btn" href={site.win.releasesUrl}>
          前往下载 Windows 版
        </a>
      </p>
      <p className="note">会打开 GitHub 上的最新发布页。大多数电脑下载 Shotlate-版本号-x64.exe，骁龙等 ARM 电脑下载 -arm64.exe。</p>

      <section className="steps">
        <h3>安装</h3>
        <ol>
          <li>双击下载的安装程序，按提示安装。会装在当前用户目录下，并在桌面放一个图标。</li>
          <li>如果出现“Windows 已保护你的电脑”，点「更多信息」→「仍要运行」。安装包没有购买代码签名证书，第一次运行时 SmartScreen 会拦一下。</li>
          <li>第一次打开时会询问是否下载文字识别组件（约 23 MB，只需一次）。不下载也能截图、标注、复制、保存和贴图，以后可以在「设置 → 通用」里下载。</li>
          <li>任务栏右下角的托盘里出现 Shotlate 图标后，按 Alt+Shift+A 开始第一次截图。</li>
        </ol>
        <p>快捷键和 macOS 版对应：⌘ 换成 Ctrl，⌥ 换成 Alt；工具的单键快捷键（1–7、X、Y、T）完全一样。有新版本时会提示，由你决定何时安装。</p>
      </section>

      <section className="steps">
        <h3>从源代码构建</h3>
        <p>
          Windows 版用 Rust 编写，源代码在单独的仓库里。装好 Rust 后在源代码目录运行 <code>cargo build --release</code>，产物是 <code>target\release\Shotlate.exe</code>，单个文件即可运行。
        </p>
        <p>
          <a href={site.win.sourceUrl}>获取 Windows 版源代码</a>
        </p>
      </section>

      <section className="steps">
        <h3>包含的功能</h3>
        <ul>
          {winIncluded.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <p>长截图、扫码、延时截图、从剪贴板贴图、贴图翻译和再标注目前只有 macOS 版。</p>
        <p>
          每个功能的具体用法见<Link to="/manual">使用手册</Link>，安装和权限问题见<Link to="/faq">常见问题</Link>。
        </p>
      </section>
    </main>
  )
}
