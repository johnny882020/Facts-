import { test, expect, closed } from './fixture';

test('popup: global enable toggle off -> positive fixture not closed', async ({ env }) => {
  const popup = await env.context.newPage();
  await popup.goto(`chrome-extension://${env.extId}/popup.html`);
  const toggle = popup.locator('[data-testid="enabled"], #enabled').first();
  await expect(toggle).toBeChecked();
  await toggle.uncheck();
  await expect.poll(() => popup.evaluate(async () => (await chrome.storage.local.get('settings')).settings?.enabled)).toBe(false);
  const page = await env.context.newPage();
  await page.goto(env.url('newsletter-modal.html'));
  await page.waitForTimeout(3000);
  expect(await closed(page)).toBe(0);
});

test('popup: per-site disable -> that host not closed, other host still closed', async ({ env }) => {
  const popup = await env.context.newPage();
  await popup.goto(`chrome-extension://${env.extId}/popup.html`);
  // per-site toggle acts on the active tab's host; open the fixture first so it is the active tab
  const page = await env.context.newPage();
  await page.goto(env.url('neg-login.html', 'www.youtube.com')); // inert page on the host we disable
  await page.bringToFront();
  await popup.evaluate(async () => {
    const { settings } = await chrome.storage.local.get('settings');
    await chrome.storage.local.set({ settings: { ...(settings ?? { enabled: true, genericMode: true, debug: false }), disabledHosts: ['www.youtube.com'] } });
  });
  const yt = await env.context.newPage();
  await yt.goto(env.url('youtube-skip.html', 'www.youtube.com'));
  await yt.waitForTimeout(3000);
  expect(await closed(yt)).toBe(0);
  const other = await env.context.newPage();
  await other.goto(env.url('newsletter-modal.html'));
  await expect.poll(() => closed(other), { timeout: 3500 }).toBe(1);
});
