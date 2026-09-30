import type { Meta, StoryObj } from '../../types/storybook';
import { expect, userEvent, within } from 'storybook/test';

import IconButton from '../../components/actions/IconButton.astro';

const meta = {
  title: 'Actions/Icon Button',
  component: IconButton,
  args: {
    icon: 'sun',
    label: 'Use light theme',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ['sun', 'moon', 'mail', 'arrow-up-right'],
    },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'IconButton is reserved for familiar compact actions. A non-empty accessible label is always required.',
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Medium: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Disabled: Story = { args: { disabled: true } };

export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(
      canvas.getByRole('button', { name: 'Use light theme' })
    ).toHaveFocus();
  },
};
