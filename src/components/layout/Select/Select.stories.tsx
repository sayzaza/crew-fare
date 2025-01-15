import React, { useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import Select from "./Select";
import { ISelectOption } from "../../../models/UI/ISelectOption";

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    values: {
      control: "object",
      description: "Array of options for the select dropdown",
      defaultValue: [
        { value: "option1", name: "Option 1" },
        { value: "option2", name: "Option 2" },
        { value: "option3", name: "Option 3" },
      ],
    },
    selectedValue: {
      control: "text",
      description: "The currently selected value",
      defaultValue: "option1",
    },
    isInvlaid: {
      control: "boolean",
      description: "Indicates if the select dropdown is in an invalid state",
      defaultValue: false,
    },
    onChange: {
      action: "changed",
      description: "Callback when the value changes",
    },
  },
} as Meta<typeof Select>;

type Story = StoryObj<typeof Select>;

const SelectWrapper: React.FC<{ args: any }> = ({ args }) => {
  const [selectedValue, setSelectedValue] = useState(args.selectedValue);

  return (
    <Select
      {...args}
      selectedValue={selectedValue}
      onChange={(value) => {
        setSelectedValue(value);
        args.onChange(value);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <SelectWrapper args={args} />,
  args: {
    values: [
      { value: "option1", name: "Option 1" },
      { value: "option2", name: "Option 2" },
      { value: "option3", name: "Option 3" },
    ],
    selectedValue: "option1",
    isInvlaid: false,
  },
};

export const Invalid: Story = {
  render: (args) => <SelectWrapper args={args} />,
  args: {
    values: [
      { value: "option1", name: "Option 1" },
      { value: "option2", name: "Option 2" },
      { value: "option3", name: "Option 3" },
    ],
    selectedValue: "option1",
    isInvlaid: true,
  },
};

export const CustomOptions: Story = {
  render: (args) => <SelectWrapper args={args} />,
  args: {
    values: [
      { value: "custom1", name: "Custom Option 1" },
      { value: "custom2", name: "Custom Option 2" },
      { value: "custom3", name: "Custom Option 3" },
    ],
    selectedValue: "custom1",
    isInvlaid: false,
  },
};
