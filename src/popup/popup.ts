import type { Settings } from '../core/types';
import { STORAGE_KEYS } from '../shared/schema';
import { addHost, hostFromUrl, isHostDisabled, removeHost } from '../shared/hosts';
import { getSettings, getStats, setSettings, todayCount } from '../shared/storage';

const $ = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing #${id}`);
  return el as T;
};

let settings: Settings;
let host: string | null = null;

function status(text: string): void {
  $('status').textContent = text;
}

function renderSettings(): void {
  $<HTMLInputElement>('enabled').checked = settings.enabled;
  $<HTMLInputElement>('genericMode').checked = settings.genericMode;
  const site = $<HTMLInputElement>('siteDisabled');
  if (host) {
    site.disabled = false;
    site.checked = isHostDisabled(host, settings.disabledHosts);
    $('siteLabel').textContent = `Disable on ${host}`;
  } else {
    site.disabled = true;
    site.checked = false;
    $('siteLabel').textContent = 'Disable on this site (n/a)';
  }
}

async function renderStats(): Promise<void> {
  const s = await getStats();
  $('today').textContent = String(todayCount(s));
  $('total').textContent = String(s.closedTotal);
  $('reopened').textContent = String(s.reopened);
  $('errors').textContent = String(s.errors);
  $('errors').title = s.lastError ?? '';
}

async function save(next: Settings): Promise<void> {
  try {
    settings = next;
    await setSettings(next);
    status('');
  } catch {
    status('Could not save settings.');
  }
  renderSettings();
}

async function init(): Promise<void> {
  settings = await getSettings();
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // tab.url is hidden without the "tabs" permission (we only hold "storage"), so ask the top-frame content script.
    host = hostFromUrl(tab?.url);
    if (!host && tab?.id !== undefined) {
      const r = (await chrome.tabs.sendMessage(tab.id, { type: 'getHost' }, { frameId: 0 })) as { host?: unknown } | undefined;
      host = typeof r?.host === 'string' ? hostFromUrl(`https://${r.host}/`) : null;
    }
  } catch {
    host = null;
  }
  renderSettings();
  await renderStats();

  $<HTMLInputElement>('enabled').addEventListener('change', (e) =>
    void save({ ...settings, enabled: (e.target as HTMLInputElement).checked }));
  $<HTMLInputElement>('genericMode').addEventListener('change', (e) =>
    void save({ ...settings, genericMode: (e.target as HTMLInputElement).checked }));
  $<HTMLInputElement>('siteDisabled').addEventListener('change', (e) => {
    if (!host) return;
    const off = (e.target as HTMLInputElement).checked;
    void save({ ...settings, disabledHosts: off ? addHost(settings.disabledHosts, host) : removeHost(settings.disabledHosts, host) });
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (changes[STORAGE_KEYS.stats]) void renderStats();
    if (changes[STORAGE_KEYS.settings]) void getSettings().then((s) => { settings = s; renderSettings(); });
  });
}

init().catch(() => status('Could not load extension state.'));
