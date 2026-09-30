import type { Meta, StoryObj } from '../../types/storybook';

import AmbientBackground from '../../components/AmbientBackground.astro';

const meta = {
  title: 'Surfaces/Ambient Background',
  component: AmbientBackground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Ambient fields are decorative, pointer-transparent, and motion-reduced. Readability never depends on them.',
      },
    },
  },
} satisfies Meta<typeof AmbientBackground>;

export default meta;
type Story = StoryObj<typeof AmbientBackground>;

export const Default: Story = {};
