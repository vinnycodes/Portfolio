import type { Meta, StoryObj } from '../../types/storybook';

import BentoCard from '../../components/BentoCard.astro';
import BentoGrid from '../../components/BentoGrid.astro';

const cards = [
  {
    component: BentoCard,
    props: {
      eyebrow: 'Featured',
      title: 'Wide card',
      description: 'Spans two columns from the tablet breakpoint.',
      span: 'wide',
      tone: 'blue',
    },
  },
  {
    component: BentoCard,
    props: {
      eyebrow: 'Standard',
      title: 'Default card',
      description: 'Occupies one available grid cell.',
    },
  },
  {
    component: BentoCard,
    props: {
      eyebrow: 'Standard',
      title: 'Accent card',
      description: 'Color creates rhythm without changing semantics.',
      tone: 'cool',
    },
  },
];

const meta = {
  title: 'Layout/Bento Grid',
  component: BentoGrid,
  args: {
    slots: { default: cards },
  },
  parameters: {
    layout: 'fullscreen',
    storyFrame: 'layout',
    docs: {
      description: {
        component:
          'BentoGrid progresses from one to two to four columns. Child cards own their spans so content hierarchy stays colocated with content.',
      },
    },
  },
} satisfies Meta<typeof BentoGrid>;

export default meta;
type Story = StoryObj<typeof BentoGrid>;

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
};

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet', isRotated: false } },
};

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
