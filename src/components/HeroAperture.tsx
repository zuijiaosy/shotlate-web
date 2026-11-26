import { useEffect, useState } from 'react'

import {
  ArrowToolIcon,
  BadgeToolIcon,
  BrushToolIcon,
  CheckToolIcon,
  MagnifierToolIcon,
  MosaicToolIcon,
  NumberToolIcon,
  PinToolIcon,
  RectToolIcon,
  ScrollToolIcon,
  TextToolIcon,
  TranslateToolIcon,
} from './Icons'

type ApertureMode = 'translate' | 'annotate' | 'mosaic' | 'magnifier' | 'ocr' | 'pin' | 'scroll' | 'gif'

const MODE_META: Record<ApertureMode, { dim: string; label: string; keyHint: string }> = {
  translate: { dim: '1120 × 440', label: '原位翻译对照', keyHint: 'Y' },
  annotate: { dim: '960 × 450', label: '7 种标注与序号说明', keyHint: '1' },
  mosaic: { dim: '700 × 340', label: '格子与毛玻璃马赛克', keyHint: '4' },
  magnifier: { dim: '700 × 360', label: '窗口高亮与像素取色', keyHint: '5' },
  ocr: { dim: '960 × 440', label: '本机 OCR（编辑后再复制）', keyHint: 'X' },
  pin: { dim: '630 × 300', label: '贴图浮窗 · 划词与再标注', keyHint: 'T' },
  scroll: { dim: '420 × 2204', label: '长截图 · 固定栏只留一次', keyHint: 'S' },
  gif: { dim: '1280 × 614', label: '15 fps 录制 GIF / 完整流程', keyHint: 'G' },
}

// 11x5 pixel mosaic mask resembling real screenshot redaction.
const MOSAIC_CELLS = [
  1, 3, 2, 4, 1, 2, 4, 3, 1, 2, 4,
  2, 4, 3, 1, 3, 4, 1, 2, 4, 3, 1,
  3, 1, 4, 2, 4, 1, 3, 4, 2, 1, 3,
  1, 2, 1, 4, 2, 3, 4, 1, 3, 4, 2,
  4, 3, 2, 1, 3, 2, 1, 4, 2, 1, 3,
]

