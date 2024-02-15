import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import clsxm from "@/utils/clsxm";

import Input from "@/components/Input";
import Typography from "@/components/Typography";

export default {
  title: "Forms/Input",
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const InActiveOneTemplate: ComponentStory<typeof Input> = () => (
  <>
    <div className="h-[3.625rem] w-[23.313rem]">
      <Typography
        variant="h1"
        fontFamily="font-secondary"
        size="text-sm"
        lineHeight="leading-[1.813rem]"
        textAlign="text-left"
        color="text-improbable"
      >
        Input Title
      </Typography>
      <Input
        name="account-number"
        type="text"
        onChange={() => undefined}
        className={clsxm(
          "text-blackOut w-full rounded-[0.938rem] border-transparent px-3 py-2",
          " placeholder-shishaCoal focus:border-transparent focus:ring-0 sm:text-sm"
        )}
        placeholder="Type something here"
      />
    </div>
  </>
);

const InActiveTwoTemplate: ComponentStory<typeof Input> = () => (
  <>
    <div className="h-[3.625rem] w-full">
      <Typography
        variant="h1"
        fontFamily="font-secondary"
        size="text-sm"
        lineHeight="leading-[1.813rem]"
        textAlign="text-left"
        color="text-improbable"
      >
        Input Title
      </Typography>
      <Input
        name="account-number"
        type="text"
        onChange={() => undefined}
        className={clsxm(
          "text-blackOut w-full rounded-[0.938rem] border-transparent px-3 py-2",
          " placeholder-shishaCoal focus:border-transparent focus:ring-0 sm:text-sm"
        )}
        placeholder="Type something here"
      />
    </div>
  </>
);

const FocusOneTemplate: ComponentStory<typeof Input> = () => (
  <>
    <div className="h-[3.625rem] w-[23.313rem]">
      <Typography
        variant="h1"
        fontFamily="font-secondary"
        size="text-sm"
        lineHeight="leading-[1.813rem]"
        textAlign="text-left"
        color="text-improbable"
      >
        Input Title
      </Typography>
      <Input
        name="account-number"
        type="text"
        onChange={() => undefined}
        className={clsxm(
          "border-nero text-blackOut w-full rounded-[0.938rem] border-[0.063rem] border-transparent px-3 py-2",
          " placeholder-shishaCoal focus:border-transparent focus:ring-0 sm:text-sm"
        )}
        placeholder="Type something here"
      />
    </div>
  </>
);

const FocusTwoTemplate: ComponentStory<typeof Input> = () => (
  <>
    <div className="h-[3.625rem] w-full">
      <Typography
        variant="h1"
        fontFamily="font-secondary"
        size="text-sm"
        lineHeight="leading-[1.813rem]"
        textAlign="text-left"
        color="text-improbable"
      >
        Input Title
      </Typography>
      <Input
        name="account-number"
        type="text"
        onChange={() => undefined}
        className={clsxm(
          "text-blackOut w-full rounded-[0.938rem] border-transparent px-3 py-2",
          " placeholder-shishaCoal focus:border-transparent focus:ring-0 sm:text-sm"
        )}
        placeholder="Type something here"
      />
    </div>
  </>
);

const DisabledOneTemplate: ComponentStory<typeof Input> = () => (
  <>
    <div className="h-[3.625rem] w-[23.313rem]">
      <Typography
        variant="h1"
        fontFamily="font-secondary"
        size="text-sm"
        lineHeight="leading-[1.813rem]"
        textAlign="text-left"
        color="text-improbable"
      >
        Input Title
      </Typography>
      <Input
        disabled
        name="account-number"
        type="text"
        onChange={() => undefined}
        className={clsxm(
          "border-nero text-blackOut w-full rounded-[0.938rem] border-[0.063rem] border-transparent px-3 py-2",
          "placeholder-shishaCoal focus:border-transparent focus:ring-0 sm:text-sm"
        )}
        placeholder="This is disabled"
      />
    </div>
  </>
);

const DisabledTwoTemplate: ComponentStory<typeof Input> = () => (
  <>
    <div className="h-[3.625rem] w-full">
      <Typography
        variant="h1"
        fontFamily="font-secondary"
        size="text-sm"
        lineHeight="leading-[1.813rem]"
        textAlign="text-left"
        color="text-improbable"
      >
        Address
      </Typography>
      <Input
        disabled
        name="account-number"
        type="text"
        onChange={() => undefined}
        className={clsxm(
          "text-blackOut w-full rounded-[0.938rem] border-transparent px-3 py-2",
          " placeholder-shishaCoal focus:border-transparent focus:ring-0 sm:text-sm"
        )}
        placeholder="Cipamokolan Street 102, West Java, Bandung"
      />
    </div>
  </>
);

const HasErrorOneTemplate: ComponentStory<typeof Input> = () => (
  <>
    <div className="h-[3.625rem] w-[23.313rem]">
      <Typography
        variant="h1"
        fontFamily="font-secondary"
        size="text-sm"
        lineHeight="leading-[1.813rem]"
        textAlign="text-left"
        color="text-improbable"
      >
        Input Title
      </Typography>
      <Input
        hasError
        msgError="Error Message here"
        name="account-number"
        type="text"
        onChange={() => undefined}
        className={clsxm(
          "border-nero text-blackOut w-full rounded-[0.938rem] border-[0.063rem] border-transparent px-3 py-2",
          " placeholder-shishaCoal focus:border-transparent focus:ring-0 sm:text-sm"
        )}
        placeholder="Type something here"
      />
    </div>
  </>
);

const HasErrorTwoTemplate: ComponentStory<typeof Input> = () => (
  <>
    <div className="h-[3.625rem] w-full">
      <Typography
        variant="h1"
        fontFamily="font-secondary"
        size="text-sm"
        lineHeight="leading-[1.813rem]"
        textAlign="text-left"
        color="text-improbable"
      >
        Address
      </Typography>
      <Input
        hasError
        msgError="Error Message here"
        name="account-number"
        type="text"
        onChange={() => undefined}
        className={clsxm(
          "text-blackOut w-full rounded-[0.938rem] border-transparent px-3 py-2",
          " placeholder-shishaCoal focus:border-transparent focus:ring-0 sm:text-sm"
        )}
        placeholder="Type something here"
      />
    </div>
  </>
);

const FilledOneTemplate: ComponentStory<typeof Input> = () => (
  <>
    <div className="h-[3.625rem] w-[23.313rem]">
      <Typography
        variant="h1"
        fontFamily="font-secondary"
        size="text-sm"
        lineHeight="leading-[1.813rem]"
        textAlign="text-left"
        color="text-improbable"
      >
        Input Title
      </Typography>
      <Input
        name="account-number"
        type="text"
        onChange={() => undefined}
        className={clsxm(
          "text-blackOut w-full rounded-[0.938rem] border-transparent px-3 py-2",
          " placeholder-shishaCoal focus:border-transparent focus:ring-0 sm:text-sm"
        )}
        value="928192001"
      />
    </div>
  </>
);

const FilledTwoTemplate: ComponentStory<typeof Input> = () => (
  <>
    <div className="h-[3.625rem] w-full">
      <Typography
        variant="h1"
        fontFamily="font-secondary"
        size="text-sm"
        lineHeight="leading-[1.813rem]"
        textAlign="text-left"
        color="text-improbable"
      >
        Input Title
      </Typography>
      <Input
        name="account-number"
        type="text"
        onChange={() => undefined}
        className={clsxm(
          "text-blackOut w-full rounded-[0.938rem] border-transparent px-3 py-2",
          " placeholder-shishaCoal focus:border-transparent focus:ring-0 sm:text-sm"
        )}
        value="Cipamokolan Street 102, West Java, Bandung"
      />
    </div>
  </>
);

export const InActiveOneInput = InActiveOneTemplate.bind({});
InActiveOneInput.args = {};

export const InActiveTwoInput = InActiveTwoTemplate.bind({});
InActiveTwoInput.args = {};

export const FocusOneInput = FocusOneTemplate.bind({});
FocusOneInput.args = {};

export const FocusTwoInput = FocusTwoTemplate.bind({});
FocusTwoInput.args = {};

export const DisabledOneInput = DisabledOneTemplate.bind({});
DisabledOneInput.args = {};

export const DisabledTwoInput = DisabledTwoTemplate.bind({});
DisabledTwoInput.args = {};

export const HasErrorOneInput = HasErrorOneTemplate.bind({});
HasErrorOneInput.args = {};

export const HasErrorTwoInput = HasErrorTwoTemplate.bind({});
HasErrorTwoInput.args = {};

export const FilledOneInput = FilledOneTemplate.bind({});
FilledOneInput.args = {};

export const FilledTwoInput = FilledTwoTemplate.bind({});
FilledTwoInput.args = {};
