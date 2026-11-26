---
name: Shotlate Official Website
description: Calibrated Live Selection Aperture design system for Shotlate's macOS and Windows landing page, download hub, user manual, and FAQ.
colors:
  shotlate-cobalt: "#1363d6"
  shotlate-cobalt-deep: "#0e52b6"
  selection-tint: "#e6f0fd"
  annotation-vermilion: "#de4331"
  annotation-vermilion-soft: "#fcebe8"
  desktop-mist: "#e5ebf2"
  workbench-ground: "#f6f8fb"
  aperture-white: "#ffffff"
  recessed-slate: "#edf1f6"
  obsidian-panel: "#121622"
  obsidian-elevated: "#1b2232"
  ink-primary: "#121622"
  ink-secondary: "#434c5e"
  ink-muted: "#636e82"
  hairline: "#d2dae5"
  hairline-strong: "#b6c2d3"
typography:
  display:
    fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(30px, 3.65vw, 48px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(24px, 2.7vw, 34px)"
    fontWeight: 700
    lineHeight: 1.24
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "17.5px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.72
  label:
    fontFamily: "'SF Mono', ui-monospace, Menlo, Consolas, monospace"
    fontSize: "12.5px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.shotlate-cobalt}"
    textColor: "{colors.aperture-white}"
    rounded: "8px"
    padding: "0 22px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.shotlate-cobalt-deep}"
  button-secondary:
    backgroundColor: "{colors.aperture-white}"
    textColor: "{colors.ink-primary}"
    rounded: "8px"
    padding: "0 22px"
    height: "44px"
  dimension-pill:
    backgroundColor: "{colors.shotlate-cobalt}"
    textColor: "{colors.aperture-white}"
    rounded: "6px 6px 0 0"
    padding: "4px 11px"
  toolbar-pill:
    backgroundColor: "{colors.aperture-white}"
    textColor: "{colors.ink-primary}"
    rounded: "12px"
    padding: "6px 10px"
---

# Design System: Shotlate Official Website

## Overview

**Creative North Star: "Live Selection Aperture"**

Shotlate's website speaks in the exact visual grammar of the macOS utility itself: opening the landing page feels like pressing `⌥A` to freeze a screen region. Cool dimmed desktop mist holds a razor-sharp cobalt selection marquee with eight square handles, calibrated 1px pixel rulers along the edges, a pure-white active demonstration stage, and Shotlate's floating pure-icon toolbar pill straddling the bottom border.

Below the opening stage and across the Manual, FAQ, and Download routes, the system shifts seamlessly from persuasion into surgical reading clarity: calibrated hairline dividers, tabular monospace specification strips, and real app-rendered captures carry the weight without decorative cards, glowing dark-mode clichés, or marketing fluff.

**Key Characteristics:**
- Calibrated 1px top and left pixel coordinate rulers framing the hero selection canvas.
- Pure-white illuminated selection apertures bordered in Shotlate Cobalt with eight square control handles.
- Real keyboard-responsive proof (`Y`, `X`, `1`–`7`, `T`, `S`, `G`) inside the hero stage.
- High-contrast obsidian telemetry proof band anchoring real footprint numbers (`5.9 MB`, `~55 MB`) alongside an explicit anti-bloat list.

## Colors

The palette pairs cool neutral desktop surfaces with one disciplined cobalt selection accent and a surgical vermilion annotation ink lifted directly from Shotlate's real callout tools.

### Primary
- **Shotlate Cobalt** (`shotlate-cobalt`): Used for the active selection marquee border, primary macOS download CTA, `[Y]` translation pill, active toolbar button, dimension badge, and text links.
- **Shotlate Cobalt Deep** (`shotlate-cobalt-deep`): Hover and pressed states on primary controls.
- **Selection Tint** (`selection-tint`): Active navigation highlight and translated-state subtle badges.

### Secondary
- **Annotation Vermilion** (`annotation-vermilion`): Reserved strictly for Shotlate's authentic annotation callouts (numbered circle `1`, red selection annotation outline) — never used for generic marketing buttons.

### Neutral
- **Desktop Mist** (`desktop-mist`): Cool dimmed desktop ground on the hero canvas, closing download band, and inner-page header banners.
- **Workbench Ground** (`workbench-ground`): Clean light reading surface between bands and on documentation pages.
- **Aperture White** (`aperture-white`): Pure-white illuminated selection frames, macOS window specimens, floating toolbar pill, and sticky navigation header.
- **Recessed Slate** (`recessed-slate`): Specimen header bars, macOS window sidebars, and key-value table headers.
- **Obsidian Panel** (`obsidian-panel` / `obsidian-elevated`): Dedicated high-contrast telemetry band (`5.9 MB` / `~55 MB` proof) and terminal source-build code blocks.
- **Ink Primary / Secondary / Muted** (`ink-primary`, `ink-secondary`, `ink-muted`): Charcoal-slate text hierarchy preserving ≥4.5:1 contrast on light surfaces.
- **Hairline / Hairline Strong** (`hairline`, `hairline-strong`): 1px structural borders, ruler ticks, and outlined button strokes.

**The Single-Highlight Rule.** Shotlate Cobalt owns interactive focus and selection geometry; Annotation Vermilion appears only on actual screenshot callout overlays.

## Typography

**Display & Body Font:** PingFang SC / Hiragino Sans GB / Noto Sans SC (system CJK grotesque stack for instant zero-CLS Chinese rendering)
**Label/Mono Font:** SF Mono / ui-monospace / Menlo (strictly `tabular-nums` for dimensions, file sizes, shortcuts, and step numbers)

**Character:** Tight, crisp Chinese grotesque headings paired with calibrated monospace coordinates and physical `<kbd>` keycaps.

### Hierarchy
- **Display** (700, `clamp(30px, 3.65vw, 48px)`, 1.15 line-height, `-0.025em` tracking): Hero single-line thesis headline.
- **Headline** (700, `clamp(24px, 2.7vw, 34px)`, 1.24 line-height): Section titles across landing and inner routes.
- **Title** (700, `17.5px`, 1.3 line-height): Specimen subheads, download subsections, numbered how-to steps.
- **Body** (400, `15.5px`, 1.72 line-height): Reading copy constrained to comfortable measure (`44em`–`46em` on documentation/FAQ).
- **Label** (600, `12.5px`, monospace `tabular-nums`): Dimension pills (`1120 × 440`), spec ledgers, specimen header bars, keyboard shortcuts.

**The No-Eyebrow Rule.** Headings carry their own authority without small uppercase kickers stacked above them.

## Layout

All routes share a `1220px` max-width container (`.wrap`) with fluid `clamp(18px, 3.6vw, 40px)` inline padding. On desktop, the Home hero opens with a full-width calibrated top ruler (`20px`) and left ruler (`20px`), a two-column architectural header row (headline left, dual CTAs + 3-cell spec ledger right), the panoramic selection aperture, and a 4-column workflow jump rail (`01`–`04`) aligned to the fold. Inner reading pages (`/manual`, `/faq`, `/download`) keep a calm banner + hairline-ruled content structure (with a `200px` sticky TOC on `/manual`). Responsive breakpoints tighten at `1060px`, `860px` (hiding the vertical left ruler and stacking dual windows), and `600px` (keeping single-line nav, side-by-side CTAs, and horizontal 3-cell specs so the aperture remains prominent above the fold).

## Elevation & Depth

Surfaces rely primarily on 1px structural hairlines and surface-tone stepping (`desktop-mist` → `workbench-ground` → `aperture-white`). Soft ambient shadows appear only on genuinely floating macOS-native objects: the interactive macOS windows inside the selection aperture (`0 10px 26px rgba(18, 22, 34, 0.08)`), the floating pure-icon toolbar pill (`0 10px 26px rgba(18, 22, 34, 0.13)`), and the center `[Y]` translation pill (`0 6px 18px rgba(19, 99, 214, 0.28)`).

**The Hairline-First Rule.** Never add diffuse shadows to static sections, tables, or spec strips; reserve elevation for floating toolbars and window specimens.

## Shapes

Sharp precision meets subtle macOS corner softness: active selection apertures use crisp `0px` corners with `9px` square white-and-cobalt resize handles, buttons use `8px` corners, specimen frames and macOS windows use `10px`, floating toolbars use `12px`, and status pills use `999px`.

## Components

### Buttons
- **Primary (`button-primary`)**: Solid Shotlate Cobalt, white 600-weight label, `44px` height, `8px` radius, subtle `1px` downward press feedback.
- **Secondary (`button-secondary`)**: Pure-white fill, `1px` strong hairline border, charcoal ink, `44px` height, `8px` radius.

### Live Selection Aperture (`HeroAperture`)
- **Structure**: Top-left cobalt dimension pill (`1120 × 440`), `1.5px` cobalt border with 8 square handles, live dual macOS window showcase split by a vertical cobalt scanline with an interactive `[Y] 原位翻译` toggle button, and a 13-button pure-icon floating toolbar pill straddling the bottom border with dark hover tooltips.
- **Keyboard behavior**: Responds directly to `Y`, `X`, `1`–`7`, `T`, `S`, and `G` to switch real tool demonstrations in place.

### Specimen Frames
- **Structure**: `1px` hairline border, `10px` radius, recessed monospace header bar carrying real dimensions and segmented mode tabs, full-bleed real app media, and an optional bottom caption separated by a `1px` rule.

### Navigation
- **Style**: `60px` sticky translucent white header (`rgba(255, 255, 255, 0.92)` + `blur(12px)`) with official B2 icon, flat single-line links (`white-space: nowrap`), active cobalt-tinted state, and a compact `MIT 开源` pill on desktop.

## Do's and Don'ts

### Do:
- **Do** show real app-rendered screenshots, videos, shortcuts, and verified footprint figures (`5.9 MB`, `~55 MB`).
- **Do** keep tabular numerals (`font-variant-numeric: tabular-nums`) on all coordinates, specs, and shortcut tables.
- **Do** preserve keyboard responsiveness (`Y`, `X`, `1`–`7`, `T`, `S`, `G`) and visible focus outlines (`2px solid #1363d6`).

### Don't:
- **Don't** add generic icon-title-paragraph card grids, decorative glassmorphism, neon glows, or eyebrow labels above headings.
- **Don't** fabricate download counts, user testimonials, or removed features.
- **Don't** use Annotation Vermilion for non-annotation UI chrome or primary CTAs.
