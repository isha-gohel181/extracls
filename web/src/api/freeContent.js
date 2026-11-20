import { getApiBase, resolveMediaUrl } from '../utils/apiBase.js'
import { getYouTubeThumbnail } from '../utils/videoEmbed.js'

const BASE = getApiBase()

export async function fetchLandingCarousel() {
  const res = await fetch(`${BASE}/free-content/landing-carousel`, { cache: 'no-store' })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || json.success === false) {
    const msg = json.message || `Failed to load landing videos (${res.status})`
    throw new Error(msg)
  }
  return Array.isArray(json.data) ? json.data : []
}

export async function fetchPublicFreeContent({ limit = 50, page = 1, contentType } = {}) {
  const params = new URLSearchParams({ limit: String(limit), page: String(page) })
  if (contentType) params.set('contentType', contentType)
  const res = await fetch(`${BASE}/free-content?${params}`)
  if (!res.ok) throw new Error('Failed to load free content')
  const json = await res.json()
  return json?.contents || []
}

export function resolveFreeThumbnail(item) {
  if (item?.thumbnail) return resolveMediaUrl(item.thumbnail)
  if (item?.videoUrl) return getYouTubeThumbnail(item.videoUrl)
  return null
}