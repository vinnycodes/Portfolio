import type { Meta, StoryObj } from '../../types/storybook';
import { expect, userEvent, within } from 'storybook/test';

import AccessibilitySpecimen from '../../components/foundations/AccessibilitySpecimen.astro';

const meta = {
  title: 'Foundations/Accessibility',
  component: AccessibilitySpecimen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'WCAG 2.2 AA is the baseline. Automated checks support rather than replace keyboard, screen-reader, zoom, and contrast review.',
      },
    },
  },
} satisfies Meta<typeof AccessibilitySpecimen>;

export default meta;
type Story = StoryObj<typeof AccessibilitySpecimen>;

export const ReleaseCriteria: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(
      canvas.getByRole('link', { name: 'Focusable example' })
    ).toHaveFocus();
  },
};
