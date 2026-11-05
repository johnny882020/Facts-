import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['test/unit/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/core/**'],
      exclude: ['src/core/types.ts'],
      reporter: ['text', 'lcov'],
      thresholds: { lines: 90 },
    },
  },
});
