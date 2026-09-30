import type { ComponentProps } from 'astro/types';
import type { AstroRenderer } from '@storybook-astro/framework';
import type {
  ComponentAnnotations,
  StoryAnnotations,
} from 'storybook/internal/types';

// Astro's own ComponentProps helper constrains components with `any` parameters.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AstroComponent = (args: any) => any;
type StoryArgs<TComponent extends AstroComponent> =
  ComponentProps<TComponent> & {
    slots?: Record<string, unknown>;
  };

export type Meta<TComponent extends AstroComponent> = ComponentAnnotations<
  AstroRenderer,
  StoryArgs<TComponent>
>;

export type StoryObj<TComponent extends AstroComponent> = StoryAnnotations<
  AstroRenderer,
  StoryArgs<TComponent>
>;
