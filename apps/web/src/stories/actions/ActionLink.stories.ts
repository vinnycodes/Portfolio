import type { Meta, StoryObj } from '../../types/storybook';
import { expect, userEvent, within } from 'storybook/test';

import ActionLink from '../../components/actions/ActionLink.astro';

const meta = {
  title: 'Actions/Action Link',
  component: ActionLink,
  args: {
    href: '#action-link-destination',
    slots: { default: 'Start a conversation' },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ActionLink gives navigation the visual emphasis of a button while preserving native anchor behavior.',
      },
    },
  },
} satisfies Meta<typeof ActionLink>;

export default meta;
type Story = StoryObj<typeof ActionLink>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };

export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(
      canvas.getByRole('link', { name: 'Start a conversation' })
    ).toHaveFocus();
  },
};
