import type { Meta, StoryObj } from '../../types/storybook';

import PortfolioShell from '../../components/PortfolioShell.astro';

const meta = {
  title: 'Patterns/Portfolio Shell',
  component: PortfolioShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The launch shell composes navigation, ambient depth, responsive typography, bento surfaces, and actions without client-side JavaScript.',
      },
    },
  },
} satisfies Meta<typeof PortfolioShell>;

export default meta;
type Story = StoryObj<typeof PortfolioShell>;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet', isRotated: false } },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
