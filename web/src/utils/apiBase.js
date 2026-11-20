const DEV_DEFAULT = 'http://localhost:5000';

export function getApiBase() {
  // In dev, prefer VITE_API_BASE so a duplicated VITE_BASE_URL (e.g. production) in .env
  // does not override localhost while admin saves to the local API.
  const raw = import.meta.env.DEV
    ? import.meta.env.VITE_API_BASE ||
      import.meta.env.VITE_BASE_URL ||
      DEV_DEFAULT
    : import.meta.env.VITE_BASE_URL ||
      import.meta.env.VITE_API_BASE ||
      DEV_DEFAULT;
  return String(raw).replace(/\/+$/, '');
}

export function getImageBase() {
  const raw =
    import.meta.env.VITE_IMAGE_URL ||
    import.meta.env.VITE_BASE_URL ||
    import.meta.env.VITE_API_BASE ||
    DEV_DEFAULT;
  return String(raw).replace(/\/+$/, '');
}

/** Build absolute URL for uploads / media paths from the API host */
export function resolveMediaUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = getImageBase();
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}/${normalized}`;
}

export function getSocketBase() {
  const raw =
    import.meta.env.VITE_SOCKET_URL ||
    import.meta.env.VITE_API_BASE ||
    import.meta.env.VITE_BASE_URL ||
    DEV_DEFAULT;
  return String(raw).replace(/\/+$/, '');
}
