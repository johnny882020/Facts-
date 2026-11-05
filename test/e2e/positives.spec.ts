import { test, expect, closed } from './fixture';

const cases: Array<[string, string, string]> = [
  ['youtube skip-ad button after countdown', 'youtube-skip.html', 'www.youtube.com'],
  ['youtube ad overlay close', 'youtube-overlay.html', 'www.youtube.com'],
  ['spotify-like upsell dialog', 'spotify-upsell.html', 'open.spotify.com'],
  ['generic newsletter modal', 'newsletter-modal.html', 'localhost'],
  ['shadow-DOM modal', 'shadow-modal.html', 'localhost'],
];

for (const [name, file, host] of cases) {
  test(`positive: ${name} is closed within 3s`, async ({ env }) => {
    const page = await env.context.newPage();
    await page.goto(env.url(file, host));
    await expect.poll(() => closed(page), { timeout: 3500 }).toBe(1);
    await page.waitForTimeout(1000);
    expect(await closed(page)).toBe(1); // exactly once
  });
}

test('positive: iframe modal is closed within 3s', async ({ env }) => {
  const page = await env.context.newPage();
  await page.goto(env.url('iframe-modal.html'));
  await expect.poll(() => closed(page), { timeout: 3500 }).toBe(1);
});
