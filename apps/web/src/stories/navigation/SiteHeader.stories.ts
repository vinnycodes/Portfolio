import type { Meta, StoryObj } from '../../types/storybook';

import SiteHeader from '../../components/SiteHeader.astro';

const meta = {
  title: 'Navigation/Site Header',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The primary header keeps identity, section navigation, and contact distinct. It wraps into two rows on narrow screens.',
      },
    },
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
