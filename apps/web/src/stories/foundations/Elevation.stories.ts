import type { Meta, StoryObj } from '../../types/storybook';

import TokenTable from '../../components/foundations/TokenTable.astro';

const meta = {
  title: 'Foundations/Elevation',
  component: TokenTable,
  parameters: { layout: 'fullscreen', storyFrame: 'content' },
} satisfies Meta<typeof TokenTable>;

export default meta;
type Story = StoryObj<typeof TokenTable>;

export const Shadows: Story = {
  args: {
    title: 'Elevation and glass',
    description:
      'Shadows reinforce hierarchy without carrying it alone. Translucent surfaces retain solid fallbacks when blur is unavailable.',
    kind: 'shadow',
    items: [
      { label: 'Card', token: '--shadow-card' },
      { label: 'Control', token: '--shadow-control' },
    ],
  },
};
