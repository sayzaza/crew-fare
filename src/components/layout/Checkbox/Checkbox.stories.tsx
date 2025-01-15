import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import Checkbox from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    onChange: {
      action: "changed",
      description: "Callback when the checkbox state changes",
    },
    value: {
      control: "text",
      description: "Value of the checkbox",
      defaultValue: "checkboxValue",
    },
    className: {
      control: "text",
      description: "Additional class names for the checkbox container",
    },
    name: {
      control: "text",
      description: "Name of the checkbox",
      defaultValue: "exampleCheckbox",
    },
    children: {
      control: "text",
      description: "Label text for the checkbox",
      defaultValue: "Checkbox Label",
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
      defaultValue: false,
    },
  },
} as Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    value: "defaultValue",
    name: "defaultCheckbox",
    children: "Default Checkbox",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    value: "checkedValue",
    name: "checkedCheckbox",
    children: "Checked Checkbox",
    checked: true,
  },
};
