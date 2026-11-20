/** Extract YouTube / Vimeo id and build embed URL for iframes. */
export function getYouTubeVideoId(url) {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()
  const short = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/)
  if (short) return short[1]
  const watch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{6,})/)
  if (watch) return watch[1]
  const embed = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/)
  if (embed) return embed[1]
  return null
}

export function getVimeoVideoId(url) {
  if (!url || typeof url !== 'string') return null
  const m = url.trim().match(/vimeo\.com\/(\d+)/)
  return m ? m[1] : null
}

export function getVideoEmbedUrl(url) {
  const yt = getYouTubeVideoId(url)
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1`
  const vimeo = getVimeoVideoId(url)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo}`
  return null
}

export function getYouTubeThumbnail(url) {
  const id = getYouTubeVideoId(url)
  if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  return null
}