/** Hostname helpers. Pure. */
export function normalizeHost(h: string): string {
  return h.trim().toLowerCase().replace(/^\.+|\.+$/g, '');
}

/** True if hostname equals an entry or is a subdomain of it. */
export function isHostDisabled(hostname: string, disabledHosts: readonly string[]): boolean {
  const host = normalizeHost(hostname);
  if (!host) return false;
  return disabledHosts.some((raw) => {
    const e = normalizeHost(raw);
    return e !== '' && (host === e || host.endsWith('.' + e));
  });
}

export function addHost(list: readonly string[], hostname: string): string[] {
  const h = normalizeHost(hostname);
  if (!h || list.includes(h)) return [...list];
  return [...list, h];
}

export function removeHost(list: readonly string[], hostname: string): string[] {
  const h = normalizeHost(hostname);
  return list.filter((x) => normalizeHost(x) !== h);
}

/** Hostname for http(s) URLs only; null otherwise. */
export function hostFromUrl(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:' ? normalizeHost(u.hostname) : null;
  } catch {
    return null;
  }
}
