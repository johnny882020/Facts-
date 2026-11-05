import { test, expect, closed } from './fixture';

const cases: Array<[string, string]> = [
  ['login modal with password', 'neg-login.html'],
  ['alertdialog "Delete file?"', 'neg-alertdialog.html'],
  ['cookie consent banner (Accept all + x)', 'neg-consent.html'],
  ['close control that is a cross-origin link', 'neg-cross-origin-link.html'],
  ['close control that is a form submit', 'neg-submit-close.html'],
  ['modal with 3-input form', 'neg-form-modal.html'],
  ['Accept-only banner', 'neg-accept-only.html'],
];

for (const [name, file] of cases) {
  test(`negative: ${name} is never clicked`, async ({ env }) => {
    const page = await env.context.newPage();
    await page.goto(env.url(file));
    await page.waitForTimeout(3000);
    expect(await closed(page)).toBe(0);
  });
}

test('negative: dialog opened by a user click is not auto-closed', async ({ env }) => {
  const page = await env.context.newPage();
  await page.goto(env.url('neg-user-opened.html'));
  await page.click('#open');
  await expect(page.locator('#ov')).toBeVisible({ timeout: 1500 });
  await page.waitForTimeout(3000);
  expect(await closed(page)).toBe(0);
});
