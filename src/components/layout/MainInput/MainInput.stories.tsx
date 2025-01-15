import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import MainInput from "./MainInput";

export default {
  title: "Components/MainInput",
  component: MainInput,
  argTypes: {
    className: {
      control: "text",
      description: "Additional class names for the input",
    },
    isInvalid: {
      control: "boolean",
      description: "Indicates if the input is in an invalid state",
      defaultValue: false,
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
      defaultValue: "Type here",
    },
    onChange: { action: "changed", description: "Callback for input change" },
  },
} as Meta<typeof MainInput>;

type Story = StoryObj<typeof MainInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
    isInvalid: false,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Invalid Input",
    isInvalid: true,
  },
};
