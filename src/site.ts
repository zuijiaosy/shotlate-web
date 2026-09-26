// Site-wide settings.
const repo = 'https://github.com/zuijiaosy/shotlate'

export const site = {
  name: 'Shotlate',
  // Absolute origin used for canonical links, Open Graph and the sitemap.
  url: ((import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://shotlate.pages.dev').replace(/\/$/, ''),
  minMacOS: '14',
  // The download button. By default it opens the latest GitHub release, where the .dmg is attached.
  // Once the release workflow also uploads to Cloudflare R2, build with
  // VITE_DMG_URL=https://<bucket public domain>/Shotlate-latest.dmg to download straight from R2 instead.
  releasesUrl: `${repo}/releases/latest`,
  dmgUrl: (import.meta.env.VITE_DMG_URL as string | undefined) || null,
  sourceUrl: repo,
}

/** Where "download" goes: the R2 file when configured, otherwise the latest GitHub release. */
export const downloadUrl = site.dmgUrl ?? site.releasesUrl

type HeadInput = { title: string; description: string; path: string; image?: string }

export function pageHead({ title, description, path, image = '/og.png' }: HeadInput) {
  const url = site.url + path
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: site.name },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: site.url + image },
      { property: 'og:locale', content: 'zh_CN' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

export function jsonLd(data: object) {
  return { type: 'application/ld+json', children: JSON.stringify(data) }
}
