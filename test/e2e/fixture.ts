import { test as base, chromium, expect, type BrowserContext, type Page } from '@playwright/test';
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import { startServers } from './server.mjs';

const dist = path.resolve('dist');

export interface Env {
  context: BrowserContext;
  extId: string;
  port: number;
  port2: number;
  /** url for a fixture at the given fake host (default www.youtube.com for adapter hosts, other fixtures use localhost) */
  url: (file: string, host?: string) => string;
}

export const test = base.extend<{ env: Env }, { shared: Env }>({
  shared: [
    async ({}, use) => {
      const servers = await startServers();
      const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'closeguard-'));
      const context = await chromium.launchPersistentContext(userDataDir, {
        channel: 'chromium',
        headless: true,
        args: [
          '--headless=new',
          `--disable-extensions-except=${dist}`,
          `--load-extension=${dist}`,
          '--host-resolver-rules=MAP www.youtube.com 127.0.0.1, MAP open.spotify.com 127.0.0.1, MAP other.test 127.0.0.1',
        ],
      });
      let [sw] = context.serviceWorkers();
      if (!sw) sw = await context.waitForEvent('serviceworker');
      const extId = new URL(sw.url()).host;
      await use({
        context,
        extId,
        port: servers.port,
        port2: servers.port2,
        url: (file, host = 'localhost') => `http://${host}:${servers.port}/${file}`,
      });
      await context.close();
      await servers.close();
      fs.rmSync(userDataDir, { recursive: true, force: true });
    },
    { scope: 'worker' },
  ],
  env: async ({ shared }, use) => {
    // reset settings/stats between tests
    const p = await shared.context.newPage();
    await p.goto(`chrome-extension://${shared.extId}/popup.html`);
    await p.evaluate(() => chrome.storage.local.clear());
    await p.close();
    await use(shared);
    for (const pg of shared.context.pages()) await pg.close();
  },
});

export { expect };
export const closed = (page: Page) => page.evaluate(() => (window as unknown as { __closed: number }).__closed);
