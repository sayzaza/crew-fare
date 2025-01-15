import React, { useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import FieldWithLabel from "./FieldWithLabel";
import MainInput from "../MainInput/MainInput";
import Select from "../Select/Select";
import MainBtn from "../MainBtn/MainBtn";

export default {
  title: "Components/FieldWithLabel",
  component: FieldWithLabel,
  argTypes: {
    label: {
      control: "text",
      description: "The label for the field",
      defaultValue: "Field Label",
    },
    children: {
      control: "text",
      description: "Content inside the field, such as an input element",
      defaultValue: <input type="text" placeholder="Enter text" />,
    },
    asDiv: {
      control: "boolean",
      description: "Render the label as a div instead of a label element",
      defaultValue: false,
    },
    error: {
      control: "text",
      description: "Error message to display below the field",
      defaultValue: "",
    },
  },
} as Meta<typeof FieldWithLabel>;

type Story = StoryObj<typeof FieldWithLabel>;

const ToggleErrorWrapper: React.FC<{ args: any }> = ({ args }) => {
  const [error, setError] = useState(args.error);

  return (
    <div>
      <FieldWithLabel {...args} error={error} />
      <MainBtn
        onClick={() => setError(error ? "" : "This is an error message")}
        style={{ marginTop: "10px" }}
      >
        Toggle Error
      </MainBtn>
    </div>
  );
};

export const WithInput: Story = {
  render: (args) => <ToggleErrorWrapper args={args} />,
  args: {
    label: "Default Field Label",
    children: <MainInput placeholder="Type here" />,
    asDiv: false,
    error: "",
  },
};

export const WithInputError: Story = {
  render: (args) => <ToggleErrorWrapper args={args} />,
  args: {
    label: "Field with Error",
    children: <MainInput placeholder="Type here" isInvalid />,
    asDiv: false,
    error: "This is an error message",
  },
};

export const WithSelect: Story = {
  render: (args) => <ToggleErrorWrapper args={args} />,
  args: {
    label: "Default Field Label",
    children: (
      <Select
        values={[
          {
            name: "Option 1",
            value: "op1",
          },
          {
            name: "Option 2",
            value: "op2",
          },
          {
            name: "Option 3",
            value: "op3",
          },
        ]}
        onChange={(value: string) => {}}
        selectedValue={"op1"}
      />
    ),
    asDiv: false,
    error: "",
  },
};
