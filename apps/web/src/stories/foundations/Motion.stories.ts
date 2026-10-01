import type { Meta, StoryObj } from '../../types/storybook';

import MotionSpecimen from '../../components/foundations/MotionSpecimen.astro';

const meta = {
  title: 'Foundations/Motion',
  component: MotionSpecimen,
  parameters: {
    layout: 'fullscreen',
    storyFrame: 'content',
    docs: {
      description: {
        component:
          'The expressive easing curve is reserved for entrances and spatial movement. Standard easing handles direct feedback.',
      },
    },
  },
} satisfies Meta<typeof MotionSpecimen>;

export default meta;
type Story = StoryObj<typeof MotionSpecimen>;

export const Durations: Story = {};
