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
    showNumberStepBtns: {
      control: "boolean",
      description: "Show increment and decrement buttons for number input",
      defaultValue: false,
    },
    type: {
      control: "text",
      description: "Input type (e.g., text, number, etc.)",
      defaultValue: "text",
    },
    onChange: { action: "changed", description: "Callback for input change" },
  },
  render: (args) => (
    <div style={{ maxWidth: 300, boxSizing: "border-box" }}>
      <MainInput {...args} />
    </div>
  ),
} as Meta<typeof MainInput>;

type Story = StoryObj<typeof MainInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
    isInvalid: false,
    type: "text",
    showNumberStepBtns: false,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Invalid Input",
    isInvalid: true,
    type: "text",
    showNumberStepBtns: false,
  },
};

export const WithNumberStepButtons: Story = {
  args: {
    placeholder: "Enter a number",
    isInvalid: false,
    type: "number",
    showNumberStepBtns: true,
  },
};
