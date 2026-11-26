# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Chinese-speaking macOS (primary) and Windows (secondary) developers, designers, researchers, and everyday knowledge workers who frequently capture windows or regions, annotate instructions, read foreign-language interfaces/docs/error messages, pin reference images on screen, or record quick scrolling captures and GIFs.

## Product Purpose

The official website (`shotlate.pages.dev`) introduces Shotlate, demonstrates its core workflows honestly with real app-rendered captures, lets visitors download the latest macOS or Windows release immediately, and provides the complete user manual and FAQ. Success means a first-time visitor grasps both Shotlate's lightweight restraint and its in-place translation capability within seconds, trusts that it is free, open-source, and privacy-respecting, and downloads the app.

## Positioning

Shotlate is a small, sharp, free open-source (MIT) screenshot tool that deliberately strips away bloated all-in-one features (no whiteboard, history manager, beautifier frames, or subscription) and focuses on the daily path: **capture → annotate → copy / save / pin / OCR / in-place translate**, plus scrolling capture, GIF recording, and QR scanning. Its signature mechanism is **in-place translation**: pressing `Y` runs local OCR and repaints translated Chinese (or other target languages) back onto the screenshot at the original text's coordinates, size, and background color — running offline via macOS 26 system translation by default, with zero-key free web engines (Bilibili Index-Translate, Tencent, Google, Bing) and optional OpenAI-compatible LLMs.

## Operating Context

- Core macOS workflow: `⌥A` capture (or delayed capture / menu bar) → window highlight & pixel loupe → `1`–`7` annotations (rectangle, arrow, brush, mosaic, magnifier, text, numbered callouts with inline captions) → `X` editable OCR (manual copy, never overwrites clipboard automatically) / `Y` in-place translation / `T` pin to screen (with background text selection, translation, re-annotation) / `S` scrolling capture / `G` GIF recording (15 fps, up to 60s / 200 MB) / `⌘C` copy / `⌘S` save to `~/Downloads`.
- Windows companion app (separate Rust repo): `Alt+Shift+A` capture, same `1`–`7` / `X` / `Y` / `T` shortcuts, local PP-OCRv6 (~23 MB one-time download), free Tencent translation, manual & auto scrolling capture, and pins with text selection. GIF recording, QR scan, delayed capture, clipboard pin, and pin translation/re-annotation are macOS-only.
- Website spans four routes: Home (`/`), Manual (`/manual`), FAQ (`/faq`), and Download (`/download`), plus `/404`. All four routes should share a unified redesigned visual system, with macOS promoted as the primary experience and Windows given a clear, honest download and feature-comparison path.

## Capabilities and Constraints

- Technical stack: TanStack Start + React 19 + Vite 8 + static prerendering (`pnpm run build`), deployed to Cloudflare Pages (`https://shotlate.pages.dev`).
- Real metrics only: macOS universal DMG ~5.9 MB (5.62 MiB), pure Swift + Sparkle auto-update only, ~55 MB idle resident RAM (~70 MB after use), requires macOS 14+; Windows installer ~7 MB (x64 & ARM64), ~20 MB resident RAM, requires Windows 10 2004+.
- Privacy truth: OCR is always local; macOS 26+ system translation is local/offline; online engines only send recognized text, never the screenshot image itself.
- Language: Simplified Chinese UI and copy (`zh-CN`), with English/technical identifiers (`Shotlate`, shortcuts, `MIT`, `GitHub`, `macOS`, `Windows`) where accurate.
- Non-goals: Never invent user testimonials, star/download counts, press quotes, pricing tiers, or removed/unimplemented features.

## Brand Commitments

- Brand name: **Shotlate** (shot + translate).
- Official app icon: new macOS 26 layered cobalt-blue B2 icon featuring three selection corners, a white rounded tile with 「文」, and an open-center reticle (`public/icon-256.png`, `public/favicon.png`, `public/favicon.ico`, `public/apple-touch-icon.png`).
- Official menu-bar glyph: three selection corners + open-center reticle (`BrandGlyph`).
- Voice: direct, honest, understated, concrete — explains what the tool actually does and what it intentionally leaves out, without marketing hype.

## Evidence on Hand

- Real app-rendered videos and screenshots in `public/shots/`:
  - `capture-flow.mp4` + `capture-flow-poster.webp` (full capture → annotate → OCR sequence)
  - `translate.mp4` + `translate-before.webp` + `translate-after.webp` (real in-place translation demo)
  - `magnifier.webp`, `selected.webp`, `annotate.webp`, `ocr.webp`, `mosaic.webp`, `long.webp`, `memory.webp`
  - `settings-translate-system.webp`, `settings-translate-llm.webp`, `deepseek-*.webp`
  - `win-capture-flow.mp4`, `win-scroll-auto.mp4`, `win-scroll-panel.webp`, `win-settings-translate-*.webp`
- Complete structured manual (`src/content/manual.ts`) and FAQ (`src/content/faq.ts`).
- Absences (must not be fabricated): no customer logos, no user reviews/testimonials, no download counter or analytics badges.

## Product Principles

1. **Prove with the real tool**: Show real captures, real in-place translation transitions, real shortcuts, and real memory/size numbers instead of abstract marketing claims.
2. **Restraint matches the product**: Visual craft and memorability come from precision, typography, layout rhythm, and interactive clarity — never clutter or decorative bloat.
3. **macOS leads, Windows stays clear**: Lead with the flagship macOS experience while keeping Windows visitors one click away from their download and accurate feature scope.
4. **Honest scope across all four routes**: Persuade on the landing page, then keep the Manual, FAQ, and Download pages effortless to scan and read inside the same visual system.
