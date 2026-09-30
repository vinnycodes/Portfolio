import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const configDirectory = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '.storybook'
);

const storybookProject = (theme: 'dark' | 'light') => ({
  plugins: [
    storybookTest({
      configDir: configDirectory,
      initialGlobals: { theme },
    }),
  ],
  test: {
    name: `storybook-${theme}`,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({}),
      instances: [{ browser: 'chromium' as const }],
    },
  },
});

export default defineConfig({
  test: {
    projects: [storybookProject('dark'), storybookProject('light')],
  },
});
