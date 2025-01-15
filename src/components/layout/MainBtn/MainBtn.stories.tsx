import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import MainBtn from "./MainBtn";

export default {
  title: "Components/MainBtn",
  component: MainBtn,
  argTypes: {
    children: {
      control: "text",
      description: "Content inside the button",
      defaultValue: "Save",
    },
    className: {
      control: "text",
      description: "Additional class names for the button",
    },
    onClick: { action: "clicked" },
  },
} as Meta<typeof MainBtn>;

type Story = StoryObj<typeof MainBtn>;

export const Default: Story = {
  args: {
    children: "Save",
    className: "",
  },
};
