import type { Meta, StoryObj } from '../../types/storybook';

import TokenTable from '../../components/foundations/TokenTable.astro';

const meta = {
  title: 'Foundations/Layout',
  component: TokenTable,
  parameters: { layout: 'fullscreen', storyFrame: 'content' },
} satisfies Meta<typeof TokenTable>;

export default meta;
type Story = StoryObj<typeof TokenTable>;

export const ResponsiveContract: Story = {
  args: {
    title: 'Responsive layout',
    description:
      'The bento composition uses one column by default, two from 640px, and four from 1000px. Gutters and gaps scale fluidly.',
    items: [
      { label: 'Maximum width', token: '--layout-max-width' },
      { label: 'Fluid gutter', token: '--layout-gutter' },
      { label: 'Fluid grid gap', token: '--grid-gap' },
      { label: 'Card minimum height', token: '--card-min-height' },
      { label: 'Tablet breakpoint', token: '--breakpoint-tablet' },
      { label: 'Desktop breakpoint', token: '--breakpoint-desktop' },
    ],
  },
};
