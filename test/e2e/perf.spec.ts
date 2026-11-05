import { test, expect, closed } from './fixture';

// Informational budget: scan-triggering mutation completes; long tasks total < 500ms.
test('perf: 5000-node page stays responsive during scan', async ({ env }) => {
  const page = await env.context.newPage();
  await page.goto(env.url('perf.html'));
  const nodes = await page.evaluate(() => document.querySelectorAll('*').length);
  expect(nodes).toBeGreaterThanOrEqual(5000);
  await page.waitForTimeout(500);
  const mutateMs = await page.evaluate(() => (window as unknown as { __mutate: () => number }).__mutate());
  expect(mutateMs).toBeLessThan(100);
  // the late overlay is a valid positive: scan completes and closes it
  await expect.poll(() => closed(page), { timeout: 3500 }).toBe(1);
  const longTasks = await page.evaluate(() => (window as unknown as { __longTasks: number }).__longTasks);
  console.log(`perf: nodes=${nodes} mutateMs=${mutateMs.toFixed(1)} longTaskTotalMs=${longTasks.toFixed(1)}`);
  expect(longTasks).toBeLessThan(500);
});
