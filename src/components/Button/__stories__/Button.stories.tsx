import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import Button from "@/components/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const ButtonPrimary: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

const ButtonSecondary: ComponentStory<typeof Button> = (args) => (
  <Button variant="secondary" {...args}>
    Button
  </Button>
);

const ButtonXs: ComponentStory<typeof Button> = (args) => (
  <Button size="xs" {...args}>
    Button
  </Button>
);

const ButtonSm: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

const ButtonMd: ComponentStory<typeof Button> = (args) => (
  <Button size="md" {...args}>
    Button
  </Button>
);

const ButtonLg: ComponentStory<typeof Button> = (args) => (
  <Button size="lg" {...args}>
    Button
  </Button>
);

const ButtonDisabled: ComponentStory<typeof Button> = (args) => (
  <Button disabled {...args}>
    Button
  </Button>
);

const ButtonLoading: ComponentStory<typeof Button> = (args) => (
  <Button isLoading {...args}>
    Button
  </Button>
);

export const VariantPrimary = ButtonPrimary.bind({});
VariantPrimary.args = {};

export const VariantSecondary = ButtonSecondary.bind({});
VariantSecondary.args = {};

export const SizeXs = ButtonXs.bind({});
SizeXs.args = {};

export const SizeSm = ButtonSm.bind({});
SizeSm.args = {};

export const SizeMd = ButtonMd.bind({});
SizeMd.args = {};

export const SizeLg = ButtonLg.bind({});
SizeLg.args = {};

export const Disabled = ButtonDisabled.bind({});
Disabled.args = {};

export const Loading = ButtonLoading.bind({});
Loading.args = {};
