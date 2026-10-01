import type { Meta, StoryObj } from '../../types/storybook';

import TextLink from '../../components/actions/TextLink.astro';

const meta = {
  title: 'Actions/Text Link',
  component: TextLink,
  args: {
    href: '#text-link-destination',
    slots: { default: 'Read the case study' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'TextLink is the default inline or standalone navigation treatment. New-tab behavior is announced to assistive technology.',
      },
    },
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof TextLink>;

export const Internal: Story = {};
export const NewTab: Story = {
  args: {
    href: 'https://example.com',
    newTab: true,
    slots: { default: 'Visit external project' },
  },
};
