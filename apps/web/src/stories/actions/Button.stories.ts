import type { Meta, StoryObj } from '../../types/storybook';
import { expect, userEvent, within } from 'storybook/test';

import Button from '../../components/actions/Button.astro';

const meta = {
  title: 'Actions/Button',
  component: Button,
  args: {
    slots: { default: 'Button label' },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Use Button for an in-page action. Use ActionLink when the outcome is navigation, even when the visual treatment is identical.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
export const Disabled: Story = { args: { disabled: true } };

export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(
      canvas.getByRole('button', { name: 'Button label' })
    ).toHaveFocus();
  },
};
