import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import Icon from "@/components/Icon";
import Typography from "@/components/Typography";

import { storyIcons } from "../config";

export default {
  title: "Contents/Icon",
  component: Icon,
  argTypes: {},
} as ComponentMeta<typeof Icon>;

const IconDefault: ComponentStory<typeof Icon> = () => (
  <div className="flex min-h-screen flex-col rounded-md p-4">
    <Typography variant="h2" size="text-lg" className="mb-2 font-bold">
      Icon / Default
    </Typography>

    <div className="flex gap-2">
      {storyIcons.map((icon, index) => (
        <Icon
          key={index}
          src={icon.name}
          height={icon.height}
          width={icon.width}
          className="icon-default"
        />
      ))}
    </div>
  </div>
);

const IconActive: ComponentStory<typeof Icon> = () => (
  <div className="flex min-h-screen flex-col rounded-md p-4">
    <Typography variant="h2" size="text-lg" className="mb-2 font-bold">
      Icon / Active
    </Typography>

    <div className="flex gap-2">
      {storyIcons.map((icon, index) => (
        <Icon
          key={index}
          src={icon.name}
          height={icon.height}
          width={icon.width}
          className="icon-active"
        />
      ))}
    </div>
  </div>
);

export const Default = IconDefault.bind({});
Default.args = {};

export const Active = IconActive.bind({});
Active.args = {};
