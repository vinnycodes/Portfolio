import type { Meta, StoryObj } from '../../types/storybook';

import TypographySpecimen from '../../components/foundations/TypographySpecimen.astro';

const meta = {
  title: 'Foundations/Typography',
  component: TypographySpecimen,
  parameters: {
    layout: 'fullscreen',
    storyFrame: 'content',
    docs: {
      description: {
        component:
          'Figtree is self-hosted as one Latin variable WOFF2 file. Supported production weights are 400, 500, 600, and 700.',
      },
    },
  },
} satisfies Meta<typeof TypographySpecimen>;

export default meta;
type Story = StoryObj<typeof TypographySpecimen>;

export const Scale: Story = {};
