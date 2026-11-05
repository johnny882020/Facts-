import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'test/e2e',
  testMatch: '**/*.spec.ts',
  timeout: 60_000,
  workers: 1, // one persistent extension context per worker
  retries: 0,
  reporter: [['list']],
});
