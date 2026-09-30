import type { Meta, StoryObj } from '../../types/storybook';

import TokenTable from '../../components/foundations/TokenTable.astro';

const meta = {
  title: 'Foundations/Spacing',
  component: TokenTable,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TokenTable>;

export default meta;
type Story = StoryObj<typeof TokenTable>;

export const CoreScale: Story = {
  args: {
    title: 'Spacing scale',
    description:
      'A four-pixel base creates predictable rhythm. Components skip steps when stronger grouping is required.',
    kind: 'space',
    items: [
      { label: '1 · 4px', token: '--space-1' },
      { label: '2 · 8px', token: '--space-2' },
      { label: '3 · 12px', token: '--space-3' },
      { label: '4 · 16px', token: '--space-4' },
      { label: '5 · 20px', token: '--space-5' },
      { label: '6 · 24px', token: '--space-6' },
      { label: '7 · 28px', token: '--space-7' },
      { label: '8 · 32px', token: '--space-8' },
      { label: '10 · 40px', token: '--space-10' },
      { label: '12 · 48px', token: '--space-12' },
      { label: '16 · 64px', token: '--space-16' },
      { label: '20 · 80px', token: '--space-20' },
      { label: '24 · 96px', token: '--space-24' },
    ],
  },
};

export const ControlSize: Story = {
  args: {
    title: 'Control size',
    description:
      'Default interactive controls meet the 44px target recommendation. Small controls are reserved for dense secondary contexts.',
    kind: 'space',
    items: [
      { label: 'Small · 36px', token: '--control-height-sm' },
      { label: 'Medium · 44px', token: '--control-height-md' },
      { label: 'Large · 52px', token: '--control-height-lg' },
    ],
  },
};
