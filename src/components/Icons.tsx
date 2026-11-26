// Crisp consistent-stroke vector icons for Shotlate's toolbar, brand glyph, and platform controls.
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.65,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

/** Official Shotlate menu-bar glyph: three selection corners + open-center reticle. */
export function BrandGlyphIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 7V4.5A1.5 1.5 0 0 1 4.5 3H7M11 3h2.5A1.5 1.5 0 0 1 15 4.5V7M3 11v2.5A1.5 1.5 0 0 0 4.5 15H7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="12" y="9" width="2" height="3" rx="0.4" fill="currentColor" />
      <rect x="12" y="14" width="2" height="3" rx="0.4" fill="currentColor" />
      <rect x="9" y="12" width="3" height="2" rx="0.4" fill="currentColor" />
      <rect x="14" y="12" width="3" height="2" rx="0.4" fill="currentColor" />
    </svg>
  )
}

export function GitHubIcon({ size = 15, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.18-.02-2.14-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11.02 11.02 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

export function DownloadIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M10 3.5v8.5m0 0-3.2-3.2M10 12l3.2-3.2" />
      <path d="M4 13.5v1.8A1.2 1.2 0 0 0 5.2 16.5h9.6a1.2 1.2 0 0 0 1.2-1.2v-1.8" />
    </svg>
  )
}

export function RectToolIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3.5" y="4.5" width="13" height="11" rx="1.8" />
    </svg>
  )
}

export function ArrowToolIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M4.5 15.5 15 5m0 0H8.8M15 5v6.2" />
    </svg>
  )
}

export function BrushToolIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M3.5 14.5c2-5.5 4.2-8.5 5.5-5.5 1.1 2.6 2.1 5.4 3.5 2.4 1.1-2.3 2.5-3.8 4-3.2" />
    </svg>
  )
}

export function MosaicToolIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <rect x="2.5" y="4.2" width="15" height="11.6" rx="2.2" stroke="currentColor" strokeWidth="1.45" />
      <rect x="4.6" y="6" width="2.2" height="2.2" rx="0.4" fill="currentColor" />
      <rect x="10.4" y="6" width="2.2" height="2.2" rx="0.4" fill="currentColor" />
      <rect x="7.5" y="8.9" width="2.2" height="2.2" rx="0.4" fill="currentColor" />
      <rect x="13.3" y="8.9" width="2.2" height="2.2" rx="0.4" fill="currentColor" />
      <rect x="4.6" y="11.8" width="2.2" height="2.2" rx="0.4" fill="currentColor" />
      <rect x="10.4" y="11.8" width="2.2" height="2.2" rx="0.4" fill="currentColor" />
    </svg>
  )
}

export function MagnifierToolIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="9" cy="9" r="5" />
      <path d="m13 13 3.5 3.5M9 7v4M7 9h4" />
    </svg>
  )
}

export function TextToolIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M4.5 5h11M10 5v10.5M7.5 15.5h5" />
    </svg>
  )
}

export function NumberToolIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M9.1 7.8 10.4 7v6M8.8 13h3" />
    </svg>
  )
}

export function TranslateToolIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M3.5 5.5h7M7 3.8v1.7m1.8 0c-.6 2.9-2.4 5.3-4.8 6.8m1.6-4.7c.9 1.6 2.1 3 3.7 4" />
      <path d="m11.2 16.2 2.9-7.4 2.9 7.4m-4.8-2.3h3.8" />
    </svg>
  )
}

export function PinToolIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="m11.5 3.5 5 5-1.3 1.3-1-.3-3.2 3.2.5 1.8-1.2 1.2-6-6 1.2-1.2 1.8.5 3.2-3.2-.3-1 1.3-1.3ZM7.3 12.7 3.5 16.5" />
    </svg>
  )
}

export function ScrollToolIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M5.5 4v12m0-12-2 2m2-2 2 2M5.5 16l-2-2m2 2 2-2M10.5 5.5H16.5M10.5 10H16.5M10.5 14.5H16.5" />
    </svg>
  )
}

export function BadgeToolIcon({ label, ...props }: SVGProps<SVGSVGElement> & { label: 'OCR' | 'GIF' }) {
  return (
    <svg width="28" height="17" viewBox="0 0 28 17" fill="none" aria-hidden="true" {...props}>
      <rect x="0.85" y="0.85" width="26.3" height="15.3" rx="3.8" stroke="currentColor" strokeWidth="1.4" />
      <text
        x="14"
        y="11.7"
        textAnchor="middle"
        fontSize="8.8"
        fontWeight="700"
        letterSpacing={label === 'GIF' ? '0.4' : '0.2'}
        fill="currentColor"
        fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
      >
        {label}
      </text>
    </svg>
  )
}

export function CheckToolIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="m4.5 10.4 3.7 3.7 7.3-7.8" />
    </svg>
  )
}

export function CheckSmallIcon({ size = 14, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="m4 10.5 3.8 3.8L16 6" />
    </svg>
  )
}
