import type { Meta, StoryObj } from '../../types/storybook';

import Wordmark from '../../components/Wordmark.astro';

const meta = {
  title: 'Navigation/Wordmark',
  component: Wordmark,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The wordmark is always a home link. Compact mode is intended for constrained navigation surfaces.',
      },
    },
  },
} satisfies Meta<typeof Wordmark>;

export default meta;
type Story = StoryObj<typeof Wordmark>;

export const Full: Story = {};
export const Compact: Story = { args: { compact: true } };
