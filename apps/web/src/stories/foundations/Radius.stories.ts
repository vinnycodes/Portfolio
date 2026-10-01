import type { Meta, StoryObj } from '../../types/storybook';

import TokenTable from '../../components/foundations/TokenTable.astro';

const meta = {
  title: 'Foundations/Radius',
  component: TokenTable,
  parameters: { layout: 'fullscreen', storyFrame: 'content' },
} satisfies Meta<typeof TokenTable>;

export default meta;
type Story = StoryObj<typeof TokenTable>;

export const Scale: Story = {
  args: {
    title: 'Corner radius',
    description:
      'Radius increases with surface size. Pills are reserved for compact controls and status shapes.',
    kind: 'radius',
    items: [
      { label: 'Small', token: '--radius-sm' },
      { label: 'Medium', token: '--radius-md' },
      { label: 'Large', token: '--radius-lg' },
      { label: 'Card', token: '--radius-card' },
      { label: 'Pill', token: '--radius-pill' },
    ],
  },
};