export function HeroAperture() {
  const [mode, setMode] = useState<ApertureMode>('translate')
  // In translate mode, clicking [Y] or pressing Y toggles between translated Chinese and original English on the right pane.
  const [translated, setTranslated] = useState(true)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return
      const k = e.key.toLowerCase()
      if (k === 'y') {
        setMode((prev) => {
          if (prev === 'translate') {
            setTranslated((t) => !t)
            return 'translate'
          }
          setTranslated(true)
          return 'translate'
        })
      } else if (k === 'x') {
        setMode('ocr')
      } else if (k === '1' || k === '2' || k === '3' || k === '6' || k === '7') {
        setMode('annotate')
      } else if (k === '4') {
        setMode('mosaic')
      } else if (k === '5') {
        setMode('magnifier')
      } else if (k === 't') {
        setMode('pin')
      } else if (k === 's') {
        setMode('scroll')
      } else if (k === 'g') {
        setMode('gif')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const meta = MODE_META[mode]

  const toggleTranslate = () => {
    if (mode !== 'translate') {
      setMode('translate')
      setTranslated(true)
    } else {
      setTranslated((t) => !t)
    }
  }

  return (
    <div className="aperture-wrap">
      <div className="aperture-top-row">
        <div className="dim-pill" aria-live="polite">
          <span>{meta.dim}</span>
          <span className="dim-sep" aria-hidden="true">·</span>
          <span className="dim-mode">{meta.label}</span>
        </div>
        <div className="aperture-kbd-hint">
          可直接按键试用：<kbd>Y</kbd> 翻译 · <kbd>X</kbd> 识别 · <kbd>1</kbd> 标注 · <kbd>4</kbd> 马赛克 · <kbd>T</kbd> 贴图
        </div>
      </div>

      <div className="aperture-frame">
        {/* 8 authentic selection handles */}
        <span className="handle h-tl" aria-hidden="true" />
        <span className="handle h-tc" aria-hidden="true" />
        <span className="handle h-tr" aria-hidden="true" />
        <span className="handle h-ml" aria-hidden="true" />
        <span className="handle h-mr" aria-hidden="true" />
        <span className="handle h-bl" aria-hidden="true" />
        <span className="handle h-bc" aria-hidden="true" />
        <span className="handle h-br" aria-hidden="true" />

        {mode === 'translate' ? (
          <div className="dual-proof">
            {/* Vertical center cobalt scanline */}
            <div className="dual-divider" aria-hidden="true" />

            {/* Left window: English UI with vermilion annotation & mosaic */}
            <div className="mac-win" aria-label="英文原图示例">
              <div className="mac-side">
                <div className="mac-lights" aria-hidden="true">
                  <span className="dot-r" />
                  <span className="dot-y" />
                  <span className="dot-g" />
                </div>
                <ul className="mac-nav">
                  <li>General</li>
                  <li className="active">Sign-in &amp; security</li>
                  <li>Recovery code</li>
                  <li>Verify</li>
                </ul>
              </div>
              <div className="mac-body">
                <div className="mac-bar">
                  <span>Recovery code</span>
                  <span className="mac-bar-tag">原文</span>
                </div>
                <div className="mac-content">
                  <div className="mac-eyebrow-row">
                    <span className="mac-sub">Sign-in &amp; security</span>
                    <span className="callout-badge">
                      <span className="callout-num">1</span>
                      <span className="callout-txt">先框选区域</span>
                    </span>
                  </div>
                  <div className="annot-box">
                    <div className="mac-title">Recovery code</div>
                    <div className="mac-desc">Verify within 24 hours</div>
                    <div className="mosaic-block" aria-label="马赛克遮挡区域">
                      {MOSAIC_CELLS.map((v, i) => (
                        <span key={i} className={`m-cell m-${v}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center interactive [Y] toggle button */}
            <button
              type="button"
              className={`y-pill ${translated ? 'is-on' : ''}`}
              onClick={toggleTranslate}
              title="点击或按键盘 Y 切换原文与原位译文"
            >
              <span className="y-key">[Y]</span>
              <span>{translated ? '原位翻译' : '切回译文'}</span>
            </button>

            {/* Right window: In-place translated Chinese (or toggled back to English) */}
            <div className={`mac-win ${translated ? 'is-translated' : ''}`} aria-label={translated ? '原位中文译文示例' : '原文对照'}>
              <div className="mac-side">
                <div className="mac-lights" aria-hidden="true">
                  <span className="dot-r" />
                  <span className="dot-y" />
                  <span className="dot-g" />
                </div>
                <ul className="mac-nav">
                  <li>{translated ? '通用' : 'General'}</li>
                  <li className="active">{translated ? '登录与安全' : 'Sign-in & security'}</li>
                  <li>{translated ? '恢复码' : 'Recovery code'}</li>
                  <li>{translated ? '验证' : 'Verify'}</li>
                </ul>
              </div>
              <div className="mac-body">
                <div className="mac-bar">
                  <span>{translated ? '登录与安全' : 'Recovery code'}</span>
                  <span className={`mac-bar-tag ${translated ? 'is-zh' : ''}`}>
                    {translated ? '本机原位译文' : '已切回原文'}
                  </span>
                </div>
                <div className="mac-content">
                  <div className="mac-eyebrow-row">
                    <span className="mac-sub">{translated ? '登录与安全' : 'Sign-in & security'}</span>
                  </div>
                  <div className={`result-box ${translated ? 'is-zh' : ''}`}>
                    <div className="mac-title">{translated ? '恢复码' : 'Recovery code'}</div>
                    <div className="mac-desc">{translated ? '24 小时内验证以保持访问' : 'Verify within 24 hours'}</div>
                    <div className="mosaic-block" aria-hidden="true">
                      {MOSAIC_CELLS.map((v, i) => (
                        <span key={i} className={`m-cell m-${v}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : mode === 'annotate' ? (
          <div className="aperture-media">
            <img src="/shots/annotate.webp" width={1600} height={749} alt="Shotlate 标注实机截图：红色矩形、箭头、序号说明、马赛克和文字" />
          </div>
        ) : mode === 'mosaic' ? (
          <div className="aperture-media">
            <img src="/shots/mosaic.webp" width={1400} height={680} alt="Shotlate 马赛克实机截图：格子与毛玻璃两种遮挡效果" />
          </div>
        ) : mode === 'magnifier' ? (
          <div className="aperture-media">
            <img src="/shots/magnifier.webp" width={1400} height={720} alt="Shotlate 选区放大镜实机截图：显示坐标与像素颜色" />
          </div>
        ) : mode === 'ocr' ? (
          <div className="aperture-media">
            <img src="/shots/ocr.webp" width={1600} height={733} alt="Shotlate 文字识别实机截图：识别结果可编辑后再复制" />
          </div>
        ) : mode === 'pin' ? (
          <div className="aperture-pin-stage">
            <div className="pin-demo-card">
              <div className="pin-demo-badge">当前贴图 · 蓝色边框 · 100%</div>
              <img src="/shots/translate-after.webp" width={1200} height={700} alt="贴图原位翻译效果：版本说明已原地翻为中文" />
            </div>
            <div className="pin-demo-notes">
              <div className="pin-demo-title">按 T 钉在屏幕原位，直接划词与再翻译</div>
              <p>写代码对照设计稿、看外文文档对照资料时，贴图常驻最前；鼠标划过文字自动变 I 形光标，可直接拖选复制，按 Y 随时切回原文，按空格继续标注。</p>
              <div className="pin-demo-keys">
                <span><kbd>T</kbd> 钉在屏幕上</span>
                <span><kbd>⌥⇧V</kbd> 贴剪贴板图</span>
                <span><kbd>滚轮</kbd> 缩放 10%–800%</span>
                <span><kbd>⌥</kbd> + 滚轮 调透明</span>
                <span><kbd>Y</kbd> 贴图翻译</span>
                <span><kbd>空格</kbd> 再标注</span>
              </div>
            </div>
          </div>
        ) : mode === 'scroll' ? (
          <div className="aperture-scroll-stage">
            <div className="aperture-scroll-box">
              <img src="/shots/long.webp" width={420} height={2204} alt="Shotlate 长截图拼接结果：60 行列表，固定页眉只出现一次" />
            </div>
            <div className="pin-demo-notes">
              <div className="pin-demo-title">按 S 边滚边拼，最长 60,000 像素</div>
              <p>框选区域后手动滚动或开启自动滚动，顶部导航栏和底部工具栏只保留一次，不会在长图里重复出现。可以在左侧框里直接滚动查看实测拼接图。</p>
              <div className="pin-demo-keys">
                <span><kbd>S</kbd> 开始长截图</span>
                <span><kbd>C</kbd> / <kbd>↩</kbd> 复制</span>
                <span><kbd>S</kbd> 保存</span>
                <span><kbd>T</kbd> 贴图</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="aperture-media">
            <video
              src="/shots/capture-flow.mp4"
              poster="/shots/capture-flow-poster.webp"
              width={1280}
              height={614}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Shotlate 完整截图流程演示"
            />
          </div>
        )}

        {/* Signature floating pure-icon toolbar straddling the bottom border */}
        <div className="aperture-toolbar" role="toolbar" aria-label="Shotlate 工具栏演示">
          <button type="button" className={mode === 'annotate' ? 'is-active' : ''} onClick={() => setMode('annotate')} data-tip="矩形 [1]" aria-label="矩形 1">
            <RectToolIcon />
          </button>
          <button type="button" onClick={() => setMode('annotate')} data-tip="箭头 [2]" aria-label="箭头 2">
            <ArrowToolIcon />
          </button>
          <button type="button" onClick={() => setMode('annotate')} data-tip="画笔 [3]" aria-label="画笔 3">
            <BrushToolIcon />
          </button>
          <button type="button" className={mode === 'mosaic' ? 'is-active' : ''} onClick={() => setMode('mosaic')} data-tip="马赛克 [4]" aria-label="马赛克 4">
            <MosaicToolIcon />
          </button>
          <button type="button" className={mode === 'magnifier' ? 'is-active' : ''} onClick={() => setMode('magnifier')} data-tip="放大镜 [5]" aria-label="放大镜 5">
            <MagnifierToolIcon />
          </button>
          <button type="button" onClick={() => setMode('annotate')} data-tip="文字 [6]" aria-label="文字 6">
            <TextToolIcon />
          </button>
          <button type="button" onClick={() => setMode('annotate')} data-tip="序号 [7]" aria-label="序号 7">
            <NumberToolIcon />
          </button>
          <button type="button" className={mode === 'ocr' ? 'is-active' : ''} onClick={() => setMode('ocr')} data-tip="识别文字 [X]" aria-label="识别文字 X">
            <BadgeToolIcon label="OCR" />
          </button>
          <button type="button" className={`tb-primary ${mode === 'translate' ? 'is-active' : ''}`} onClick={toggleTranslate} data-tip="原位翻译 [Y]" aria-label="原位翻译 Y">
            <TranslateToolIcon />
          </button>
          <button type="button" className={mode === 'pin' ? 'is-active' : ''} onClick={() => setMode('pin')} data-tip="贴图 [T]" aria-label="贴图 T">
            <PinToolIcon />
          </button>
          <button type="button" className={mode === 'scroll' ? 'is-active' : ''} onClick={() => setMode('scroll')} data-tip="长截图 [S]" aria-label="长截图 S">
            <ScrollToolIcon />
          </button>
          <button type="button" className={mode === 'gif' ? 'is-active' : ''} onClick={() => setMode('gif')} data-tip="录制 GIF / 流程 [G]" aria-label="录制 GIF G">
            <BadgeToolIcon label="GIF" />
          </button>
          <button type="button" className="tb-done" onClick={() => setMode('translate')} data-tip="重置为原位翻译演示" aria-label="重置演示">
            <CheckToolIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
