import type { Meta, StoryObj } from '../../types/storybook';

import BentoCard from '../../components/BentoCard.astro';
import TextLink from '../../components/actions/TextLink.astro';

const meta = {
  title: 'Surfaces/Bento Card',
  component: BentoCard,
  args: {
    eyebrow: 'Card label',
    title: 'A focused piece of the story',
    description:
      'Cards group related content while allowing the overall grid to carry hierarchy.',
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['neutral', 'blue', 'warm', 'cool'],
    },
    span: { control: 'inline-radio', options: ['default', 'wide', 'tall'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'BentoCard provides surface, hierarchy, and optional accent tone. Wide and tall spans take effect only when the grid has room.',
      },
    },
  },
} satisfies Meta<typeof BentoCard>;

export default meta;
type Story = StoryObj<typeof BentoCard>;

export const Neutral: Story = {};
export const Blue: Story = { args: { tone: 'blue' } };
export const Warm: Story = { args: { tone: 'warm' } };
export const Cool: Story = { args: { tone: 'cool' } };
export const Wide: Story = { args: { span: 'wide' } };

export const WithBodyAndFooter: Story = {
  args: {
    slots: {
      default:
        '<p>Supporting copy can expand the card without changing its header contract.</p>',
      footer: {
        component: TextLink,
        props: { href: '#card-destination' },
        slots: { default: 'Explore the detail' },
      },
    },
  },
};
