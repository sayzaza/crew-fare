import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import DatesSelector from "./DatesSelector";

export default {
  title: "Components/DatesSelector",
  component: DatesSelector,
  argTypes: {
    startDateValue: {
      control: "date",
      description: "Initial start date value",
      defaultValue: new Date(),
    },
    endDateValue: {
      control: "date",
      description: "Initial end date value",
      defaultValue: (() => {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return nextMonth;
      })(),
    },
    onChangeStartDate: {
      action: "startDateChanged",
      description: "Callback for start date change",
    },
    onChangeEndDate: {
      action: "endDateChanged",
      description: "Callback for end date change",
    },
  },
} as Meta<typeof DatesSelector>;

type Story = StoryObj<typeof DatesSelector>;

// Utility wrapper for stateful stories
const StatefulWrapper: React.FC<{ args: any }> = ({ args }) => {
  const [startDate, setStartDate] = useState(args.startDateValue || new Date());
  const [endDate, setEndDate] = useState(args.endDateValue || new Date());

  return (
    <DatesSelector
      {...args}
      startDateValue={startDate}
      endDateValue={endDate}
      onChangeStartDate={(date) => {
        setStartDate(date);
        args.onChangeStartDate(date);
      }}
      onChangeEndDate={(date) => {
        setEndDate(date);
        args.onChangeEndDate(date);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <StatefulWrapper args={args} />,
  args: {
    startDateValue: new Date(),
    endDateValue: (() => {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    })(),
  },
};
