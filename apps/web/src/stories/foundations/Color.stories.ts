import type { Meta, StoryObj } from '../../types/storybook';

import TokenTable from '../../components/foundations/TokenTable.astro';

const meta = {
  title: 'Foundations/Color',
  component: TokenTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Semantic color tokens adapt to the selected theme. Ambient colors create atmosphere and must not carry meaning.',
      },
    },
  },
} satisfies Meta<typeof TokenTable>;

export default meta;
type Story = StoryObj<typeof TokenTable>;

export const Semantic: Story = {
  args: {
    title: 'Semantic color',
    description:
      'Components consume role-based values so themes can change without rewriting component CSS.',
    kind: 'color',
    items: [
      { label: 'Canvas', token: '--color-canvas' },
      { label: 'Surface', token: '--color-surface' },
      { label: 'Raised surface', token: '--color-surface-raised' },
      { label: 'Solid surface', token: '--color-surface-solid' },
      { label: 'Primary text', token: '--color-text' },
      { label: 'Muted text', token: '--color-text-muted' },
      { label: 'Subtle text', token: '--color-text-subtle' },
      { label: 'Border', token: '--color-border' },
      { label: 'Strong border', token: '--color-border-strong' },
      { label: 'Focus', token: '--color-focus' },
      { label: 'Primary action', token: '--color-action' },
      { label: 'Action text', token: '--color-action-text' },
    ],
  },
};

export const Ambient: Story = {
  args: {
    title: 'Ambient color',
    description:
      'Low-frequency background fields create depth. They remain decorative and sit behind readable surfaces.',
    kind: 'color',
    items: [
      { label: 'Blue field', token: '--color-ambient-blue' },
      { label: 'Warm field', token: '--color-ambient-warm' },
      { label: 'Cool field', token: '--color-ambient-cool' },
    ],
  },
};

export const Primitive: Story = {
  args: {
    title: 'Primitive color',
    description:
      'Raw palette values feed semantic roles. Production components should prefer semantic tokens.',
    kind: 'color',
    items: [
      { label: 'White', token: '--color-white' },
      { label: 'Ink', token: '--color-ink' },
      { label: 'Night', token: '--color-night' },
      { label: 'Blue 500', token: '--color-blue-500' },
      { label: 'Blue 300', token: '--color-blue-300' },
      { label: 'Magenta 500', token: '--color-magenta-500' },
      { label: 'Teal 500', token: '--color-teal-500' },
    ],
  },
};
