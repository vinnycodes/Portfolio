import type { Preview } from '@storybook-astro/framework';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

import '../src/styles/global.css';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        dark: 'dark',
        light: 'light',
      },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    a11y: {
      test: 'error',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Foundations',
          'Actions',
          'Navigation',
          'Surfaces',
          'Layout',
          'Patterns',
        ],
      },
    },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile · 375',
          styles: { width: '375px', height: '812px' },
        },
        tablet: {
          name: 'Tablet · 768',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop · 1440',
          styles: { width: '1440px', height: '1000px' },
        },
      },
    },
  },
  tags: ['autodocs', 'test'],
};

export default preview;
